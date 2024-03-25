from rest_framework.views import APIView
from rest_framework.response import Response
from api.serializers import LoginSerializer
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework import status
