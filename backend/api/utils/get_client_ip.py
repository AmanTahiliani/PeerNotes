from typing import Any
from django.utils import timezone


def get_client_ip(request):
    x_forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR")
    if x_forwarded_for:
        ip = x_forwarded_for.split(",")[0]
    else:
        ip = request.META.get("REMOTE_ADDR")
    return ip


def update_user_ip(request):
    user = request.user
    ip_address = get_client_ip(request)
    user.ip_address = ip_address
    user.last_poll = timezone.now()
    user.save()


class PollMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        print("Updating user last online and IP address")
        update_user_ip(request)
        response = self.get_response(request)

        return response
