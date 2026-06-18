#!/usr/bin/env bash
# Exit on error
set -o errexit

# Install dependencies
pip install -r requirements.txt

# Collect static files
python manage.py collectstatic --no-input

# Run migrations
python manage.py migrate

# Create the initial superuser only when credentials are provided by environment.
python manage.py shell << EOF
import os
from django.contrib.auth import get_user_model
User = get_user_model()

username = os.environ.get('DJANGO_SUPERUSER_USERNAME', 'admin')
email = os.environ.get('DJANGO_SUPERUSER_EMAIL', 'admin@cloudmtrx.com')
password = os.environ.get('DJANGO_SUPERUSER_PASSWORD')

if password and not User.objects.filter(username=username).exists():
    User.objects.create_superuser(username, email, password)
    print('Superuser created')
elif User.objects.filter(username=username).exists():
    print('Superuser already exists')
else:
    print('Skipping superuser creation: DJANGO_SUPERUSER_PASSWORD is not set')
EOF
