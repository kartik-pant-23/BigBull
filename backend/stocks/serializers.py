from rest_framework.serializers import ModelSerializer
from .models import Stock

class StockSerializer(ModelSerializer):
    class Meta:
        model = Stock
        fields = ['symbol', 'company_name', 'quantity', 'avg_value', 'quantity', 'user_id', 'id']
        extra_kwargs = {
            'user_id': {'write_only': True}
        }

class CompanySerializer(ModelSerializer):
    class Meta:
        model = Stock
        fields = ['symbol', 'company_name']