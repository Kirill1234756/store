from rest_framework import permissions

class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Пермишен, который позволяет редактировать объект только его владельцу.
    """
    def has_object_permission(self, request, view, obj):
        # Разрешаем GET, HEAD или OPTIONS запросы (только чтение)
        if request.method in permissions.SAFE_METHODS:
            return True

        # Разрешаем запись только если пользователь - владелец
        return obj.seller == request.user