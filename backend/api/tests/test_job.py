import json

import pytest

from api.tests.factories import JobFactory


@pytest.mark.django_db
def test_create_job(api_client, load_specific_fixtures):
    load_specific_fixtures(["job_status", "job_types"])
    data = JobFactory.build().dict()
    response = api_client.post(
        "/api/jobs/", json.dumps(data, default=str), content_type="application/json"
    )
    print(response.content)
    print(data)
    assert response.status_code == 201


@pytest.mark.django_db
def test_get_jobs(api_client):
    response = api_client.get("/api/jobs/")
    assert response.status_code == 200
