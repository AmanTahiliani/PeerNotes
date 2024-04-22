from api.serializers import LoginSerializer, UserSerializer
from django.contrib.auth import authenticate, get_user_model
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from api.utils.get_client_ip import get_client_ip, PollMiddleware
from django.utils import timezone


class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data["username"]
            password = serializer.validated_data["password"]
            user = authenticate(username=username, password=password)
            if user:
                token, _ = Token.objects.get_or_create(user=user)
                user.last_poll = timezone.now()
                response = Response({"token": token.key}, status=status.HTTP_200_OK)
                response.set_cookie("token", token.key)
                return response
            else:
                return Response(
                    {"error": "Invalid credentials"},
                    status=status.HTTP_401_UNAUTHORIZED,
                )
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SignupView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            print(serializer.validated_data)
            username = serializer.validated_data["username"]
            email = serializer.validated_data["email"]
            password = request.data["password"]
            ip_address = get_client_ip(request)
            print(email, username, password)
            if get_user_model().objects.filter(username=username).exists():
                return Response(
                    {"error": "Username already exists"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            user = get_user_model().objects.create_user(
                username=username, email=email, password=password, ip_address=ip_address
            )

            return Response(
                {"message": "User created successfully"}, status=status.HTTP_201_CREATED
            )
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PollOnlineView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            user = request.user
            try:
                data = request.data
                ip_address = data["ip"]
                print("Local IP found in request")
            except Exception as e:
                ip_address = get_client_ip(request)
                print("Using public IP")
            user.ip_address = ip_address
            user.last_poll = timezone.now()
            user.save()
            return Response(
                {
                    "Message": "IP address updated successfully",
                    "username": user.username,
                },
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
