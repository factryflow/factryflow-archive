import random
from datetime import datetime

import pytz
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from factryflow.settings import DEFAULT_FROM_EMAIL

from api.models.user import User


def send_mail(email):     
    """
    This method is using for sending forgot email to user where we are sending Otp to user and,
    On portal when user will verify otp then user can set password
    """                                                                                                                                                                                                                                                                      
    try:
        tz = pytz.timezone("Asia/Kolkata")
        current_time = datetime.now(tz)
        user = User.objects.get(email=email)
        otp = random.randint(1000, 9999)
        user.otp = otp
        user.otp_send_time = current_time
        user.save()
        context = {"otp": otp}
        body_msg = render_to_string("api/email/forgot-password-email.html", context)
        msg = EmailMultiAlternatives(
            "Forgot Password<Don't Reply>", body_msg, DEFAULT_FROM_EMAIL, [user.email]
        )
        msg.content_subtype = "html"
        msg.send()
        return 200, "Otp Sent Successfully!"
    except Exception as e:
        return 400, str(e)
