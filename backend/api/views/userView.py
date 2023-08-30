from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from api.utils.schemas import *
from drf_yasg.utils import swagger_auto_schema
from api.services.user import UserService

userService = UserService()

class SignupView(APIView):
    permission_classes = (AllowAny,)
    @swagger_auto_schema(
        request_body=signup_request_body,
        responses=signup_response,
        operation_summary="Signup a new user",
    )
    def post(self, request, format=None):
        """
        Create User/ Signup User
        """
        result = userService.sign_up(request, format=None)
        return Response(result, status=status.HTTP_200_OK)


class LoginView(APIView):
    permission_classes = (AllowAny,)
    @swagger_auto_schema(
        request_body=login_request_body,
        responses=login_response,
        operation_summary="Login a user",
    )
    def post(self, request, format=None):
        """
        Login
        """
        result = userService.login(request, format=None)
        return Response(result, status=status.HTTP_200_OK)


        
class LogoutView(APIView):
    """
    Logout
    """
    def post(self, request, format=None):
        # simply delete the token to force a login
        result = userService.logout(request, format=None)
        return Response(result, status=status.HTTP_200_OK)


class ChangePasswordView(APIView):
    """
    change Password after otp varification
    """
    @swagger_auto_schema(
        request_body=change_password_body,
        responses=change_password_response,
        operation_summary="Update logged in user's password",
    )
    def put(self, request, format=None):
        result = userService.change_password(request, format=None)
        return Response(result, status=status.HTTP_200_OK)

class GetUserDetialsByTokenView(APIView):
    """
    Get User Details
    """
    @swagger_auto_schema(
        responses=user_details_response,
        operation_summary="Update logged in user's password",
    )
    def get(self, request, format=None):
        result = userService.get_user_details_by_token(request, format=None)
        return Response(result, status=status.HTTP_200_OK)
