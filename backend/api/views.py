from api.models import Course, File, Professor, Semester, Topic, PeerUser
from api.serializers import (
    CourseSerializer,
    FileSerializer,
    ProfessorSerializer,
    SemesterSerializer,
    TopicSerializer,
    UserSerializer,
)
from datetime import datetime, timedelta
from django.contrib.auth import authenticate
from django.db import transaction
from django.utils import timezone
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


class UpvoteFile(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, file_id):
        user = request.user
        update_user_ip(request)

        try:
            file = File.objects.get(id=file_id)
            if file.downvotes.contains(user):
                file.downvotes.remove(user)
            file.upvotes.add(user)
            file.save()
            return Response(
                {"msg": f"Upvoted {file.filename}", "file_points": file.points},
                status=status.HTTP_200_OK,  
            )
        except Exception as e:
            print(f"Error: {str(e)}")
            return Response(
                {"error": "Please enter valid file id"},
                status=status.HTTP_400_BAD_REQUEST,
            )


class DownvoteFile(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, file_id):
        user = request.user
        update_user_ip(request)

        try:
            file = File.objects.get(id=file_id)
            if file.upvotes.contains(user):
                file.upvotes.remove(user)
            file.downvotes.add(user)
            file.save()
            return Response(
                {"msg": f"Downvoted {file.filename}", "file_points": file.points},
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            print(f"Error: {str(e)}")
            return Response(
                {"error": "Please enter valid file id"},
                status=status.HTTP_400_BAD_REQUEST,
            )


class RegisterFile(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        update_user_ip(request)
        data = request.data
        try:
            with transaction.atomic():
                user.last_poll = timezone.now()
                required_fields = set(
                    ["filename", "topic", "semester", "professor", "course"]
                )
                provided_fields = set(request.data.keys())
                missing_fields = required_fields - provided_fields

                if any(["filename", "topic"]) in missing_fields:
                    raise ValidationError(
                        "Missing one or more of the required field(s): filename, topic"
                    )

                file = File.objects.create(
                    filename=data["filename"], original_author=user
                )
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

                response_data = {
                    "id": file.id,
                    "filename": file.filename,
                    "topic": file.topic.name if file.topic else None,
                    "semester": file.semester.name if file.semester else None,
                    "course": file.course.name if file.course else None,
                    "professor": file.professor.name if file.professor else None,
                }
                user.points += 1
                file.save()
                user.save()
                return Response(
                    response_data,
                    status=status.HTTP_201_CREATED,
                )
        except Exception as e:
            print("Error", str(e))
            return Response(
                {"error(s)": "Something went wrong"}, status=status.HTTP_400_BAD_REQUEST
            )


from django.utils import timezone
from datetime import timedelta
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import File, PeerUser
from .serializers import FileSerializer


class FileFilterView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        try:
            # Extract filters from the query parameters
            topic_id = request.query_params.get("topic")
            professor_id = request.query_params.get("professor")
            course_id = request.query_params.get("course")
            semester_id = request.query_params.get("semester")

            # Check if provided filter IDs exist
            if topic_id and not Topic.objects.filter(id=topic_id).exists():
                return Response(
                    {"error": f"Topic with id {topic_id} does not exist"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            if professor_id and not Professor.objects.filter(id=professor_id).exists():
                return Response(
                    {"error": f"Professor with id {professor_id} does not exist"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            if course_id and not Course.objects.filter(id=course_id).exists():
                return Response(
                    {"error": f"Course with id {course_id} does not exist"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            if semester_id and not Semester.objects.filter(id=semester_id).exists():
                return Response(
                    {"error": f"Semester with id {semester_id} does not exist"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            # Start with the base queryset
            queryset = File.objects.all()

            # Apply filters if they are provided
            if topic_id:
                queryset = queryset.filter(topic__id=topic_id)
            if professor_id:
                queryset = queryset.filter(professor__id=professor_id)
            if course_id:
                queryset = queryset.filter(course__id=course_id)
            if semester_id:
                queryset = queryset.filter(semester__id=semester_id)

            # Filter files based on active peers in the past hour
            active_peer_ids = PeerUser.objects.filter(
                last_poll__gte=timezone.now() - timedelta(hours=1)
            ).values_list("id", flat=True)
            queryset = queryset.filter(peer_users__in=active_peer_ids).distinct()

            # Sort files based on points column in descending order
            queryset = queryset.order_by("-points")

            # Serialize files
            serializer = FileSerializer(queryset, many=True)
            # Loop through each serialized file to sort its peer_users
            for file_data in serializer.data:
                file_obj = File.objects.get(id=file_data["id"])
                sorted_peer_users = sorted(
                    file_obj.peer_users.all(), key=lambda x: x.points, reverse=True
                )
                file_data["peer_users"] = UserSerializer(
                    sorted_peer_users, many=True
                ).data

            return Response(serializer.data)
        except Exception as e:
            return Response(
                {"error": f"Something went wrong: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
