from typing import Type, Union
from pydantic.fields import Field
from ninja.orm import create_schema
from api.models import CustomField
from datetime import date, time, datetime
from pydantic import BaseModel, create_model
from django.db.migrations.executor import MigrationExecutor
from django.db import connections, DEFAULT_DB_ALIAS
import os
from dotenv import load_dotenv


class DefaultCustomFieldSchema(BaseModel):
    pass  # An empty default schema


# Checks if pytest is running using env variables
def get_testrun_status() -> str:
    load_dotenv()
    return os.getenv('RUNNING_TESTS')


def is_migrating():
    connection = connections[DEFAULT_DB_ALIAS]
    executor = MigrationExecutor(connection)
    targets = executor.loader.graph.leaf_nodes()
    return executor.migration_plan(targets)


def generate_custom_field_schema(model_name: str, class_suffix: str) -> type(BaseModel):
    if get_testrun_status() == 'True':
        # Return some default schema or value during tests
        return DefaultCustomFieldSchema

    if is_migrating():
        # Return some default schema or value during migration
        return DefaultCustomFieldSchema

    # Getting all custom fields for the given model name
    custom_fields = CustomField.objects.filter(related_model=model_name)

    # Placehoilder
    attributes = {}

    for field in custom_fields:
        default_value = None  # Setting None as default value
        field_args = (Field(default_value), )
        if field.field_type == 'text':
            attributes[field.field_name] = (str, *field_args)
        elif field.field_type == 'number':
            attributes[field.field_name] = (float, *field_args)
        elif field.field_type == 'date':
            attributes[field.field_name] = (date, *field_args)
        elif field.field_type == 'boolean':
            attributes[field.field_name] = (bool, *field_args)
        elif field.field_type == 'time':
            attributes[field.field_name] = (time, *field_args)
        elif field.field_type == 'datetime':
            attributes[field.field_name] = (datetime, *field_args)

    # Dynamically create a Pydantic model with these attributes
    CustomFieldSchema = create_model(
        f'CustomFieldSchema_{class_suffix}', **attributes)

    return CustomFieldSchema
