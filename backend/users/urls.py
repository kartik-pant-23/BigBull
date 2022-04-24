from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.registerUser),
    path('login/', views.loginUser),
    path('user/<int:user_id>/', views.getUserDetails),
    path('watchlist/add/', views.addToWatchlist),
    path('watchlist/<int:user_id>/', views.getWatchlist),
    path('reset_balance/<int:user_id>/', views.resetBalance)
]