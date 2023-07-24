import os

from dotenv import load_dotenv

load_dotenv()


class Config:
    SECRET = os.getenv("SECRET", "default-secret")
    # You can add other configurations here as well
    # DATABASE_URI = os.getenv('DATABASE_URI')
    # EMAIL_SERVICE_API_KEY = os.getenv('EMAIL_SERVICE_API_KEY')
