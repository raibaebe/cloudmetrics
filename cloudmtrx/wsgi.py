"""
WSGI config for cloudmtrx project.
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'cloudmtrx.settings')

application = get_wsgi_application()
