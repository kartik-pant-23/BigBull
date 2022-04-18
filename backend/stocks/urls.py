from django.urls import path
from . import views

urlpatterns = [
    path('buy/', views.buyStocks),
    path('sell/', views.sellStocks),
    path('<str:symbol>/', views.getStockDetails),
]