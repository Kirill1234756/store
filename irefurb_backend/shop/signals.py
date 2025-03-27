from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.mail import send_mail
from .models import Product


@receiver(post_save, sender=Product)
def notify_admin(sender, instance, created, **kwargs):
    if created:
        send_mail(
            'Новый товар добавлен',
            f'Добавлен новый {instance.title} за {instance.price} руб.',
            'noreply@irefurb.com',
            ['admin@irefurb.com'],
            fail_silently=True,
        )
