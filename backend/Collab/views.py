import json

from django.contrib.auth.hashers import check_password, make_password
from django.http import JsonResponse

from backend.Collab.models import User


def return_username(request):
    if "user_id" not in request.session:
        return JsonResponse({"username": "Not Logged in"})
    return JsonResponse({"username": request.session["user_id"]})

def login(request, user_id):
    request.session["user_id"] = user_id

def validate_login(request):
    username = request.POST.get("username")
    password = request.POST.get("password")
    if not username or not password:
        return JsonResponse({"error": "Username and password are required."}, status=400)

    try:
        user = User.objects.get(username=username)

        if check_password(password, user.password):
            login(request, user.id)
            return JsonResponse({"message": "Login successful"})
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
    login(request, user.id)
    return JsonResponse({"message": "Registration successful"})
