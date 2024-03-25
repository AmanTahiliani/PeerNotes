from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db import models


class PeerUser(AbstractUser):
    ip_address = models.GenericIPAddressField(blank=True, null=True)
