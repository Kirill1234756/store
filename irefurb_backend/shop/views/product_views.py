from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from shop.models import Product, Favorite  
from shop.serializers import ProductSerializer
from shop.permissions import IsOwnerOrReadOnly  

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all().order_by('-created_at')
    serializer_class = ProductSerializer
    permission_classes = [IsOwnerOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(seller=self.request.user)

    @action(detail=True, methods=['post', 'delete'], permission_classes=[IsAuthenticated])
    def favorite(self, request, pk=None):
        product = self.get_object()
        
        if request.method == 'POST':
            favorite, created = Favorite.objects.get_or_create(
                user=request.user,
                product=product
            )
            if not created:
                return Response(
                    {'detail': 'Товар уже в избранном'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            return Response({'status': 'added'})
        
        elif request.method == 'DELETE':
            Favorite.objects.filter(
                user=request.user,
                product=product
            ).delete()
            return Response({'status': 'removed'})

    @action(detail=False, permission_classes=[IsAuthenticated])
    def my_favorites(self, request):
        favorites = Favorite.objects.filter(user=request.user)
        products = [fav.product for fav in favorites]
        serializer = self.get_serializer(products, many=True)
        return Response(serializer.data)