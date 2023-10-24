import json

import pytest

from api.tests.factories import JobFactory, CreateJobFactory


@pytest.mark.django_db
def test_create_job(api_client, load_specific_fixtures):
    load_specific_fixtures(["role","user","job_status", "job_types"])
    data = JobFactory.build(job_status_id=1, job_type_id=1, dependency_ids=[]).dict()
    response = api_client.post(
        "/api/jobs/", json.dumps(data, default=str), content_type="application/json"
    )
    print(response.content)
    assert response.status_code == 201


@pytest.mark.django_db
def test_get_jobs(api_client):
    response = api_client.get("/api/jobs/")
    assert response.status_code == 200



@pytest.mark.django_db
def test_get_job_by_id(api_client, load_specific_fixtures):
    instance = CreateJobFactory.create()
    response = api_client.get(
        f'/api/jobs/{instance.id}'
    )
    print(response.content)
    assert response.status_code == 200
    

@pytest.mark.django_db
def test_update_job(api_client):
    instance = CreateJobFactory.create()
    data = instance.__dict__
    response = api_client.put(
        f'/api/jobs/{instance.id}', json.dumps(data, default=str), content_type="application/json"
    )
    print(response.content)
    assert response.status_code == 200


@pytest.mark.django_db
def test_delete_job(api_client):
    instance = CreateJobFactory.create()
    data = instance.__dict__
    response = api_client.delete(
        f'/api/jobs/{instance.id}'
    )
    print(response.content)
    assert response.status_code == 204
