import pytz
from datetime import datetime, timedelta
from api.models import User


def verify_otp(email, otp):
<<<<<<< HEAD
    """
    This method is using for verifying otp
    """
    tz = pytz.timezone ('Asia/Kolkata')
    current_time = datetime.now (tz)
    now_date = current_time.strftime ('%m/%d/%y')
    now_time = current_time.strftime ('%H:%M')
=======
    tz = pytz.timezone("Asia/Kolkata")
    current_time = datetime.now(tz)
    now_date = current_time.strftime("%m/%d/%y")
    now_time = current_time.strftime("%H:%M")
>>>>>>> cd8c6341b3aa0248ba26a652945b2612a155ab6e

    user = None
    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        user = None

    if user:
        if int(user.otp) == int(otp):
            otp_send_time = user.otp_send_time
            otp_send_time = otp_send_time.astimezone(tz) + timedelta(minutes=10)

            otp_date = datetime.strftime(otp_send_time, "%m/%d/%y")
            otp_time = datetime.strftime(otp_send_time, "%H:%M")

            if now_date == otp_date and now_time <= otp_time:
                return user, "Your otp is verified!"
            else:
                return user, "Otp has been expired!"
        else:
            return user, "Otp is wrong!"
    else:
        return user, "Details are incorrect!"
