from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from src.database import Base


class Task(Base):
    __tablename__ = "task"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    job_id = Column(Integer, ForeignKey("job.id"))

    job = relationship("Job", back_populates="tasks")
    predecessors = relationship(
        "TaskDependency",
        back_populates="successor",
        foreign_keys="TaskDependency.successor_id",
    )
    successors = relationship(
        "TaskDependency",
        back_populates="predecessor",
        foreign_keys="TaskDependency.predecessor_id",
    )


class TaskDependency(Base):
    __tablename__ = "task_dependency"

    predecessor_id = Column(Integer, ForeignKey("task.id"), primary_key=True)
    successor_id = Column(Integer, ForeignKey("task.id"), primary_key=True)

    predecessor = relationship(
        Task, back_populates="successors", foreign_keys=[predecessor_id]
    )
    successor = relationship(
        Task, back_populates="predecessors", foreign_keys=[successor_id]
    )
