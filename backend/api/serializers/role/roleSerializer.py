from rest_framework import serializers
from api.models import Role


class RoleSerializer(serializers.ModelSerializer):
    """
    This is for update ,Create
    """
    class Meta(object):
        model = Role
        fields = ('id', 'name')


class RoleDetailSerializer(serializers.ModelSerializer):
    """
    This is for Retrieving full data
    """
    class Meta(object):
        model = Role
        fields = ('id', 'name', 'can_delete')