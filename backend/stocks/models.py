from django.db import models

from users.models import User

class Stock(models.Model):
    symbol = models.CharField(max_length=128, null=False)
    company_name = models.CharField(max_length=128, null=False)
    avg_value = models.FloatField(default=0.0)
    quantity = models.IntegerField(default=0)
    user_id = models.ForeignKey(to=User, on_delete=models.CASCADE)

    class Meta:
        ordering = ['-id']

class Company(models.Model):
    symbol = models.CharField(max_length=128, null=False)
    company_name = models.CharField(max_length=128, null=False)

    class Meta:
        ordering = ['id']