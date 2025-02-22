from django.contrib import admin
from django.contrib.sessions.models import Session

from backend.Collab.models import User

# Register your models here.
admin.site.register(User)

@admin.register(Session)
class SessionAdmin(admin.ModelAdmin):
    list_display = ['session_key', 'session_data', 'expire_date']