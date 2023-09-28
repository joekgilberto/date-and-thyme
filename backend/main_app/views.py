from django.shortcuts import render

# import view sets from the REST framework
from rest_framework import viewsets, generics
from rest_framework.permissions import IsAuthenticated  # <-- Here
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password


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
        food_item = FoodItem.objects.get(pk=pk)
        token = self.request.META.get('HTTP_AUTHORIZATION').split()
        
        if food_item.owner == token[1]:
            try:
                return food_item
            except FoodItem.DoesNotExist:
                raise Http404
        

    def get(self, request, pk, format=None):
        food_item = self.get_object(pk)
        token = self.request.META.get('HTTP_AUTHORIZATION').split()
        
        if food_item.owner == token[1]:
        
            serializer = FoodItemSerializer(food_item)
            return Response(serializer.data)

    def put(self, request, pk, format=None):
        food_item = self.get_object(pk)
        token = self.request.META.get('HTTP_AUTHORIZATION').split()

        if food_item.owner == token[1]:
            serializer = FoodItemSerializer(food_item, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        food_item = self.get_object(pk)
        token = self.request.META.get('HTTP_AUTHORIZATION').split()

        if food_item.owner == token[1]:
            food_item.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)

class NotificationList(APIView):
    permission_classes = (IsAuthenticated,)
    """
    List all snippets, or create a new snippet.
    """
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

class NotificationDetail(APIView):
    permission_classes = (IsAuthenticated,)
    """
    Retrieve, update or delete a snippet instance.
    """
    def get_object(self, pk):
        notif = Notification.objects.get(pk=pk)
        token = self.request.META.get('HTTP_AUTHORIZATION').split()

        if notif.owner == token[1]:
            try:
                return notif
            except Notification.DoesNotExist:
                raise Http404

    def get(self, request, pk, format=None):
        notif = self.get_object(pk)
        token = self.request.META.get('HTTP_AUTHORIZATION').split()

        if notif.owner == token[1]:
            serializer = NotificationSerializer(notif)
            return Response(serializer.data)

    def put(self, request, pk, format=None):
        notif = self.get_object(pk)
        token = self.request.META.get('HTTP_AUTHORIZATION').split()

        if notif.owner == token[1]:
            serializer = NotificationSerializer(notif, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        notif = self.get_object(pk)
        token = self.request.META.get('HTTP_AUTHORIZATION').split()

        if notif.owner == token[1]:
            notif.delete()
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