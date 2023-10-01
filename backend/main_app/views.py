# Improts APIView view from rest_framework
from rest_framework.views import APIView
# Imports Response from rest_framework
from rest_framework.response import Response
# Imports status from rest_framework
from rest_framework import status
# Imports permissions' IsAuthenticated from rest_framework
from rest_framework.permissions import IsAuthenticated
# Imports Http404 and HttpResponse
from django.http import Http404, HttpResponse
# Imports make_password
from django.contrib.auth.hashers import make_password
# Imports serializers
from .serializers import FoodItemSerializer,NotificationSerializer,UserSerializer
# Imports models
from .models import FoodItem,Notification

# Defines home view which response with "date & thyme"
def home(request):
    return HttpResponse("date & thyme")

# Defines view to create a user utilizing the APIView
class CreateUser(APIView):
    def post(self, request, format='json'):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            password = serializer.validated_data.get('password')
            serializer.validated_data['password']=make_password(password)
            new_user = serializer.save()
            if new_user:
                return Response(serializer.data['username'], status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


# Defines view to get all FoodItems and creating one if the user is authenticated
class FoodItemList(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, format=None):
        food_items = FoodItem.objects.all()
        token = request.META.get('HTTP_AUTHORIZATION').split()
        food_items = food_items.filter(owner=token[1])
        serializer = FoodItemSerializer(food_items, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = FoodItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Defines view to get, update, and delete specific FoodItems found based off of the auth token if authenticated
class FoodItemDetail(APIView):
    permission_classes = (IsAuthenticated,)             # <-- And here

    def get_object(self, pk):
        food_item = FoodItem.objects.get(pk=pk)
        token = self.request.META.get('HTTP_AUTHORIZATION').split()
        owner = str(food_item.owner)
        
        if owner == token[1]:
            try:
                return food_item
            except FoodItem.DoesNotExist:
                raise Http404
        

    def get(self, request, pk, format=None):
        food_item = self.get_object(pk)
        token = self.request.META.get('HTTP_AUTHORIZATION').split()
        owner = str(food_item.owner)

        if owner == token[1]:
        
            serializer = FoodItemSerializer(food_item)
            return Response(serializer.data)

    def put(self, request, pk, format=None):
        food_item = self.get_object(pk)
        token = self.request.META.get('HTTP_AUTHORIZATION').split()
        owner = str(food_item.owner)

        if owner == token[1]:
            serializer = FoodItemSerializer(food_item, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        food_item = self.get_object(pk)
        token = self.request.META.get('HTTP_AUTHORIZATION').split()
        owner = str(food_item.owner)

        if owner == token[1]:
            food_item.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)

# Defines view to get all Notifications and creating one if the user is authenticated
class NotificationList(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, format=None):
        notification = Notification.objects.all()
        token = request.META.get('HTTP_AUTHORIZATION').split()
        notification = notification.filter(owner=token[1])
        serializer = NotificationSerializer(notification, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = NotificationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Defines view to get, update, and delete specific Notifications found based off of the auth token if authenticated
class NotificationDetail(APIView):
    permission_classes = (IsAuthenticated,)

    def get_object(self, pk):
        notif = Notification.objects.get(pk=pk)
        token = self.request.META.get('HTTP_AUTHORIZATION').split()
        owner = str(notif.owner)

        if owner == token[1]:
            try:
                return notif
            except Notification.DoesNotExist:
                raise Http404

    def get(self, request, pk, format=None):
        notif = self.get_object(pk)
        token = self.request.META.get('HTTP_AUTHORIZATION').split()
        owner = str(notif.owner)

        if owner == token[1]:
            serializer = NotificationSerializer(notif)
            return Response(serializer.data)

    def put(self, request, pk, format=None):
        notif = self.get_object(pk)
        token = self.request.META.get('HTTP_AUTHORIZATION').split()
        owner = str(notif.owner)

        if owner == token[1]:
            serializer = NotificationSerializer(notif, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        notif = self.get_object(pk)
        token = self.request.META.get('HTTP_AUTHORIZATION').split()
        owner = str(notif.owner)

        if owner == token[1]:
            notif.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)