from enum import Enum

from sqlalchemy import Column, ForeignKey, Integer
from sqlalchemy.orm import relationship

from src.database import Base
from src.dependencies.models import task_dependency_table


class TaskTarget(Enum):
    STOCK = "stock"
    JOB = "job"


class Task(Base):
    __tablename__ = "task"

    id = Column(Integer, primary_key=True, index=True)
    task_number = Column(Integer, nullable=False)
    batch_id = Column(Integer)
    target = Column(Enum(TaskTarget), index=True)
    job_id = Column(Integer, ForeignKey("job.id"))

    job = relationship("Job", back_populates="tasks")
    dependencies = relationship(
        "Dependency", secondary=task_dependency_table, back_populates="tasks"
    )

    predecessors = relationship(
        "TaskConstraint",
        back_populates="successor",
        foreign_keys="TaskConstraint.successor_id",
    )
    successors = relationship(
        "TaskConstraint",
        back_populates="predecessor",
        foreign_keys="TaskConstraint.predecessor_id",
    )


class TaskConstraint(Base):
    __tablename__ = "task_constraint"

    predecessor_id = Column(Integer, ForeignKey("task.id"), primary_key=True)
    successor_id = Column(Integer, ForeignKey("task.id"), primary_key=True)

    predecessor = relationship(
        Task, back_populates="successors", foreign_keys=[predecessor_id]
    )
    successor = relationship(
        Task, back_populates="predecessors", foreign_keys=[successor_id]
    )
