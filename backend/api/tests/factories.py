from polyfactory.factories.pydantic_factory import ModelFactory

from api.schemas import JobIn,UserIn

import factory
from api.models import User


class JobFactory(ModelFactory[JobIn]):
    __model__ = JobIn


class UserFactory(ModelFactory[UserIn]):
    __model__ = UserIn
    


class UserCreateFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = User  # Set the model to your User model class

    username = factory.Faker('user_name')
    email = factory.Faker('email')
    password = factory.PostGenerationMethodCall('set_password', 'mypassword')  # Adjust the password as needed



