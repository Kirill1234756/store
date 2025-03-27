from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator, MaxValueValidator

class User(AbstractUser):
    phone = models.CharField(max_length=20, unique=True, blank=True, null=True)
    email_verified = models.BooleanField(default=False)

    def __str__(self):
        return self.username

class Product(models.Model):
    CONDITION_CHOICES = [
        ('A', 'Как новый'),
        ('B', 'Хорошее'),
        ('C', 'Удовлетворительное')
    ]

    COLOR_CHOICES = [
        ('black', 'Чёрный'),
        ('white', 'Белый'),
        ('gold', 'Золотой'),
        ('silver', 'Серебристый'),
        ('blue', 'Синий'),
        ('red', 'Красный'),
        ('green', 'Зелёный'),
        ('other', 'Другой')
    ]

    # Основная информация
    title = models.CharField(max_length=255, verbose_name='Название')
    description = models.TextField(verbose_name='Описание')
    price = models.DecimalField(
        max_digits=10, decimal_places=2, verbose_name='Цена')
    condition = models.CharField(
        max_length=1, choices=CONDITION_CHOICES, verbose_name='Состояние')

    # Характеристики устройства
    phone_model = models.CharField(
        max_length=100,
        verbose_name='Модель телефона',
        default='Не указана'
    )
    color = models.CharField(
        max_length=20,
        choices=COLOR_CHOICES,
        default='black',
        verbose_name='Цвет'
    )
    storage = models.CharField(
        max_length=20,
        verbose_name='Память',
        default='Не указана'
    )
    screen_size = models.DecimalField(
        max_digits=3,
        decimal_places=1,
        verbose_name='Диагональ экрана (дюймы)',
        default=6.1
    )
    screen_condition = models.CharField(
        max_length=100,
        verbose_name='Состояние экрана',
        blank=True,
        default='Хорошее'
    )
    body_condition = models.CharField(
        max_length=100,
        verbose_name='Состояние корпуса',
        blank=True,
        default='Хорошее'
    )
    battery_health = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(100)],
        verbose_name='Здоровье аккумулятора (%)',
        default=80
    )
    includes = models.TextField(
        verbose_name='Комплектация',
        blank=True,
        default='Телефон, зарядное устройство'
    )

    # Контактная информация
    seller_phone = models.CharField(
        max_length=20,
        verbose_name='Телефон продавца',
        default=''
    )
    seller_address = models.TextField(
        verbose_name='Адрес продавца',
        blank=True,
        default='Не указан'
    )

    # Даты
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # Связи
    seller = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        verbose_name='Продавец'
    )

    # Изображения
    main_image = models.ImageField(
        upload_to='products/',
        verbose_name='Главное изображение',
        default='products/default.jpg'
    )
    image_2 = models.ImageField(
        upload_to='products/',
        blank=True,
        null=True,
        verbose_name='Доп. изображение 1'
    )
    image_3 = models.ImageField(
        upload_to='products/',
        blank=True,
        null=True,
        verbose_name='Доп. изображение 2'
    )
    image_4 = models.ImageField(
        upload_to='products/',
        blank=True,
        null=True,
        verbose_name='Доп. изображение 3'
    )


class Favorite(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.phone_model} {self.color} ({self.get_condition_display()})"

    class Meta:
        verbose_name = 'Товар'
        verbose_name_plural = 'Товары'
        # Один товар - один лайк от пользователя
        unique_together = ('user', 'product')
