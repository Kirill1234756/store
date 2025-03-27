from django.urls import reverse
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model
from .models import Product

User = get_user_model()


class ProductTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='test', password='testpass')
        self.product = Product.objects.create(
            title='iPhone 12',
            price=50000,
            condition='A',
            storage='128GB',
            battery_health=95,
            seller=self.user
        )

    def test_product_list(self):
        url = reverse('product-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
