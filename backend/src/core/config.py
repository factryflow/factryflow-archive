from dotenv import load_dotenv
from pydantic_settings import BaseSettings

load_dotenv()


class Settings(BaseSettings):
    # base

    # database
    JWT_SECRET: str
    DATABASE_URL: str
    ENVIRONMENT: str


settings = Settings()
