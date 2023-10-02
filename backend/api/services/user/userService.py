from rest_framework import status
from django.template.loader import render_to_string
from api.utils.sendMail import send_mail
import json
import base64
import random
from django.core.exceptions import ValidationError
from django.contrib.auth import login
from django.core.mail import EmailMultiAlternatives
import pytz
from datetime import datetime, timedelta
from .userBaseService import UserBaseService
from api.utils.messages.userMessages import *
from api.utils.messages.commonMessages import *
from api.models import User
from api.utils.getToken import get_token
from api.utils.getUserByToken import get_user_by_token
from api.serializers.user import *
from backend import settings


class UserService(UserBaseService):
	"""
	Allow any user (authenticated or not) to access this url 
	"""

	def __init__(self):
		pass

	def login(self, request, format=None):
		"""
		This Function is using for login
		"""
		validated_data = self.validate_auth_data(request)

		
		username = request.data['email'].lower()
		password = request.data['password']
		user = self.user_authenticate(username, password)
		
		if user is not None:
			login(request, user)
			serializer = UserLoginDetailSerializer(user)
			token = get_token(user)
			user_details = serializer.data
			user_details['token'] = token
			user_session = self.create_update_user_session(user, token, request)
			return ({"data": user_details,"code": status.HTTP_200_OK,"message": LOGIN_SUCCESSFULLY})
		
		return ({"data": None,"code": status.HTTP_400_BAD_REQUEST, "message": INVALID_CREDENTIALS})


	def user_authenticate(self, user_name, password):
		print(user_name)
		try:
			user = User.objects.get(email=user_name)
			if user.check_password(password):
				return user # return user on valid credentials
		except User.DoesNotExist:
			return None


	def validate_auth_data(self, request):
		error = {}
		if not request.data.get('email'):
			error.update({'email' : "FIELD_REQUIRED" })

		if not request.data.get('password'):
			error.update({'password' : "FIELD_REQUIRED" })

		if error:
			raise ValidationError(error)
	

	def create_update_user_session(self, user, token, request):
		"""
		Create User Session
		"""
		user_session = self.get_user_session_object(user.pk, request.headers.get('device-type'), request.data.get('device_id'))

		if user_session is None:
			UserSession.objects.create(
				user = user,
				token = token,
				device_id = request.data.get('device_id'),
				device_type = request.headers.get('device-type'),
				app_version = request.headers.get('app-version')
			)
		else:
			user_session.token = token
			user_session.app_version = request.headers.get('app-version')
			user_session.save()

		return user_session

	
	def get_user_session_object(self, user_id, device_type, device_id=None):
		try:
			if device_id:
				try:
					return UserSession.objects.get(user=user_id, device_type=device_type, device_id=device_id)
				except UserSession.DoesNotExist:
					return None
			return UserSession.objects.get(user=user_id, device_type=device_type, device_id=device_id)
		except UserSession.DoesNotExist:
			return None
		

	def send_otp_on_mail(self, email):
		print(email)
		try:
			member_time_zone = "UTC"
			tz = pytz.timezone(member_time_zone)

			current_time = datetime.now(tz)
			try:
				user = User.objects.get(email=email.lower())
			except User.DoesNotExist:
				raise Exception ({
					'email': EMAIL_NOT_EXIST
				})

			otp = random.randint (1000, 9999)
			user.otp = otp
			user.otp_varification = False
			user.otp_send_time = current_time
			user.save ()
			context = {"otp":otp}
			html = "api/email/email-confirmation.html"
			subject = "Email Varification<Don't Reply>"
			send_mail(html, subject, [email], context)
			return "Success"
		except Exception as e:
			print(e)
			pass



	def sign_up(self, request, format=None):
		try:
			user = User.objects.get(email=request.data["email"].lower())
			return({"data":None, "code":status.HTTP_400_BAD_REQUEST, "message":EMAIL_ALREADY_EXIST})
		except User.DoesNotExist:
			serializer = signUpSerializer(data=request.data)
			if serializer.is_valid():
				serializer.save()
				user = User.objects.get(id=serializer.data["id"])
				serializer = UserLoginDetailSerializer(user)
				data = serializer.data
				data["token"] = get_token(user)
				return({"data":data, "code":status.HTTP_200_OK, "message":SIGNUP_SUCCESSFULLY})
			return ({"data":serializer.errors, "code":status.HTTP_400_BAD_REQUEST, "message":BAD_REQUEST})
	

	def resend_otp(self, request, format=None):
		try:
			tz = pytz.timezone ('Asia/Kolkata')
			current_time = datetime.now (tz)
			user_details = get_user_by_token(request)
			print(user_details)
			try:
				user = User.objects.get(id=user_details["user_id"])
				self.send_otp_on_mail(user.email)
				return ({"data":None, "code":status.HTTP_200_OK, "message":OTP_SENT})
			except User.DoesNotExist:
				return ({"data":None, "code":status.HTTP_400_BAD_REQUEST, "message":RECORD_NOT_FOUND})
					
		except Exception as e:
			raise ValidationError(e)


	def verify_otp(self, request, format=None):
		# self.validate_otp_data (request.data)
		tz = pytz.timezone ('Asia/Kolkata')
		current_time = datetime.now (tz)
		now_date = current_time.strftime ('%m/%d/%y')
		now_time = current_time.strftime ('%H:%M')

		otp = request.data['otp']
		user_details = get_user_by_token(request)
		try:
			user = User.objects.get(pk=user_details["user_id"])
		except User.DoesNotExist:
			user = None
		print(user)
		if user:
			if user.otp_varification is False:
				if int(user.otp) == int(otp):
					otp_send_time = user.otp_send_time
					otp_send_time = otp_send_time.astimezone (tz) + timedelta (hours=1)

					otp_date = datetime.strftime (otp_send_time, '%m/%d/%y')
					otp_time = datetime.strftime (otp_send_time, '%H:%M')

					if now_date == otp_date and now_time <= otp_time:
						user.otp_varification = True
						user.otp = None
						user.save()
						serializer = UserLoginDetailSerializer(user)
						data = serializer.data
						return {"data": data, "code": status.HTTP_200_OK, "message": OTP_VERIFID}
					else:
						return {"data": None, "code": status.HTTP_400_BAD_REQUEST, "message": OTP_EXPIRED}
				else:
					return ({"data":None, "code":status.HTTP_400_BAD_REQUEST, "message":WRONG_OTP})      
			else:
				return {"data": None, "code": status.HTTP_400_BAD_REQUEST, "message": EMAIL_ALREADY_VARIFIED}
		else:
			return {"data": None, "code": status.HTTP_400_BAD_REQUEST, "message": RECORD_NOT_FOUND}


	def logout(self, request, format=None):

		validated_data = self.validate_logout_data(request)
		try:
			jwt_token_str = request.META['HTTP_AUTHORIZATION']
			jwt_token = jwt_token_str.replace('Bearer', '')
			user_detail = jwt.decode(jwt_token, None, None)
			user = User.objects.get(pk=user_detail['user_id'])

			user_session_instance = self.get_user_session_object(user.pk, request.headers.get('device-type'), request.data.get('device_id'))

			if user_session_instance:
				user_session = self.create_update_user_session(user, None, request)
				return ({"data": None, "code": status.HTTP_200_OK, "message": "LOGOUT_SUCCESSFULLY"})
			else:
				return ({"data":None, "code":status.HTTP_400_BAD_REQUEST, "message":"RECORD_NOT_FOUND"})

		except User.DoesNotExist:
			return ({"data": None, "code": status.HTTP_400_BAD_REQUEST, "message": "RECORD_NOT_FOUND"})

	def set_password(self, request, format=None):
		try: 
			user = User.objects.get(encoded_id = request.data["encoded_id"])
			user.set_password(request.data["password"])
			user.profile_status = 3
			user.save()
			return({"data":{"user":user.encoded_id}, "code":status.HTTP_200_OK, "message":"Password set successfully !"})
		except User.DoesNotExist:
			return({"data":None, "code":status.HTTP_400_BAD_REQUEST, "message":"You Entered wrong encoded id"})


	
	def forgot_password(self, request, format=None):
		"""
		This method is for Forgot password.
		"""
		print(request.data.get("email"))
		try:
			tz = pytz.timezone ('Asia/Kolkata')
			current_time = datetime.now (tz)
			user = User.objects.get(email=request.data.get("email").lower())
			otp = random.randint (1000, 9999)
			user.otp = otp
			user.otp_send_time = current_time
			user.save ()
			context = {"otp":otp}
			html = "api/email/forgot-password-email.html"
			subject = "Email Varification<Don't Reply>"
			send_mail(html, subject, [user.email], context)
			return({"data":None, "code":status.HTTP_200_OK, "message": OTP_SENT})
		except User.DoesNotExist:
			return({"data":None, "code":status.HTTP_400_BAD_REQUEST, "message": RECORD_NOT_FOUND})


	def forgot_verify_otp(self, request, format=None):
		tz = pytz.timezone ('Asia/Kolkata')
		current_time = datetime.now (tz)
		now_date = current_time.strftime ('%m/%d/%y')
		now_time = current_time.strftime ('%H:%M')

		otp = request.data['otp']
		user = None
		try:
			user = User.objects.get(email=request.data["email"])
		except User.DoesNotExist:
			user = None
   
		if user:
			if int(user.otp) == int(otp):
				otp_send_time = user.otp_send_time
				otp_send_time = otp_send_time.astimezone (tz) + timedelta (minutes=10)

				otp_date = datetime.strftime (otp_send_time, '%m/%d/%y')
				otp_time = datetime.strftime (otp_send_time, '%H:%M')

				if now_date == otp_date and now_time <= otp_time:
					return {"data": None, "code": status.HTTP_200_OK, "message": OTP_VERIFID}
				else:
					return {"data": None, "code": status.HTTP_400_BAD_REQUEST, "message": OTP_EXPIRED}
			else:
				return ({"data":None, "code":status.HTTP_400_BAD_REQUEST, "message":WRONG_OTP})
		else:
			return {"data": None, "code": status.HTTP_400_BAD_REQUEST, "message": DETAILS_INCORRECT}


	def change_password(self, request, format=None):
		"""In this we are chanfin the password of login user"""
  
		user_details = get_user_by_token(request)
		try:
			user = User.objects.get(id=user_details["user_id"])
		except User.DoesNotExist:
			user = None
		if user is not None:
			if user is not None:
				current_password = request.data.get("current_password")
			if user.check_password(current_password):
				user.set_password(request.data.get("new_password"))
				user.save()
				return({"data":None, "code":status.HTTP_200_OK, "message": PASSWORD_CHANGE_SUCCESSFULLY})
			else:
				return({"data":None, "code":status.HTTP_400_BAD_REQUEST, "message": INVALID_WRONG_PASSWORD})

		else:
			return({"data":None, "code":status.HTTP_400_BAD_REQUEST, "message": RECORD_NOT_FOUND})
	
	def get_user_details_by_token(self, request, format=None):
		"""In this we getting detials of the user on the base of token"""
		try:
			user_details = get_user_by_token(request)
			details_obj =  User.objects.get(pk=user_details["user_id"])
			serializer= UserDetialsSerializer(details_obj)
			return({"data":serializer.data, "code":status.HTTP_200_OK, "message":OK})
		except User.DoesNotExist:
			return({"data":None, "code":status.HTTP_400_BAD_REQUEST, "message":RECORD_NOT_FOUND})
	
 
	def updatePassword(self, request, format=None):
		"""This is update password method which is using at the time of forgot-password"""
		
		try:
			user = User.objects.get(email=request.data["email"])
		except User.DoesNotExist:
			user = None
   
		if user:
			user.set_password(request.data["password"])
			user.save()
			return({"data":None, "code":status.HTTP_200_OK, "message":"Password updated successfully !"})
		else:
			return({"data":None, "code":status.HTTP_204_NO_CONTENT, "message":RECORD_NOT_FOUND})
		


