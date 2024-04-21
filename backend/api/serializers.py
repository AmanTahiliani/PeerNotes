from rest_framework import serializers
from .models import PeerUser, Topic, Semester, Professor, Course, File


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = PeerUser
        fields = ["id", "username", "email", "ip_address", "points"]


class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = "__all__"


class ProfessorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Professor
        fields = "__all__"


class SemesterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Semester
        fields = "__all__"


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = "__all__"


class FileSerializer(serializers.ModelSerializer):
    original_author = UserSerializer()
    peer_users = UserSerializer(many=True)
    topic = TopicSerializer()
    professor = ProfessorSerializer()
    semester = SemesterSerializer()
    course = CourseSerializer()

    class Meta:
        model = File
        fields = [
            "id",
            "filename",
            "points",
            "original_author",
            "peer_users",
            "topic",
            "professor",
            "semester",
            "course",
            "created_at",
            "upvotes",
            "downvotes",
        ]
