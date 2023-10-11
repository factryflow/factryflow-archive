from ninja import Schema


class UserIn(Schema):
    username: str
    email: str
    password: str


class UserOut(Schema):
    id: int
    username: str
    email: str

class UserForgotPassword(Schema):
    email: str
    
    
class VerifyOtpIn(Schema):
    email:str
    otp: int
    

class UpdatePasswordIn(Schema):
    id: int
    password: str
    

class ChangePasswordIn(Schema):
    current_password: str
    new_password: str