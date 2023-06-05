# Generated by Django 4.2.1 on 2023-06-02 17:23

from django.db import migrations, models
import django_minio_backend.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AvatarUpload',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(max_length=5)),
                ('size', models.BigIntegerField()),
                ('file', models.FileField(storage=django_minio_backend.models.MinioBackend(bucket_name='test'), upload_to=django_minio_backend.models.iso_date_prefix)),
            ],
        ),
    ]