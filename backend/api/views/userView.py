from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from api.services.user import UserService

userService = UserService()

class SignupView(APIView):
    permission_classes = (AllowAny,)
    def post(self, request, format=None):
        """
        Create User/ Signup User
        """
        result = userService.sign_up(request, format=None)
        return Response(result, status=status.HTTP_200_OK)


class LoginView(APIView):
    permission_classes = (AllowAny,)
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
    def put(self, request, format=None):
        result = userService.change_password(request, format=None)
        return Response(result, status=status.HTTP_200_OK)

class GetUserDetialsByTokenView(APIView):
    """
    Get User Details
    """
    def get(self, request, format=None):
        result = userService.get_user_details_by_token(request, format=None)
        return Response(result, status=status.HTTP_200_OK)
