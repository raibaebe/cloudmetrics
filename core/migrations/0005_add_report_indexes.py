from django.db import migrations, models


def populate_report_row_counts(apps, schema_editor):
    Report = apps.get_model('core', 'Report')
    ReportData = apps.get_model('core', 'ReportData')

    for report in Report.objects.only('id').iterator(chunk_size=500):
        row_count = ReportData.objects.filter(report_id=report.id).count()
        Report.objects.filter(id=report.id).update(row_count=row_count)


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0004_alter_report_uploaded_at'),
    ]

    operations = [
        migrations.AddField(
            model_name='report',
            name='row_count',
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AddIndex(
            model_name='report',
            index=models.Index(fields=['-uploaded_at'], name='report_uploaded_at_idx'),
        ),
        migrations.AddIndex(
            model_name='reportdata',
            index=models.Index(fields=['report', 'row_number'], name='reportdata_report_row_idx'),
        ),
        migrations.RunPython(populate_report_row_counts, migrations.RunPython.noop),
    ]
