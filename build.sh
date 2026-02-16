#!/usr/bin/env bash
# Exit on error
set -o errexit

# Install dependencies
pip install -r requirements.txt

# Collect static files
python manage.py collectstatic --no-input

# Run migrations
python manage.py migrate

# Create superuser or reset password
python manage.py shell << EOF
from django.contrib.auth import get_user_model
User = get_user_model()
if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', 'admin@cloudmtrx.com', 'Cloudmtrx2026!')
    print('Superuser created')
else:
    u = User.objects.get(username='admin')
    u.set_password('Cloudmtrx2026!')
    u.save()
    print('Superuser password reset')
EOF
