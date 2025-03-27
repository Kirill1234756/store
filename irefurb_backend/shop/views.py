# from rest_framework import viewsets, permissions
# from .models import Product
# from .serializers import ProductSerializer, RegisterSerializer
# from rest_framework.response import Response
# from rest_framework import status


# class ProductViewSet(viewsets.ModelViewSet):
#     queryset = Product.objects.all()
#     serializer_class = ProductSerializer
#     permission_classes = [permissions.IsAuthenticatedOrReadOnly]

#     def perform_create(self, serializer):
#         serializer.save(seller=self.request.user)


# class RegisterView(viewsets.GenericViewSet):
#     serializer_class = RegisterSerializer

#     def create(self, request):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_201_CREATED)


from rest_framework import viewsets, generics, permissions, status
from rest_framework.response import Response
from .models import Product, Favorite
from .serializers import ProductSerializer, RegisterSerializer, FavoriteSerializer


class ProductViewSet(viewsets.ModelViewSet):
    """
    ViewSet для товаров:
    - Чтение доступно всем (GET)
    - Создание/изменение только авторизованным
    - Автоматическое назначение продавца при создании
    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(seller=self.request.user)


class RegisterView(generics.CreateAPIView):
    """
    Регистрация нового пользователя
    """
    serializer_class = RegisterSerializer


class FavoriteListView(generics.ListCreateAPIView):
    """
    Просмотр и добавление в избранное:
    - Только для авторизованных пользователей
    - Возвращает только избранное текущего пользователя
    """
    serializer_class = FavoriteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Favorite.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class FavoriteDetailView(generics.DestroyAPIView):
    """
    Удаление из избранного:
    - Только для авторизованных пользователей
    - Можно удалять только свои избранные товары
    """
    serializer_class = FavoriteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Favorite.objects.filter(user=self.request.user)
