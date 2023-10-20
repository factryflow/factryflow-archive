import json
import pytest
from api.tests.factories import ResourceFactory
from django.urls import reverse


@pytest.mark.django_db
def test_create_resource(api_client, load_specific_fixtures):
    load_specific_fixtures(["weekly_shift_template","resource_group"])
    data = ResourceFactory.build(weekly_shift_template_id=1,resource_group_ids=[1,2]).dict()
    response = api_client.post(
        "/api/resources/", json.dumps(data, default=str), content_type="application/json"
    )
    print(response.content)
    assert response.status_code == 201