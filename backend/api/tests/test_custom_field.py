import json
import pytest

# Test params
test_params = [
    ({
        "field_name": "cust_item_first_part",
        "related_model": "Item",
        "field_type": ["text", "number", "date", "boolean", "datetime", "time"]
    }, 201),

    ({
        "field_name": "cust_item_first_part",
        "related_model": "NonExistentModel",
        "field_type": ["text"]
    }, 400),

    ({
        "field_name": "cust_item_first_part",
        "related_model": "Item",
        "field_type": ["float"]  # This should fail
    }, 400),
]


@pytest.mark.django_db
@pytest.mark.parametrize(
    'input, expected_status_code',
    test_params
)
def test_create_customfields(api_client, input: dict, expected_status_code):
    for type in input.get('field_type'):
        cf_data = input
        cf_data['field_type'] = type

        response = api_client.post(
            "/api/custom-fields/",
            json.dumps(cf_data),
            content_type="application/json"
        )
        assert response.status_code == expected_status_code
\
@pytest.mark.django_db
def test_get_customfields(api_client):
    response = api_client.get("/api/custom-fields/")
    assert response.status_code == 200
