from django.contrib.auth.models import Group
from ninja import ModelSchema, Schema
from pydantic import EmailStr, Field

from api.models.resource import Resource
from api.models.user import User


class UserIn(Schema):
    username: str
    email: EmailStr
    password: str
    roles: list[str] = ["Admin"]  # Default role is Admin while we develop the system
    resource_ids: list[int] = None


class UserResourceOut(ModelSchema):
    class Config:
        model = Resource
        model_fields = ["id", "name"]


class UserGroupOut(ModelSchema):
    class Config:
        model = Group
        model_fields = ["id", "name"]


class UserOut(ModelSchema):
    roles: list[UserGroupOut] = Field(None, alias="groups")
    resources: list[UserResourceOut] = None

    class Config:
        model = User
        model_exclude = ["password", "role", "resources", "groups"]


class UserForgotPassword(Schema):
    """
    This schema is using for getting the input data for Forgot Password
    """

    email: EmailStr


class VerifyOtpIn(Schema):
    """
    This schema is using for getting the input data for Verify Otp
    """

    email: EmailStr
    otp: int


class UpdatePasswordIn(Schema):
    """
    This schema is using for getting the input data for Update password, This is using when user forgot password.
    """

    id: int
    password: str


class ChangePasswordIn(Schema):
    """
    This schema is using for getting the input data for change password, This is using when user is login and want to change password
    """

    current_password: str
    new_password: str
