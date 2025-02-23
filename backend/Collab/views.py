import json

from django.contrib.auth.hashers import check_password, make_password
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from backend.Collab.models import User


def return_username(request):
    username = request.session.get("username")
    if not username or not User.objects.filter(username=username).exists():
        return JsonResponse({"username": False})
    return JsonResponse({"username": username})


def login(request, user_id):
    if (request.session.get("username") is not None):
        return JsonResponse({"message": "Already logged in"}, status=400)
    user = User.objects.get(id=user_id)
    username = user.username
    response = JsonResponse({"message": "Login successful"})
    request.session["username"] = username
    return response


def logout(request):
    if "username" not in request.session:
        return JsonResponse({"message": "Not logged in"}, status=401)
    request.session["username"] = None
    return JsonResponse({"message": "Logout successful"})


def validate_login(request):
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({"message": "Invalid JSON"}, status=400)
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return JsonResponse({"message": "Username and password are required."}, status=400)

    try:
        user = User.objects.get(username=username)

        if check_password(password, user.password):
            return login(request, user.id)
        else:
            return JsonResponse({"message": "Invalid password"}, status=401)

    except User.DoesNotExist:
        return JsonResponse({"message": ""}, status=404)


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


def get_user_data(request):
    username = request.session.get("username")
    if not username:
        return JsonResponse({"error": "Not logged in"}, status=401)
    user = User.objects.get(username=username)
    return JsonResponse(
        {"username": user.username, "description": user.description, "profilePicture": user.profilePicture.url,
         "bannerPicture": user.bannerPicture.url, "isAdmin": user.is_admin})


def upload_profile_picture(request):
    username = request.session.get("username")
    if not username:
        return JsonResponse({"error": "Not logged in"}, status=401)
    user = User.objects.get(username=username)
    user.profilePicture = request.FILES['profilePicture']
    user.save()
    return JsonResponse({"message": user.profilePicture.url})


def upload_banner_picture(request):
    username = request.session.get("username")
    if not username:
        return JsonResponse({"error": "Not logged in"}, status=401)
    user = User.objects.get(username=username)
    user.bannerPicture = request.FILES['bannerPicture']
    user.save()
    return JsonResponse({"message": user.bannerPicture.url})

def update_description(request):
    username = request.session.get("username")
    if not username:
        return JsonResponse({"error": "Not logged in"}, status=401)
    try:
        data = json.loads(request.body)
        new_description = data.get("description")
        if not new_description:
            return JsonResponse({"error": "Description is required"}, status=400)
        user = User.objects.get(username=username)
        user.description = new_description
        user.save()
        return JsonResponse({"message": "Description updated successfully"})
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON"}, status=400)

