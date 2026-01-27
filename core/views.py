from rest_framework import viewsets, status
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.pagination import PageNumberPagination
from django.contrib.auth.models import User
import pandas as pd

from .models import Report, ReportData
from .serializers import ReportSerializer, ReportUploadSerializer, ReportDataSerializer, UserSerializer, RegisterSerializer
from .permissions import IsAdminUser


class ReportDataPagination(PageNumberPagination):
    page_size = 50
    page_size_query_param = 'page_size'
    max_page_size = 200


class ReportViewSet(viewsets.ModelViewSet):
    queryset = Report.objects.all()
    serializer_class = ReportSerializer

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [IsAdminUser()]
        return [IsAuthenticated()]

    def get_serializer_class(self):
        if self.action == 'create':
            return ReportUploadSerializer
        return ReportSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        file = serializer.validated_data['file']
        title = serializer.validated_data['title']

        report = Report.objects.create(
            title=title,
            file=file,
            uploaded_by=request.user
        )

        try:
            df = pd.read_excel(file, engine='openpyxl')
            headers = df.columns.tolist()

            report_data_objects = []
            for idx, row in df.iterrows():
                row_data = {}
                for header in headers:
                    value = row[header]
                    if pd.isna(value):
                        row_data[str(header)] = None
                    elif isinstance(value, (int, float)):
                        row_data[str(header)] = value
                    else:
                        row_data[str(header)] = str(value)

                report_data_objects.append(
                    ReportData(
                        report=report,
                        row_number=idx + 1,
                        data=row_data
                    )
                )

            ReportData.objects.bulk_create(report_data_objects, batch_size=1000)

        except Exception as e:
            report.delete()
            return Response(
                {'error': f'Failed to process Excel file: {str(e)}'},
                status=status.HTTP_400_BAD_REQUEST
            )

        return Response(
            ReportSerializer(report).data,
            status=status.HTTP_201_CREATED
        )

    @action(detail=True, methods=['get'])
    def data(self, request, pk=None):
        report = self.get_object()
        paginator = ReportDataPagination()
        data_rows = report.data_rows.all()
        page = paginator.paginate_queryset(data_rows, request)

        if page is not None:
            serializer = ReportDataSerializer(page, many=True)
            response = paginator.get_paginated_response(serializer.data)
            headers = []
            if data_rows.exists():
                first_row = data_rows.first()
                if first_row and first_row.data:
                    headers = list(first_row.data.keys())
            response.data['headers'] = headers
            return response

        serializer = ReportDataSerializer(data_rows, many=True)
        return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def current_user(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response({
            'message': 'Регистрация успешна',
            'user': UserSerializer(user).data
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
