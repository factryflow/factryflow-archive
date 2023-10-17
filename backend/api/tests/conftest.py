import pytest
from django.contrib.auth import get_user_model
from django.core.management import call_command
from django.test import Client
from ninja_jwt.tokens import RefreshToken

client = Client()


# @pytest.fixture(scope="session")
@pytest.fixture()
def user():
    return get_user_model().objects.create_user(
        username="testuser", password="testpass", email="test@example.com"
    )


# @pytest.fixture(scope="session")
@pytest.fixture()
def api_client(user):
    client = Client()
    tokens = get_tokens_for_user(user)
    client.defaults["HTTP_AUTHORIZATION"] = f"Bearer {tokens['access']}"
    return client


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        "refresh": str(refresh),
        "access": str(refresh.access_token),
    }


@pytest.fixture(scope="function")
def load_specific_fixtures(db):
    def _load_files(filenames):
        for filename in filenames:
            call_command("loaddata", f"fixtures/{filename}.json")

    return _load_files