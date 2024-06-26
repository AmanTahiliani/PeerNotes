from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db import models


class PeerUser(AbstractUser):
    ip_address = models.GenericIPAddressField(blank=True, null=True)
    last_poll = models.DateTimeField(auto_now_add=True)
    points = models.IntegerField(default=0, blank=False)


class Topic(models.Model):
    name = models.CharField(max_length=100, blank=False, null=False)
    description = models.TextField(blank=True)

    def __str__(self) -> str:
        return self.name


class Professor(models.Model):
    name = models.CharField(max_length=100, blank=False, null=False)

    def __str__(self) -> str:
        return self.name


class Semester(models.Model):
    name = models.CharField(max_length=20, blank=False, null=False)

    def __str__(self) -> str:
        return self.name


class Course(models.Model):
    name = models.CharField(max_length=40, blank=True)
    number = models.CharField(max_length=20, blank=False, null=False, unique=True)

    def __str__(self) -> str:
        return self.number + f" ({self.name})"


class File(models.Model):
    filename = models.CharField(max_length=200, blank=False, null=False)
    original_author = models.ForeignKey(
        PeerUser, on_delete=models.SET_NULL, null=True, related_name="owned_files"
    )
    peer_users = models.ManyToManyField(PeerUser, related_name="shared_files")
    topic = models.ForeignKey(
        Topic, on_delete=models.SET_NULL, null=True, related_name="files"
    )
    professor = models.ForeignKey(
        Professor, on_delete=models.SET_NULL, null=True, related_name="files"
    )
    semester = models.ForeignKey(
        Semester, on_delete=models.SET_NULL, null=True, related_name="files"
    )
    course = models.ForeignKey(
        Course, on_delete=models.SET_NULL, null=True, related_name="files"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    upvotes = models.ManyToManyField(PeerUser, related_name="upvoted_file")
    downvotes = models.ManyToManyField(PeerUser, related_name="downvoted_file")

    @property
    def points(self):
        return self.upvotes.count() - self.downvotes.count()

    def __str__(self):
        return self.filename


class UserReport(models.Model):
    user = models.ForeignKey(
        PeerUser, on_delete=models.SET_NULL, null=True, related_name="user_report"
    )
    reporting_user = models.ForeignKey(
        PeerUser,
        on_delete=models.SET_NULL,
        null=True,
        related_name="user_report_generated",
    )
    description = models.TextField(blank=False, null=False, max_length=300)
    file = models.ForeignKey(
        File, on_delete=models.CASCADE, null=True, related_name="file_report"
    )

    def __str__(self) -> str:
        return f"{self.user}:{self.file}:{self.reporting_user}"
