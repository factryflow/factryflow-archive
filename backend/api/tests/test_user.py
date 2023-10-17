import json

import pytest

from api.tests.factories import UserFactory

from django.urls import reverse


@pytest.mark.django_db
def test_create_user(api_client):
    data = UserFactory.build().dict()
    response = api_client.post(
        "/api/users/", json.dumps(data, default=str), content_type="application/json"
    )
    print(response.content)
    assert response.status_code == 200


@pytest.mark.django_db
def test_get_users(api_client):
    response = api_client.get("/api/users/")
    assert response.status_code == 200


@pytest.mark.django_db
def test_update_user(api_client):
    instance = UserFactory.build()
    data = instance.dict()
    response = api_client.put(
        f'/api/users/{instance.id}', json.dumps(data, default=str), content_type="application/json"
    )
    print(response.content)
    assert response.status_code == 200



@pytest.mark.django_db
def test_delete_user(api_client):
    instance = UserFactory.build()
    response = api_client.delete(
        f'/api/users/{instance.id}'
    )
    print(response.content)
    assert response.status_code == 200
