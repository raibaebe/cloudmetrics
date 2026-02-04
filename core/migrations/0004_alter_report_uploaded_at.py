from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_report_reporting_period'),
    ]

    operations = [
        migrations.AlterField(
            model_name='report',
            name='uploaded_at',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]
