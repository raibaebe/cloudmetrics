from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Report, ReportData


class UserSerializer(serializers.ModelSerializer):
    is_admin = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'is_admin']

    def get_is_admin(self, obj):
        return obj.is_staff or obj.is_superuser


class ReportDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReportData
        fields = ['id', 'row_number', 'data']


class ReportSerializer(serializers.ModelSerializer):
    uploaded_by = UserSerializer(read_only=True)
    row_count = serializers.SerializerMethodField()

    class Meta:
        model = Report
        fields = ['id', 'title', 'uploaded_by', 'uploaded_at', 'file', 'row_count']
        read_only_fields = ['uploaded_by', 'uploaded_at']

    def get_row_count(self, obj):
        return obj.data_rows.count()


class ReportUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = ['id', 'title', 'file']

    def validate_file(self, value):
        if not value.name.endswith(('.xlsx', '.xls')):
            raise serializers.ValidationError("Only Excel files (.xlsx, .xls) are allowed.")
        return value
