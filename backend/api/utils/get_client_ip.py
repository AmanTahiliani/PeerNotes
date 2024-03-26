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
    user.save()
