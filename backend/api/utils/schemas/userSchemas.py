
from drf_yasg import openapi
from api.serializers.user import *

#This is using in SignupView
signup_request_body = openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'first_name': openapi.Schema(type=openapi.TYPE_STRING, description="first_name"),
                'last_name': openapi.Schema(type=openapi.TYPE_STRING, description="last_name"),
                'email': openapi.Schema(type=openapi.TYPE_STRING, description="email"),
                'password': openapi.Schema(type=openapi.TYPE_STRING, format="password", description="password"),
                # Add more properties as needed
            },
            required=['first_name', 'last_name', 'email', 'password'],  # Specify required fields
        )
signup_response = {200: signUpSerializer()}


#This is using for LoginView
login_request_body = openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'email': openapi.Schema(type=openapi.TYPE_STRING, description="email"),
                'password': openapi.Schema(type=openapi.TYPE_STRING, format="password", description="password"),
                # Add more properties as needed
            },
            required=['email', 'password'],  # Specify required fields
        )
login_response = {200: UserLoginDetailSerializer()}

#This is using for ChangePassword
change_password_body = openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'current_password': openapi.Schema(type=openapi.TYPE_STRING, format="password", description="current_password"),
                'new_password': openapi.Schema(type=openapi.TYPE_STRING, format="password", description="new_password"),
                # Add more properties as needed
            },
            required=['current_password', 'new_password'],  # Specify required fields
        )

change_password_response = {200: UserLoginDetailSerializer()}

#This is using for GetUserDetailsByToken
user_details_request_body = openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={},
            required=[],  # Specify required fields
        )
user_details_response = {200: UserDetialsSerializer()}
