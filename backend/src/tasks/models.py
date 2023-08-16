import enum

from sqlalchemy import Column, Enum, ForeignKey, Integer
from sqlalchemy.orm import relationship
from src.core.models import Base, BaseUUIDModel


class TaskTarget(enum.Enum):
    stock = "stock"
    job = "job"


class Task(Base, BaseUUIDModel):
    __tablename__ = "task"

    task_number = Column(Integer, nullable=False)
    batch_id = Column(Integer)
    target = Column(Enum(TaskTarget))
    job_id = Column(Integer, ForeignKey("job.id"))

    job = relationship("Job", back_populates="tasks")
    # dependencies = relationship(
    #     "Dependency", secondary=task_dependency_table, back_populates="tasks"
    # )

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
