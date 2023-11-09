from ninja import ModelSchema, Schema
from pydantic import EmailStr

from api.models.resource import Resource
from api.models.role import Role
from api.models.user import User


class UserIn(Schema):
    username: str
    email: EmailStr
    password: str
    role_id: int = 3
    resource_ids: list[int] = None


class UserRoleOut(ModelSchema):
    class Config:
        model = Role
        model_fields = ["id", "name"]


class UserResourceOut(ModelSchema):
    class Config:
        model = Resource
        model_fields = ["id", "name"]


class UserOut(ModelSchema):
    role: UserRoleOut
    resources: list[UserResourceOut] = None

    class Config:
        model = User
        model_exclude = ["password", "role", "resources"]


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
