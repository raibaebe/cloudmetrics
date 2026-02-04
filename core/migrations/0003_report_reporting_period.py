from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_report_headers'),
    ]

    operations = [
        migrations.AddField(
            model_name='report',
            name='reporting_period',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
