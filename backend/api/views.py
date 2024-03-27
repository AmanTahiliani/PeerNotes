from api.models import Course, File, Professor, Semester, Topic
from api.serializers import (
    CourseSerializer,
    FileSerializer,
    ProfessorSerializer,
    SemesterSerializer,
    TopicSerializer,
)
from django.contrib.auth import authenticate
from rest_framework import generics, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import filters
from rest_framework.exceptions import ValidationError, NotFound
from api.utils.get_client_ip import update_user_ip


class TopicListCreateAPIView(generics.ListCreateAPIView):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.SearchFilter]
    search_fields = ["name"]


class TopicDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]


class ProfessorListCreateAPIView(generics.ListCreateAPIView):
    queryset = Professor.objects.all()
    serializer_class = ProfessorSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.SearchFilter]
    search_fields = ["name"]


class ProfessorDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Professor.objects.all()
    serializer_class = ProfessorSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]


class SemesterListCreateAPIView(generics.ListCreateAPIView):
    queryset = Semester.objects.all()
    serializer_class = SemesterSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.SearchFilter]
    search_fields = ["name"]


class SemesterDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Semester.objects.all()
    serializer_class = SemesterSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)


class CourseListCreateAPIView(generics.ListCreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.SearchFilter]
    search_fields = ["name"]


class CourseDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]


class FileListCreateAPIView(generics.ListCreateAPIView):
    queryset = File.objects.all()
    serializer_class = FileSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.SearchFilter]
    search_fields = ["name"]


class FileDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = File.objects.all()
    serializer_class = FileSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]


class RegisterFile(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        update_user_ip(request)
        data = request.data
        try:
            required_fields = set(
                ["filename", "topic", "semester", "professor", "course"]
            )
            provided_fields = set(request.data.keys())
            missing_fields = required_fields - provided_fields

            if any(["filename", "topic"]) in missing_fields:
                raise ValidationError(
                    "Missing one or more of the required field(s): filename, topic"
                )

            file = File.objects.create(filename=data["filename"], original_author=user)
            file.peer_users.add(user)

            file.course = (
                Course.objects.get(id=data.get("course"))
                if data.get("course")
                else None
            )
            file.professor = (
                Professor.objects.get(id=data.get("professor"))
                if data.get("professor")
                else None
            )
            file.semester = (
                Semester.objects.get(id=data.get("semester"))
                if data.get("semester")
                else None
            )

            topic_id = data["topic"]

            try:
                topic = Topic.objects.get(id=topic_id)
                file.topic = topic
            except Exception as e:
                topic_serializer = TopicSerializer(data=topic_id)
                if topic_serializer.is_valid():
                    topic = topic_serializer.save()
                    file.topic = topic

            file.save()
            return Response(
                {"id": file.id, "filename": file.filename, "topic": file.topic.name},
                status=status.HTTP_201_CREATED,
            )
        except Exception as e:
            print("Error", str(e))
            return Response(
                {"error(s)": "Something went wrong"}, status=status.HTTP_400_BAD_REQUEST
            )
