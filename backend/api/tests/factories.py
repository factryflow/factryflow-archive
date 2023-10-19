from polyfactory.factories.pydantic_factory import ModelFactory

from api.schemas import JobIn,UserIn,RoleIn

import factory
from api.models import User,Role


class JobFactory(ModelFactory[JobIn]):
    __model__ = JobIn


class UserFactory(ModelFactory[UserIn]):
    __model__ = UserIn
    

class RoleFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Role 
class UserCreateFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = User  # Set the model to your User model class

    username = factory.Faker('user_name')
    email = factory.Faker('email')
    password = factory.PostGenerationMethodCall('set_password', 'mypassword')  # Adjust the password as needed
    role = factory.SubFactory(RoleFactory)



