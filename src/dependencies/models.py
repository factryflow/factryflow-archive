from sqlalchemy import Column, ForeignKey, Integer, String, Table
from sqlalchemy.orm import relationship

from src.database import Base

# Association table for Task and Dependency
task_dependency_table = Table(
    "task_dependency",
    Base.metadata,
    Column("task_id", Integer, ForeignKey("task.id"), primary_key=True),
    Column("dependency_id", Integer, ForeignKey("dependency.id"), primary_key=True),
)

# Association table for Job and Dependency
job_dependency_table = Table(
    "job_dependency",
    Base.metadata,
    Column("job_id", Integer, ForeignKey("job.id"), primary_key=True),
    Column("dependency_id", Integer, ForeignKey("dependency.id"), primary_key=True),
)


class Dependency(Base):
    __tablename__ = "dependency"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(String)  # A description of what this dependency is

    # Many-to-many relationships with Task and Job
    tasks = relationship(
        "Task", secondary=task_dependency_table, back_populates="dependencies"
    )
    jobs = relationship(
        "Job", secondary=job_dependency_table, back_populates="dependencies"
    )
