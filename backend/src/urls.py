from cgitb import handler
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/users/', include('users.urls')),
    path('api/stocks/', include('stocks.urls')),
    path('', include('frontend.urls')),
]