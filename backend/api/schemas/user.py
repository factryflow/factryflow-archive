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
<<<<<<< HEAD
    """
    This schema is using for getting the input data for Verify Otp
    """
    email:str
=======
    email: str
>>>>>>> cd8c6341b3aa0248ba26a652945b2612a155ab6e
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
