"""main URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls import include,url
from django.contrib import admin
from django.urls import path

from main_app import views
from .import rest_api

urlpatterns = [
    # url(r'', include('static.urls')),
    url(r'^admin/', admin.site.urls, name='admin'),
    path('rest/public', rest_api.public, name = 'public'),
    path('rest/secure', rest_api.tokened_request, name = 'secure'),
    path('rest/session', rest_api.session, name = 'session'),

    url(r'^user/', include('auth_app.urls')),

    url('auth-code/', include('auth_code.urls')),
    url(r'^chat/', include('chat.urls')),
    url(r'^search/', include('search.urls')),

    path('media/<str:folder>/<str:file>/', views.serve_protected_document, name='serve_protected_document'),

] # + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# admin.site.site_header = ''
# admin.site.site_title = ''
# admin.site.index_title = ''
