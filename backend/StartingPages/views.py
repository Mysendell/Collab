from django.http import JsonResponse

def index(request):
    data = {
        "message": "Welcome to the homepage!"
    }
    return JsonResponse(data)