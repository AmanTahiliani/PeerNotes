from django.db import migrations
import os

import json


def load_data_from_json(apps, schema_editor):
    Semester = apps.get_model("api", "Semester")
    Semester.objects.all().delete()
    for year in range(2015, 2024):
        for sem in ["Spring", "Summer", "Fall"]:
            try:
                Semester.objects.create(
                    name=f"{sem} {year}",
                )
            except Exception as e:
                print("Error:", str(e))


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0010_add_professors"),
    ]
    operations = [
        migrations.RunPython(load_data_from_json),
    ]
