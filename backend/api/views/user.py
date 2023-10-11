from api.models.user import User
from api.schemas.user import UserIn, UserOut, UserForgotPassword, VerifyOtpIn, UpdatePasswordIn, ChangePasswordIn
from django.contrib.auth import get_user_model
from ninja import Router
from ninja_crud.views import (
    DeleteModelView,
    ListModelView,
    ModelViewSet,
    RetrieveModelView,
    UpdateModelView,
)
from api.utils.sendMail import send_mail
from api.utils.verify_otp import verify_otp

user_no_auth_router = Router()


@user_no_auth_router.post("/", response=UserOut)
def register_user(request, user_in: UserIn):
    user = get_user_model().objects.create_user(
        username=user_in.username, email=user_in.email, password=user_in.password
    )
    return user


user_auth_router = Router()


class UserViewSet(ModelViewSet):
    model_class = User

    # AbstractModelView subclasses can be used as-is
    list = ListModelView(output_schema=UserOut)
    retrieve = RetrieveModelView(output_schema=UserOut)
    update = UpdateModelView(input_schema=UserIn, output_schema=UserOut)
    delete = DeleteModelView()


# The register_routes method must be called to register the routes with the router
UserViewSet.register_routes(user_auth_router)


auth_me_router = Router()

@auth_me_router.get("/", response=UserOut)
def get_current_user(request):
    """
    Get the current authenticated user.
    """
    user = request.user

    if user.is_authenticated:
        return user
    else:
        return {"detail": "Authentication credentials were not provided."}


@user_no_auth_router.post("/forgot-password")
def forgot_password(request, user_in: UserForgotPassword):
    email = user_in.email
    status, message = send_mail(email)
    return{"message":message}

@user_no_auth_router.post("/verify-otp")
def verify_otp(request, otp_in:VerifyOtpIn):
    user, message = verify_otp(otp_in.email, otp_in.otp)    
    return {"user":user, "message":message}


@user_no_auth_router.post("/update-password")
def update_password(request, update_password:UpdatePasswordIn):
    try:
        user = User.objects.get(id=update_password.id)
        user.set_password(update_password.password)
        user.save()
    except User.DoesNotExist:
        return{'error':'User not forund!'}
    

change_password_router = Router()

@change_password_router.put('/')
def change_password(request, change_password:ChangePasswordIn):
    user = request.user
    if user.check_password(change_password.current_password):
        user.set_password(change_password.new_password)
        user.save()
        return {"message": "Password changed successfully"}
    else:
        return {"message": "Current password is incorrect"}
    