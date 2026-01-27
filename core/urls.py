from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ReportViewSet, current_user

router = DefaultRouter()
router.register(r'reports', ReportViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('user/', current_user, name='current_user'),
]
