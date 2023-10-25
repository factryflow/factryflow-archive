import json

import pytest

from api.tests.factories import ItemsFactory, ItemCreateFactory


@pytest.mark.django_db
def test_create_item(api_client, load_specific_fixtures):
    load_specific_fixtures(["role","user"])
    data = ItemsFactory.build().dict()
    response = api_client.post(
        "/api/items/", json.dumps(data, default=str), content_type="application/json"
    )
    assert response.status_code == 201
    

@pytest.mark.django_db
def test_get_item_by_id(api_client, load_specific_fixtures):
    instance = ItemCreateFactory.create()
    response = api_client.get(
        f'/api/items/{instance.id}'
    )
    assert response.status_code == 200
    

@pytest.mark.django_db
def test_update_item(api_client):
    instance = ItemCreateFactory.create()
    data = instance.__dict__
    response = api_client.put(
        f'/api/items/{instance.id}', json.dumps(data, default=str), content_type="application/json"
    )
    assert response.status_code == 200


@pytest.mark.django_db
def test_delete_item(api_client):
    instance = ItemCreateFactory.create()
    data = instance.__dict__
    response = api_client.delete(
        f'/api/items/{instance.id}'
    )
    assert response.status_code == 204