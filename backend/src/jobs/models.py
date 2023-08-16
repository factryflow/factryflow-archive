from sqlalchemy.orm import relationship
from src.core.models import Base, BaseUUIDModel


class Job(Base, BaseUUIDModel):
    __tablename__ = "job"

    tasks = relationship("Task", back_populates="job")
    # dependencies = relationship(
    #     "Dependency", secondary=job_dependency_table, back_populates="jobs"
    # )
