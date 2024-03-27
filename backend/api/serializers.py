from rest_framework import serializers
from .models import PeerUser


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = PeerUser
        fields = ["id", "username", "email", "ip_address"]
