# Generated by Django 4.2.11 on 2024-03-26 16:30

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0002_course_professor_semester_topic_peeruser_last_poll_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="file",
            name="course",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="files",
                to="api.course",
            ),
        ),
        migrations.AlterField(
            model_name="file",
            name="original_author",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="owned_files",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.AlterField(
            model_name="file",
            name="professor",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="files",
                to="api.professor",
            ),
        ),
        migrations.AlterField(
            model_name="file",
            name="semester",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="files",
                to="api.semester",
            ),
        ),
        migrations.AlterField(
            model_name="file",
            name="topic",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="files",
                to="api.topic",
            ),
        ),
    ]