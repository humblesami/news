from django.contrib import admin
from documents.models import File
from main_app.admin import BaseAdmin, BaseInlineAdmin


class FileAdmin(BaseAdmin):
    list_display = ['id', 'name', 'upload_status', 'file_type', 'upload_status', 'updated_by']
    exclude = ('created_at', 'created_by', 'updated_at', 'updated_by', 'file_type', 'upload_status')


class FileInlineAdmin(BaseInlineAdmin):
    extra = 0
    exclude = (
        'created_at', 'created_by', 'updated_at', 'updated_by', 'file_type',
        'upload_status', 'cloud_url', 'access_token', 'file_name')
    template = 'admin/stacked.html'


admin.site.register(File, FileAdmin)