import factory
from polyfactory.factories.pydantic_factory import ModelFactory

from api.schemas import JobIn,UserIn,RoleIn, ResourceIn,ResourceGroupIn, ItemIn

import factory
from api.models import *


class JobFactory(ModelFactory[JobIn]):
    __model__ = JobIn
    
class ItemsFactory(ModelFactory[ItemIn]):
    __model__ = ItemIn

class CreateJobStatusFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = JobStatus

class CreateJobTypeFacory(factory.django.DjangoModelFactory):
    class Meta:
        model = JobType
        
class CreateJobFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Job
        
    name = factory.Faker('name')
    job_status = factory.SubFactory(CreateJobStatusFactory)
    job_type = factory.SubFactory(CreateJobTypeFacory)
    # job_status_id = 1
    # job_type_id = 1
    # priority = 1
    # dependency_ids = []
    # task_ids = []


class UserFactory(ModelFactory[UserIn]):
    __model__ = UserIn

class ItemCreateFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Item  # Set the model to your User model class

    name = factory.Faker('name')
    description = "description"
    

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

class ResourceGroupFactory(ModelFactory[ResourceGroupIn]):
    __model__ = ResourceGroupIn



class ResourceGroupCreateFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = ResourceGroup
        
    name = factory.Faker('name')

      

