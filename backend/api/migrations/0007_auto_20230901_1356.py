# Generated by Django 3.2 on 2023-09-01 13:56

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import simple_history.models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_auto_20230829_1430'),
    ]

    operations = [
        migrations.AddField(
            model_name='historicaltasks',
            name='planned_end_datetime',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='historicaltasks',
            name='planned_start_datetime',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='tasks',
            name='planned_end_datetime',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='tasks',
            name='planned_start_datetime',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.CreateModel(
            name='ScheduleRun',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('triggered_on', models.DateTimeField(blank=True, null=True)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('updated_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('deleted_at', models.DateTimeField(blank=True, null=True)),
                ('is_active', models.BooleanField(default=True)),
                ('is_deleted', models.BooleanField(default=False)),
                ('triggered_by', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='triggered_by', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'schedule_run',
            },
        ),
        migrations.CreateModel(
            name='HistoricalScheduleRun',
            fields=[
                ('id', models.IntegerField(blank=True, db_index=True)),
                ('triggered_on', models.DateTimeField(blank=True, null=True)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('updated_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('deleted_at', models.DateTimeField(blank=True, null=True)),
                ('is_active', models.BooleanField(default=True)),
                ('is_deleted', models.BooleanField(default=False)),
                ('history_id', models.AutoField(primary_key=True, serialize=False)),
                ('history_date', models.DateTimeField(db_index=True)),
                ('history_change_reason', models.CharField(max_length=100, null=True)),
                ('history_type', models.CharField(choices=[('+', 'Created'), ('~', 'Changed'), ('-', 'Deleted')], max_length=1)),
                ('history_user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to=settings.AUTH_USER_MODEL)),
                ('triggered_by', models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'historical schedule run',
                'verbose_name_plural': 'historical schedule runs',
                'db_table': 'schedule_run_history',
                'ordering': ('-history_date', '-history_id'),
                'get_latest_by': ('history_date', 'history_id'),
            },
            bases=(simple_history.models.HistoricalChanges, models.Model),
        ),
        migrations.AddIndex(
            model_name='schedulerun',
            index=models.Index(fields=['id'], name='schedule_ru_id_3f089e_idx'),
        ),
    ]