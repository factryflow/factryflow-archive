from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from ninja import Router
from ninja_crud.views import (
    DeleteModelView,
    ListModelView,
    ModelViewSet,
    RetrieveModelView,
    UpdateModelView,
)

from api.models.user import User
from api.schemas.user import (
    ChangePasswordIn,
    UpdatePasswordIn,
    UserForgotPassword,
    UserIn,
    UserOut,
    VerifyOtpIn,
)
from api.utils.permissions import apply_permission_check_to_views
from api.utils.send_mail import send_mail
from api.utils.verify_otp import verify_otp

# Define two main routers
user_no_auth_router = Router()
user_auth_router = Router()


# Routes that do not require authentication
@user_no_auth_router.post("/", response={201: UserOut})
def register_user(request, user_in: UserIn):
    user = get_user_model().objects.create_user(
        username=user_in.username,
        email=user_in.email,
        password=user_in.password,
    )
    if user_in.resource_ids:
        user.resources.set(user_in.resource_ids)
    if user_in.roles:
        groups = Group.objects.filter(name__in=user_in.roles)
        user.groups.set(groups)
    return user


@user_no_auth_router.get("/check-first-user", response=dict[str, bool])
def check_first_user(request):
    return {"is_first_user": User.objects.count() == 0}


@user_no_auth_router.post("/forgot-password")
def forgot_password(request, user_in: UserForgotPassword):
    email = user_in.email
    status, message = send_mail(email)
    return {"message": message}


@user_no_auth_router.post("/verify-otp")
def verify_otp(request, otp_in: VerifyOtpIn):
    user, message = verify_otp(otp_in.email, otp_in.otp)
    return {"user": user, "message": message}


@user_no_auth_router.post("/update-password")
def update_password(request, update_password: UpdatePasswordIn):
    try:
        user = User.objects.get(id=update_password.id)
        user.set_password(update_password.password)
        user.save()
    except User.DoesNotExist:
        return {"error": "User not forund!"}


# Routes that require authentication
@user_auth_router.get("/me/", response=UserOut)
def get_current_user(request):
    """
    Get the current authenticated user.
    """
    user = request.user

    if user.is_authenticated:
        return user
    else:
        return {"detail": "Authentication credentials were not provided."}


@user_auth_router.put("/change-password/")
def change_password(request, change_password: ChangePasswordIn):
    user = request.user
    if user.check_password(change_password.current_password):
        user.set_password(change_password.new_password)
        user.save()
        return {"message": "Password changed successfully"}
    else:
        return {"message": "Current password is incorrect"}


class UserViewSetAuth(ModelViewSet):
    model_class = User

    # AbstractModelView subclasses can be used as-is
    list = ListModelView(output_schema=UserOut)
    retrieve = RetrieveModelView(output_schema=UserOut)
    update = UpdateModelView(input_schema=UserIn, output_schema=UserOut)
    delete = DeleteModelView()


apply_permission_check_to_views(UserViewSetAuth)

# The register_routes method must be called to register the routes with the router
UserViewSetAuth.register_routes(user_auth_router)
