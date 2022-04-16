from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.postgres.fields import ArrayField

class User(AbstractUser):
    first_name = models.CharField(max_length=30, null=False)
    last_name = models.CharField(max_length=30, null=False)
    email = models.CharField(unique=True, max_length=320, null=False)
    password = models.TextField(null=False)
    account_balance = models.IntegerField(default=0)
    wishlist = ArrayField(models.CharField(max_length=64), blank=True)

    username = None

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    class Meta:
        ordering = ['-id']