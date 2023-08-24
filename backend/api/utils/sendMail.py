from backend import settings
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string


def send_mail(html, subject, emails, context=None):                                                                                                                                                                                                                                                                           
    if context is not None:
        body_msg = render_to_string(html, context)
    else:
        body_msg = render_to_string(html)
    msg = EmailMultiAlternatives(subject, body_msg, settings.DEFAULT_FROM_EMAIL, emails)
    msg.content_subtype = "html"
    msg.send()
    
    return "Success"
    