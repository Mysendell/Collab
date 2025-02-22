import json

from django.contrib.auth.hashers import check_password, make_password
from django.http import JsonResponse

from backend.Collab.models import User


def return_username(request):
    username = request.session.get('username')
    print(f"Session username: {username}")
    if not username:
        return JsonResponse({"username": False})
    return JsonResponse({"username": username})

def login(request, user_id):
    user = User.objects.get(id=user_id)
    username = user.username
    response = JsonResponse({"message": "Login successful"})
    print(username)
    request.session['username'] = username
    print(f"Session username: {request.session.get('username')}")
    return response


def validate_login(request):
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON"}, status=400)
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return JsonResponse({"error": "Username and password are required."}, status=400)

    try:
        user = User.objects.get(username=username)

        if check_password(password, user.password):
            return login(request, user.id)
        else:
            return JsonResponse({"error": "Invalid password"}, status=401)

    except User.DoesNotExist:
        return JsonResponse({"error": "User does not exist"}, status=404)


def register(request):
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON"}, status=400)
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return JsonResponse({"error": "Username and password are required."}, status=400)

    if User.objects.filter(username=username).exists():
        return JsonResponse({"error": "Username already exists."}, status=400)

    hashed_password = make_password(password)

    user = User.objects.create(username=username, password=hashed_password)
    user.save()
    return login(request, user.id)