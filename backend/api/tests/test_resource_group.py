import json
import pytest
from api.tests.factories import ResourceGroupFactory, ResourceGroupCreateFactory
from django.urls import reverse


@pytest.mark.django_db
def test_create_resource_group(api_client, load_specific_fixtures):
    load_specific_fixtures(["role","user","resources"])
    
    data = ResourceGroupFactory.build(resource_ids=[]).dict()
    response = api_client.post(
        "/api/resource-groups/", json.dumps(data, default=str), content_type="application/json"
    )
    print(response.content)
    assert response.status_code == 201
    
    
@pytest.mark.django_db
def test_get_resource_group_by_id(api_client):
    instance = ResourceGroupCreateFactory.create()
    print(vars(instance))
    response = api_client.get(
        f'/api/resource-groups/{instance.id}'
    )
    print(response.content)
    assert response.status_code == 200
    

@pytest.mark.django_db
def test_update_resource_group(api_client):
    instance = ResourceGroupCreateFactory.create()
    print(vars(instance))
    data = instance.__dict__
    response = api_client.put(
        f'/api/resource-groups/{instance.id}', json.dumps(data, default=str), content_type="application/json"
    )
    print(response.content)
    assert response.status_code == 200


@pytest.mark.django_db
def test_delete_resource_group(api_client):
    instance = ResourceGroupCreateFactory.create()
    print(vars(instance))
    data = instance.__dict__
    response = api_client.delete(
        f'/api/resource-groups/{instance.id}'
    )
    print(response.content)
    assert response.status_code == 204