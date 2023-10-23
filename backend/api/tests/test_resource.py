import json
import pytest
from api.tests.factories import ResourceFactory, ResourceCreateFactory
from django.urls import reverse


@pytest.mark.django_db
def test_create_resource(api_client, load_specific_fixtures):
    load_specific_fixtures(["role","user","weekly_shift_template","resource_group"])
    
    data = ResourceFactory.build(weekly_shift_template_id=1,resource_group_ids=[1,2]).dict()
    response = api_client.post(
        "/api/resources/", json.dumps(data, default=str), content_type="application/json"
    )
    print(response.content)
    assert response.status_code == 201
    
    
@pytest.mark.django_db
def test_get_resource_by_id(api_client, load_specific_fixtures):
    instance = ResourceCreateFactory.create()
    print(vars(instance))
    response = api_client.get(
        f'/api/resources/{instance.id}'
    )
    print(response.content)
    assert response.status_code == 200
    

@pytest.mark.django_db
def test_update_resource(api_client):
    instance = ResourceCreateFactory.create()
    print(vars(instance))
    data = instance.__dict__
    response = api_client.put(
        f'/api/resources/{instance.id}', json.dumps(data, default=str), content_type="application/json"
    )
    print(response.content)
    assert response.status_code == 200


@pytest.mark.django_db
def test_delete_resource(api_client):
    instance = ResourceCreateFactory.create()
    print(vars(instance))
    data = instance.__dict__
    response = api_client.delete(
        f'/api/resources/{instance.id}'
    )
    print(response.content)
    assert response.status_code == 204
    