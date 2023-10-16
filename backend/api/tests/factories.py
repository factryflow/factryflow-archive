from polyfactory.factories.pydantic_factory import ModelFactory

from api.schemas import JobIn,UserTestIn


class JobFactory(ModelFactory[JobIn]):
    __model__ = JobIn


class UserFactory(ModelFactory[UserTestIn]):
    __model__ = UserTestIn