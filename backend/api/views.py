from django.http import JsonResponse

def return_username(request):
    return JsonResponse({"username": "User"})