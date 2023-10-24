from polyfactory.factories.pydantic_factory import ModelFactory

from api.schemas import JobIn,UserIn,RoleIn, ResourceIn,ResourceGroupIn

import factory
from api.models import *


class JobFactory(ModelFactory[JobIn]):
    __model__ = JobIn
    

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
    description = factory.Faker('description')
    customer = factory.Faker('customer')
    due_date = factory.Faker('due_date')
    planned_start_datetime = factory.Faker('planned_start_datetime')
    planned_end_datetime = factory.Faker('planned_end_datetime')
    external_id = factory.Faker('external_id')
    note = factory.Faker('note')
    job_status = factory.SubFactory(CreateJobStatusFactory)
    job_type = factory.SubFactory(CreateJobTypeFacory)
    


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

class ResourceGroupFactory(ModelFactory[ResourceGroupIn]):
    __model__ = ResourceGroupIn



class ResourceGroupCreateFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = ResourceGroup
        
    name = factory.Faker('name')

      