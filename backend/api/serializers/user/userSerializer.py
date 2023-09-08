from rest_framework import serializers
from api.models import (User)


class UserLoginDetailSerializer(serializers.ModelSerializer):
	"""
	Return the details of Login User.
	"""
	class Meta(object):
		model = User
		fields = (
		'id', 'email', 'first_name', 'last_name', 'role', 'is_active', 'is_deleted')


class signUpSerializer(serializers.ModelSerializer):
	"""
	create/update user .
	"""
	id = serializers.IntegerField(required=False)
	password = serializers.CharField(required=False)
	class Meta:
		model = User
		fields = ('id', 'first_name', 'last_name', 'email', 'password', 'role')
		extra_kwargs = {
				'password': {'write_only': True},
			}

	def create(self, validated_data):
		user = User (
            email=validated_data['email'].lower ()
        )
		user.set_password(validated_data.get("password"))
		user.first_name = validated_data.get('first_name')
		user.last_name = validated_data.get('last_name')
		user.role = validated_data.get('role')
		user.save()
		
		return user


class UserDetialsSerializer(serializers.ModelSerializer):
	"""
	Get user Detials.
	"""
	class Meta:
		model = User
		fields = ('id', 'first_name', 'last_name', 'email', 'role', 'is_active', 'is_deleted')