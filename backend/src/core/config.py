from os import getenv

from dotenv import load_dotenv
from pydantic import BaseSettings

load_dotenv(getenv("ENV_FILE"))


class Settings(BaseSettings):
    # base

    # database
    JWT_SECRET: str
    DATABASE_URL: str


settings = Settings()
