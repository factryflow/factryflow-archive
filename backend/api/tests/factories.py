from polyfactory.factories.pydantic_factory import ModelFactory

from api.schemas import JobIn,UserIn,RoleIn, ResourceIn

import factory
from api.models import *


class JobFactory(ModelFactory[JobIn]):
    __model__ = JobIn


class UserFactory(ModelFactory[UserIn]):
    __model__ = UserIn
    

class UserRoleFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Role 
        
class UserCreateFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = User  # Set the model to your User model class

    username = factory.Faker('user_name')
    email = factory.Faker('email')
    password = factory.PostGenerationMethodCall('set_password', 'mypassword')
    role = factory.SubFactory(UserRoleFactory)


    

class ResourceFactory(ModelFactory[ResourceIn]):
    __model__ = ResourceIn
    

class ResourceWeeklyShiftTemplateFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = WeeklyShiftTemplate

        
class ResourceCreateFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Resource 
        
    name = factory.Faker('name')
    weekly_shift_template = factory.SubFactory(ResourceWeeklyShiftTemplateFactory)
    
      