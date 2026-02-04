from django.db import models
from django.contrib.auth.models import User


class Report(models.Model):
    title = models.CharField(max_length=255)
    uploaded_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reports')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    file = models.FileField(upload_to='reports/')
    headers = models.JSONField(default=list, blank=True)  # Store column order
    reporting_period = models.CharField(max_length=255, blank=True, null=True)  # Editable period

    class Meta:
        ordering = ['-uploaded_at']

    def __str__(self):
        return self.title


class ReportData(models.Model):
    report = models.ForeignKey(Report, on_delete=models.CASCADE, related_name='data_rows')
    row_number = models.IntegerField()
    data = models.JSONField()

    class Meta:
        ordering = ['row_number']

    def __str__(self):
        return f"{self.report.title} - Row {self.row_number}"
