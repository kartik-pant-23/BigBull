from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import User
from .serializers import UserSerializer
from stocks.models import Stock
from stocks.serializers import StockSerializer
from stocks.views import scrapeStockDetails
from django.contrib.auth.hashers import make_password, check_password
import jwt, datetime

@api_view(['POST'])
def registerUser(request):
    user = User.objects.filter(email = request.data['email']).first()
    if (user):
        return Response({
            "message": "User already exists!"
        }, status=403)
    data = request.data
    hash_password = make_password(data['password'])
    User.objects.create(
        first_name = data['first_name'],
        last_name = data['last_name'],
        email = data['email'],
        password = hash_password,
        wishlist = []
    )
    return Response({ "message": "User created!" })

@api_view(['POST'])
def loginUser(request):
    data = request.data
    user = User.objects.filter(email=data['email']).first()
    if user:
        match = check_password(data['password'], user.password)
        if (match):
            payload = {
                "id": user.id,
                "exp": datetime.datetime.utcnow() + datetime.timedelta(days=30),
                "iat": datetime.datetime.utcnow()
            }
            token = jwt.encode(payload, "secret", "HS256")
            return Response({ 
                "message": "Login successful!",
                "token": token 
            })
    return Response({ "message": "Incorrect email or password!" }, status=403)

@api_view(['GET'])
def getUserDetails(request, user_id):
    user = User.objects.filter(id=user_id).first()
    if user:
        user_data = UserSerializer(user).data
        portfolio = Stock.objects.filter(user_id=user_id)
        portfolio_data = StockSerializer(portfolio, many=True).data
        return Response({
            "message": "success",
            "user": user_data,
            "portfolio": portfolio_data,
        })
    return Response({ "message": "User does not exist!" }, status=404)

@api_view(['PATCH'])
def addToWatchlist(request):
    data = request.data
    user = User.objects.filter(id=data['user_id']).first()
    if (user):
        if data['stock'] not in user.wishlist:
            user.wishlist.append(data['stock'])
        user.save()
        user_data = UserSerializer(user).data
        user_data['watchlist'] = user.wishlist
        return Response({
            "message": "user update successful!", 
            "user": user_data
        })
    return Response({ "message": "User does not exist!" }, status=404)

@api_view(['GET'])
def getWatchlist(request, user_id):
    data = request.data
    user = User.objects.filter(id=user_id).first()
    if (user):
        watchlist_data = []
        for symbol in user.wishlist:
            data = scrapeStockDetails(symbol)
            watchlist_data.append({
                "symbol": symbol,
                "company": data["Company Name"],
                "current_price": data["Current Price"]
            })
        return Response(watchlist_data)
    return Response({ "message": "User does not exist!" })

@api_view(['PATCH'])
def resetBalance(request, user_id):
    user = User.objects.filter(id=user_id).first()
    if (user):
        user.account_balance = 100000
        user.save()
        return Response({
            "message": "user update successful!", 
            "user": UserSerializer(user).data
        })
    return Response({ "message": "User does not exist!" }, status=404)