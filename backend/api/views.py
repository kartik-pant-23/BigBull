from rest_framework.response import Response
from rest_framework.decorators import api_view

@api_view(['GET'])
def getAllRoutes(request):
    routesData = {
        'message': "This message is coming from the backend!!"
    }    
    return Response(routesData)
