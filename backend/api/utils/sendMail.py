from backend import settings
import pytz
from datetime import datetime
import random
from api.models.user import User
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from backend.settings import DEFAULT_FROM_EMAIL


def send_mail(email):                                                                                                                                                                                                                                                                           
    try:
        tz = pytz.timezone ('Asia/Kolkata')
        current_time = datetime.now (tz)
        user = User.objects.get(email=email)
        otp = random.randint (1000, 9999)
        user.otp = otp
        user.otp_send_time = current_time
        user.save ()
        context = {"otp":otp}
        body_msg = render_to_string ('api/email/forgot-password-email.html', context)
        msg = EmailMultiAlternatives ("Forgot Password<Don't Reply>", body_msg, DEFAULT_FROM_EMAIL, [user.email])
        msg.content_subtype = "html"  
        msg.send()
        return 200, "Otp Sent Successfully!"
    except Exception as e:
        return 400, str(e)
    