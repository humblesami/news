from . import views
from django.urls import path

app_name = 'documents'
urlpatterns = [
    path('upload-files', views.upload_files, name = 'index'),
    path('upload-single-file', views.upload_single_file, name = 'single_file'),
    path('upload-single-image-file', views.upload_single_image_file, name = 'single_image_file'),
]