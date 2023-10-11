from polyfactory.factories.pydantic_factory import ModelFactory

from api.schemas import JobIn


class JobFactory(ModelFactory[JobIn]):
    __model__ = JobIn
