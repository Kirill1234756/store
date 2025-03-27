from rest_framework.permissions import BasePermission


class IsSellerOrAdmin(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.seller == request.user or request.user.is_staff
