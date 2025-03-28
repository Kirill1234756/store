from django.urls import path, include
from rest_framework.routers import DefaultRouter
from shop.views.product_views import ProductViewSet
from shop.views.auth_views import (
    check_username,
    check_email,
    send_verification_email,
    verify_email
)

router = DefaultRouter()
router.register(r'products', ProductViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('auth/check-username/', check_username, name='check-username'),
    path('auth/check-email/', check_email, name='check-email'),
    path('auth/send-verification/', send_verification_email, name='send-verification'),
    path('auth/verify-email/<uidb64>/<token>/', verify_email, name='verify-email'),
]