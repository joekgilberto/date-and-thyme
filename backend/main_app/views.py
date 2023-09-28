from django.shortcuts import render

# import view sets from the REST framework
from rest_framework import viewsets, generics
from rest_framework.permissions import IsAuthenticated  # <-- Here
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404
from django.contrib.auth.models import User


# import the FoodItemSerializer,NotificationSerializer from the serializer file
from .serializers import FoodItemSerializer,NotificationSerializer,UserSerializer

# import the FoodItem,Notification model from the models file
from .models import FoodItem,Notification
# create a class for the FoodItem model viewsets
# class FoodItemView(viewsets.ModelViewSet):

# 	# create a serializer class and
# 	# assign it to the FoodItemSerializer class
# 	serializer_class = FoodItemSerializer

# 	# define a variable and populate it
# 	# with the FoodItem list objects
# 	queryset = FoodItem.objects.all()
class UserList(APIView):
    def post(self, request, format=None):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class FoodItemList(APIView):
    permission_classes = (IsAuthenticated,)             # <-- And here

    """
    List all snippets, or create a new snippet.
    """
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

class FoodItemDetail(APIView):
    permission_classes = (IsAuthenticated,)             # <-- And here

    """
    Retrieve, update or delete a snippet instance.
    """
    def get_object(self, pk):
        try:
            return FoodItem.objects.get(pk=pk)
        except FoodItem.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        food_item = self.get_object(pk)
        serializer = FoodItemSerializer(food_item)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        food_item = self.get_object(pk)
        serializer = FoodItemSerializer(food_item, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        food_item = self.get_object(pk)
        food_item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# class NotificationView(viewsets.ModelViewSet):

# 	# create a serializer class and
# 	# assign it to the NotificationsSerializer class
# 	serializer_class = NotificationSerializer

# 	# define a variable and populate it
# 	# with the Notification list objects
# 	queryset = Notification.objects.all()

# class NotificationView(viewsets.ModelViewSet):
#     serializer_class = NotificationSerializer
#     queryset = Notification.objects.all()

class NotificationList(APIView):
    permission_classes = (IsAuthenticated,)
    """
    List all snippets, or create a new snippet.
    """
    def get(self, request, format=None):
        notification = Notification.objects.all()
        serializer = NotificationSerializer(notification, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = NotificationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class NotificationDetail(APIView):
    permission_classes = (IsAuthenticated,)
    """
    Retrieve, update or delete a snippet instance.
    """
    def get_object(self, pk):
        try:
            return Notification.objects.get(pk=pk)
        except Notification.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        notification = self.get_object(pk)
        serializer = NotificationSerializer(notification)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        notification = self.get_object(pk)
        serializer = NotificationSerializer(notification, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        notification = self.get_object(pk)
        notification.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class NotificationQueryView(generics.ListAPIView):
    serializer_class = NotificationSerializer

    def get_queryset(self):
        """
        Optionally restricts the returned purchases to a given user,
        by filtering against a `username` query parameter in the URL.
        """
        queryset = Notification.objects.all()
        food = self.request.query_params.get('food')
        if food is not None:
            queryset = queryset.filter(food_item=food)
        return queryset