from django.contrib.auth import get_user_model  # Добавьте этот импорт
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny

User = get_user_model()

@api_view(['GET'])
@permission_classes([AllowAny])
def check_username(request):
    username = request.query_params.get('username')
    if not username:
        return Response({'error': 'Username parameter is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    exists = User.objects.filter(username__iexact=username).exists()
    return Response({'available': not exists})

@api_view(['GET'])
@permission_classes([AllowAny])
def check_email(request):
    email = request.query_params.get('email')
    if not email:
        return Response({'error': 'Email parameter is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    exists = User.objects.filter(email__iexact=email).exists()
    return Response({'available': not exists})

@api_view(['POST'])
@permission_classes([AllowAny])
def send_verification_email(request):
    email = request.data.get('email')
    if not email:
        return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = User.objects.get(email=email)
        token = default_token_generator.make_token(user)
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        
        verification_url = f"{request.build_absolute_uri('/')}verify-email/{uid}/{token}/"
        
        html_message = render_to_string('email/verification_email.html', {
            'verification_url': verification_url
        })
        
        send_mail(
            'Verify your email',
            '',
            'noreply@example.com',
            [email],
            html_message=html_message
        )
        return Response({'status': 'Email sent'})
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
@permission_classes([AllowAny])
def verify_email(request, uidb64, token):
    try:
        uid = urlsafe_base64_decode(uidb64).decode()
        user = User.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None

    if user is not None and default_token_generator.check_token(user, token):
        user.email_verified = True
        user.save()
        return Response({'status': 'Email verified'})
    else:
        return Response({'error': 'Invalid verification link'}, status=status.HTTP_400_BAD_REQUEST)