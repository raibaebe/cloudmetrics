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
    is_admin = serializers.BooleanField(write_only=True, required=False, default=False)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password_confirm', 'is_admin']

    def validate(self, data):
        if data['password'] != data['password_confirm']:
            raise serializers.ValidationError({'password_confirm': 'Passwords do not match'})
        return data

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError('A user with this username already exists')
        return value

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError('A user with this email already exists')
        return value

    def create(self, validated_data):
        validated_data.pop('password_confirm')
        is_admin = validated_data.pop('is_admin', False)

        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )

        if is_admin:
            user.is_staff = True
            user.is_superuser = True
            user.save()

        return user
