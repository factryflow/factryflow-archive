from ninja import Schema


class UserIn(Schema):
    """
    This schema is using for getting the input data for the User model.
    """
    username: str
    email: str
    password: str


class UserOut(Schema):
    """
    This schema is using for returning the output of the User
    """
    id: int
    username: str
    email: str


class UserForgotPassword(Schema):
    """
    This schema is using for getting the input data for Forgot Password
    """
    email: str


class VerifyOtpIn(Schema):
    """
    This schema is using for getting the input data for Verify Otp
    """
    email:str
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
