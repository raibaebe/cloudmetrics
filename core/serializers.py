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


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)
    password_confirm = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password_confirm']

    def validate(self, data):
        if data['password'] != data['password_confirm']:
            raise serializers.ValidationError({'password_confirm': 'Пароли не совпадают'})
        return data

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError('Пользователь с таким именем уже существует')
        return value

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError('Пользователь с таким email уже существует')
        return value

    def create(self, validated_data):
        validated_data.pop('password_confirm')
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user
