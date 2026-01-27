"""
URL configuration for datavaultpro project.
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/', include('core.urls')),
    path('', TemplateView.as_view(template_name='login.html'), name='login'),
    path('data/', TemplateView.as_view(template_name='data.html'), name='data'),
    path('admin-panel/', TemplateView.as_view(template_name='admin_panel.html'), name='admin_panel'),
    path('report/<int:pk>/', TemplateView.as_view(template_name='report_detail.html'), name='report_detail'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATICFILES_DIRS[0])
