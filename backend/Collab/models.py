import random

from django.db import models

class User(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    image_index = random.randint(1, 4)
    profilePicture = models.ImageField(upload_to='images/', default=f'images/Sigil{image_index}.png')
    bannerPicture = models.ImageField(upload_to='images/', default='images/banner.png')
    description = models.TextField(default='')
    is_admin = models.BooleanField(default=False)


    def __str__(self):
        return str(self.id)

