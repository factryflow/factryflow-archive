import factory
from polyfactory.factories.pydantic_factory import ModelFactory

from api.models import User
from api.schemas import JobIn, UserIn


class JobFactory(ModelFactory[JobIn]):
    __model__ = JobIn

    job_status_id = 1
    job_type_id = 1
    priority = 1
    dependency_ids = []
    task_ids = []


class UserFactory(ModelFactory[UserIn]):
    __model__ = UserIn


class UserCreateFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = User  # Set the model to your User model class

    username = factory.Faker("user_name")
    email = factory.Faker("email")
    password = factory.PostGenerationMethodCall(
        "set_password", "mypassword"
    )  # Adjust the password as needed
