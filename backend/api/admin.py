from django.contrib import admin
from api.models import PeerUser, Semester, Professor, Course, Topic, File

# Register your models here.
admin.site.register(PeerUser)
admin.site.register(Topic)
admin.site.register(Professor)
admin.site.register(Course)
admin.site.register(File)
admin.site.register(Semester)
