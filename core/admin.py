from django.contrib import admin
from .models import Report, ReportData


@admin.register(Report)
class ReportAdmin(admin.ModelAdmin):
    list_display = ['title', 'uploaded_by', 'uploaded_at', 'row_count']
    list_filter = ['uploaded_at', 'uploaded_by']
    search_fields = ['title']
    readonly_fields = ['uploaded_at']

    def row_count(self, obj):
        return obj.data_rows.count()
    row_count.short_description = 'Rows'


@admin.register(ReportData)
class ReportDataAdmin(admin.ModelAdmin):
    list_display = ['report', 'row_number']
    list_filter = ['report']
    search_fields = ['report__title']
