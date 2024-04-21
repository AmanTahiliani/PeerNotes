"""
URL configuration for peer_notes project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.urls import path
from api.user_login import LoginView, SignupView, PollOnlineView
from api import views

urlpatterns = [
    path("api/login/", LoginView.as_view(), name="login"),
    path("api/signup/", SignupView.as_view(), name="signup"),
    path("api/poll/", PollOnlineView.as_view(), name="poll"),
    path("api/topics/", views.TopicListCreateAPIView.as_view(), name="topic-list"),
    path(
        "api/topics/<int:pk>/", views.TopicDetailAPIView.as_view(), name="topic-detail"
    ),
    path(
        "api/professors/",
        views.ProfessorListCreateAPIView.as_view(),
        name="professor-list",
    ),
    path(
        "api/professors/<int:pk>/",
        views.ProfessorDetailAPIView.as_view(),
        name="professor-detail",
    ),
    path(
        "api/semesters/",
        views.SemesterListCreateAPIView.as_view(),
        name="semester-list",
    ),
    path(
        "api/semesters/<int:pk>/",
        views.SemesterDetailAPIView.as_view(),
        name="semester-detail",
    ),
    path("api/courses/", views.CourseListCreateAPIView.as_view(), name="course-list"),
    path(
        "api/courses/<int:pk>/",
        views.CourseDetailAPIView.as_view(),
        name="course-detail",
    ),
    path("api/files/", views.FileListCreateAPIView.as_view(), name="file-list"),
    path(
        "api/files/<int:file_id>/upvote/",
        views.UpvoteFile.as_view(),
        name="upvote-file",
    ),
    path(
        "api/files/<int:file_id>/downvote/",
        views.DownvoteFile.as_view(),
        name="downvote-file",
    ),
    path("api/files/<int:pk>/", views.FileDetailAPIView.as_view(), name="file-detail"),
    path("api/report_user/", views.ReportUserView.as_view(), name="report-user"),
    path("api/register/", views.RegisterFile.as_view(), name="file-register"),
    path("api/files/filter/", views.FileFilterView.as_view(), name="file-filter-view"),
]
