from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ReportViewSet, current_user, register, list_users, delete_user

router = DefaultRouter()
router.register(r'reports', ReportViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('user/', current_user, name='current_user'),
    path('register/', register, name='register'),
    path('users/', list_users, name='list_users'),
    path('users/<int:user_id>/', delete_user, name='delete_user'),
]
