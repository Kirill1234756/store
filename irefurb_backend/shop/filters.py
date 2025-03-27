import django_filters
from .models import Product


class ProductFilter(django_filters.FilterSet):
    min_price = django_filters.NumberFilter(
        field_name="price", lookup_expr='gte')
    max_price = django_filters.NumberFilter(
        field_name="price", lookup_expr='lte')
    storage = django_filters.CharFilter(
        field_name="storage", lookup_expr='iexact')

    class Meta:
        model = Product
        fields = ['condition', 'min_price', 'max_price', 'storage']
