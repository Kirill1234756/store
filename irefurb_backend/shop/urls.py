from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import RegisterView, FavoriteListView, FavoriteDetailView, ProductViewSet

router = DefaultRouter()
router.register(r'products', ProductViewSet)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('favorites/', FavoriteListView.as_view(), name='favorite-list'),
    path('favorites/<int:product_id>/',
         FavoriteDetailView.as_view(), name='favorite-detail'),
]
