import os

from dotenv import load_dotenv
from pydantic import BaseSettings

load_dotenv()


class settings(BaseSettings):
    JWT_SECRET = os.getenv("SECRET")
    DATABASE_URL = os.getenv("DATABASE_URL")
    # You can add other configurations here as well
    # DATABASE_URI = os.getenv('DATABASE_URI')
    # EMAIL_SERVICE_API_KEY = os.getenv('EMAIL_SERVICE_API_KEY')


settings = settings()
