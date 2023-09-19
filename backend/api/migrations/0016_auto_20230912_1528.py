# Generated by Django 3.2 on 2023-09-12 15:28

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import simple_history.models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0015_auto_20230912_0242'),
    ]

    operations = [
        migrations.CreateModel(
            name='HistoricalScheduleRunStatus',
            fields=[
                ('id', models.IntegerField(blank=True, db_index=True)),
                ('name', models.CharField(blank=True, max_length=250, null=True)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('updated_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('deleted_at', models.DateTimeField(blank=True, null=True)),
                ('is_active', models.BooleanField(default=True)),
                ('is_deleted', models.BooleanField(default=False)),
                ('history_id', models.AutoField(primary_key=True, serialize=False)),
                ('history_date', models.DateTimeField(db_index=True)),
                ('history_change_reason', models.CharField(max_length=100, null=True)),
                ('history_type', models.CharField(choices=[('+', 'Created'), ('~', 'Changed'), ('-', 'Deleted')], max_length=1)),
            ],
            options={
                'verbose_name': 'historical schedule run status',
                'verbose_name_plural': 'historical schedule run statuss',
                'db_table': 'schedule_run_status_history',
                'ordering': ('-history_date', '-history_id'),
                'get_latest_by': ('history_date', 'history_id'),
            },
            bases=(simple_history.models.HistoricalChanges, models.Model),
        ),
        migrations.CreateModel(
            name='HistoricalTaskStatus',
            fields=[
                ('id', models.IntegerField(blank=True, db_index=True)),
                ('name', models.CharField(max_length=150)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('updated_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('deleted_at', models.DateTimeField(blank=True, null=True)),
                ('is_active', models.BooleanField(default=True)),
                ('is_deleted', models.BooleanField(default=False)),
                ('history_id', models.AutoField(primary_key=True, serialize=False)),
                ('history_date', models.DateTimeField(db_index=True)),
                ('history_change_reason', models.CharField(max_length=100, null=True)),
                ('history_type', models.CharField(choices=[('+', 'Created'), ('~', 'Changed'), ('-', 'Deleted')], max_length=1)),
            ],
            options={
                'verbose_name': 'historical task status',
                'verbose_name_plural': 'historical task statuss',
                'db_table': 'task_status_history',
                'ordering': ('-history_date', '-history_id'),
                'get_latest_by': ('history_date', 'history_id'),
            },
            bases=(simple_history.models.HistoricalChanges, models.Model),
        ),
        migrations.CreateModel(
            name='HistoricalTaskType',
            fields=[
                ('id', models.IntegerField(blank=True, db_index=True)),
                ('name', models.CharField(max_length=150)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('updated_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('deleted_at', models.DateTimeField(blank=True, null=True)),
                ('is_active', models.BooleanField(default=True)),
                ('is_deleted', models.BooleanField(default=False)),
                ('history_id', models.AutoField(primary_key=True, serialize=False)),
                ('history_date', models.DateTimeField(db_index=True)),
                ('history_change_reason', models.CharField(max_length=100, null=True)),
                ('history_type', models.CharField(choices=[('+', 'Created'), ('~', 'Changed'), ('-', 'Deleted')], max_length=1)),
            ],
            options={
                'verbose_name': 'historical task type',
                'verbose_name_plural': 'historical task types',
                'db_table': 'task_type_history',
                'ordering': ('-history_date', '-history_id'),
                'get_latest_by': ('history_date', 'history_id'),
            },
            bases=(simple_history.models.HistoricalChanges, models.Model),
        ),
        migrations.CreateModel(
            name='ScheduleRunStatus',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(blank=True, max_length=250, null=True)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('updated_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('deleted_at', models.DateTimeField(blank=True, null=True)),
                ('is_active', models.BooleanField(default=True)),
                ('is_deleted', models.BooleanField(default=False)),
            ],
            options={
                'db_table': 'schedule_run_status',
            },
        ),
        migrations.CreateModel(
            name='TaskStatus',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=150)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('updated_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('deleted_at', models.DateTimeField(blank=True, null=True)),
                ('is_active', models.BooleanField(default=True)),
                ('is_deleted', models.BooleanField(default=False)),
            ],
            options={
                'db_table': 'task_status',
            },
        ),
        migrations.CreateModel(
            name='TaskType',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=150)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('updated_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('deleted_at', models.DateTimeField(blank=True, null=True)),
                ('is_active', models.BooleanField(default=True)),
                ('is_deleted', models.BooleanField(default=False)),
            ],
            options={
                'db_table': 'task_type',
            },
        ),
        migrations.RenameField(
            model_name='dependency',
            old_name='closed_date',
            new_name='actual_close_datetime',
        ),
        migrations.RenameField(
            model_name='dependency',
            old_name='expected_closed',
            new_name='expected_close_datetime',
        ),
        migrations.RenameField(
            model_name='historicaldependency',
            old_name='closed_date',
            new_name='actual_close_datetime',
        ),
        migrations.RenameField(
            model_name='historicaldependency',
            old_name='expected_closed',
            new_name='expected_close_datetime',
        ),
        migrations.RenameField(
            model_name='historicaljobs',
            old_name='planned_end',
            new_name='planned_end_datetime',
        ),
        migrations.RenameField(
            model_name='historicaljobs',
            old_name='planned_start',
            new_name='planned_start_datetime',
        ),
        migrations.RenameField(
            model_name='historicaloperationalexception',
            old_name='exception_type',
            new_name='operational_exception_type',
        ),
        migrations.RenameField(
            model_name='jobs',
            old_name='planned_end',
            new_name='planned_end_datetime',
        ),
        migrations.RenameField(
            model_name='jobs',
            old_name='planned_start',
            new_name='planned_start_datetime',
        ),
        migrations.RenameField(
            model_name='operationalexception',
            old_name='exception_type',
            new_name='operational_exception_type',
        ),
        migrations.RemoveField(
            model_name='dependency',
            name='jobs',
        ),
        migrations.RemoveField(
            model_name='dependency',
            name='tasks',
        ),
        migrations.RemoveField(
            model_name='historicaldependency',
            name='jobs',
        ),
        migrations.RemoveField(
            model_name='historicaldependency',
            name='tasks',
        ),
        migrations.AddField(
            model_name='dependency',
            name='external_id',
            field=models.CharField(blank=True, max_length=180, null=True),
        ),
        migrations.AddField(
            model_name='historicaldependency',
            name='external_id',
            field=models.CharField(blank=True, max_length=180, null=True),
        ),
        migrations.AddField(
            model_name='historicalresources',
            name='weekly_shift_template',
            field=models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to='api.weeklyshifttemplate'),
        ),
        migrations.AddField(
            model_name='resources',
            name='weekly_shift_template',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='api.weeklyshifttemplate'),
        ),
        migrations.AlterField(
            model_name='assignmentrulecriteria',
            name='operator',
            field=models.IntegerField(blank=True, default=1, help_text='1. Equals, 2. Add, 3. Subtract, 4. Divide, 5. Multiple', null=True),
        ),
        migrations.AlterField(
            model_name='historicalassignmentrulecriteria',
            name='operator',
            field=models.IntegerField(blank=True, default=1, help_text='1. Equals, 2. Add, 3. Subtract, 4. Divide, 5. Multiple', null=True),
        ),
        migrations.AddIndex(
            model_name='tasktype',
            index=models.Index(fields=['id', 'name'], name='task_type_id_1cd5c5_idx'),
        ),
        migrations.AddIndex(
            model_name='taskstatus',
            index=models.Index(fields=['id', 'name'], name='task_status_id_acafbb_idx'),
        ),
        migrations.AddIndex(
            model_name='schedulerunstatus',
            index=models.Index(fields=['id'], name='schedule_ru_id_362ac3_idx'),
        ),
        migrations.AddField(
            model_name='historicaltasktype',
            name='history_user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='historicaltaskstatus',
            name='history_user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='historicalschedulerunstatus',
            name='history_user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='historicalschedulerun',
            name='schedule_status',
            field=models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to='api.schedulerunstatus'),
        ),
        migrations.AddField(
            model_name='historicaltasks',
            name='task_type',
            field=models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to='api.tasktype'),
        ),
        migrations.AddField(
            model_name='schedulerun',
            name='schedule_status',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='schedule_status', to='api.schedulerunstatus'),
        ),
        migrations.AddField(
            model_name='tasks',
            name='task_type',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='tasks_type', to='api.tasktype'),
        ),
        migrations.AlterField(
            model_name='historicaltasks',
            name='task_status',
            field=models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to='api.taskstatus'),
        ),
        migrations.AlterField(
            model_name='tasks',
            name='task_status',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='tasks_status', to='api.taskstatus'),
        ),
    ]