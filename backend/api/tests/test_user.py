import json

import pytest

from api.tests.factories import UserFactory,UserCreateFactory

from django.urls import reverse





@pytest.mark.django_db
def test_create_user(api_client):
    data = UserFactory.build().dict()
    response = api_client.post(
        "/api/users/", json.dumps(data, default=str), content_type="application/json"
    )
    print(response.content)
    assert response.status_code == 201


# @pytest.mark.django_db
# def test_get_users(api_client):
#     response = api_client.get("/api/users/")
#     assert response.status_code == 200


@pytest.mark.django_db
def test_get_user(api_client):
    instance = UserCreateFactory.create()
    print(vars(instance))
    # data = instance.dict()
    response = api_client.get(
        f'/api/users/{instance.id}'
    )
    print(response.content)
    assert response.status_code == 200



@pytest.mark.django_db
def test_update_user(api_client):
    instance = UserCreateFactory.create()
    print(vars(instance))
    data = instance.__dict__
    response = api_client.put(
        f'/api/users/{instance.id}', json.dumps(data, default=str), content_type="application/json"
    )
    print(response.content)
    assert response.status_code == 200


@pytest.mark.django_db
def test_delete_user(api_client):
    instance = UserCreateFactory.create()
    print(vars(instance))
    data = instance.__dict__
    response = api_client.delete(
        f'/api/users/{instance.id}'
    )
    print(response.content)
    assert response.status_code == 204


@pytest.mark.django_db
def test_change_user_password(api_client,test_change_password_data):
    response = api_client.put(
        '/api/users/change-password/', json.dumps(test_change_password_data, default=str), content_type="application/json"
    )
    data = response.json()
    assert response.status_code == 200
    assert data["message"] == "Password changed successfully"


@pytest.mark.django_db
def test_update_user_password(api_client,test_update_password_data):
    response = api_client.post(
        '/api/users/update-password', json.dumps(test_update_password_data, default=str), content_type="application/json"
    )
  
    assert response.status_code == 200


@pytest.mark.django_db
def test_get_current_user(api_client):
    response = api_client.get(
        '/api/users/me/'
    )
  
    assert response.status_code == 200

