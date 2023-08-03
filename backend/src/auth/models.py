from fastapi_users.db import SQLAlchemyBaseUserTableUUID
from src.database import Base


class User(SQLAlchemyBaseUserTableUUID, Base):
    pass
