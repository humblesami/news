"""
Django settings for main project.

Generated by 'django-admin startproject' using Django 2.1.4.

For more information on this file, see
https://docs.djangoproject.com/en/2.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.1/ref/settings/
"""
import json
import os

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
MEDIA_URL = "/media/"

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'd9phtmv5b^cqr$daog097))s@$776gvk$-ca&shxt&re*r31bn'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['localhost']

EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
import sys
python_path = sys.base_exec_prefix
EMAIL_HOST_USER = 'sami.akram@digitalnet.com'
EMAIL_HOST_PASSWORD = 'asddsazx'
EMAIL_USE_TLS = True

# Application definition

INSTALLED_APPS = [
    
    'admin_app',
    'corsheaders',
    'bootstrapform',    
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'rest_framework.authtoken',

    'mail_thread',
    'token_app',
    'auth_code',
    'static',
    'auth_app',
    'documents',
    'chat',
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.TokenAuthentication',
        # 'rest_framework_jwt.authentication.JSONWebTokenAuthentication'
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated', )
}

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django_currentuser.middleware.ThreadLocalUserMiddleware',
    'django.middleware.common.BrokenLinkEmailsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    # 'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

PROJECT_ROOT = os.path.normpath(os.path.dirname(__file__))
# CORS_ORIGIN_ALLOW_ALL = True
CORS_ORIGIN_WHITELIST = (
    'localhost:4200',
    'localhost:4201',
    '127.0.0.1:4200',
    '172.16.21.170:4200',
    '172.16.21.171:4200',
    '172.16.21.36:4200',
)

ROOT_URLCONF = 'main_app.urls'
DEFAULT_DOMAIN = 'http://8000/'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            os.path.join(PROJECT_ROOT, '..', 'main_app/templates'),
            os.path.join(PROJECT_ROOT, '..', 'client/templates'),
            os.path.join(PROJECT_ROOT, '..', 'mailt/templates'),
            os.path.join(PROJECT_ROOT, '..', 'auth_app/templates'),
            os.path.join(PROJECT_ROOT, '..', 'reset/templates'),
            os.path.join(PROJECT_ROOT, '..', 'documents/templates'),
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'main_app.wsgi.application'

# Database
# https://docs.djangoproject.com/en/2.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

# DATABASES = {
# 	'default': {
# 		'ENGINE': 'django.db.backends.postgresql_psycopg2',
# 		'NAME': 'demo1',
# 		'USER': 'odoo',
# 		'PASSWORD': '123',
# 	}
# }

# Password validation
# https://docs.djangoproject.com/en/2.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

ip2location = {}
server_base_url = ''
SOCKET_SERVER_URL = ''
base_dir = os.path.dirname(os.path.abspath(__file__))
base_dir = base_dir.replace('main_app', '')
with open(base_dir+'config.json') as f:
    configs = json.loads(f.read())
    SOCKET_SERVER_URL = configs['socket_url']
    server_base_url = configs['server_base_url']
    AUTH_SERVER_URL = configs['auth_server_url']
    ip2location = configs["ip2location"]["active"]
# if 'localhost' in SOCKET_SERVER_URL:
AUTH_PASSWORD_VALIDATORS = []


# AUTH_USER_MODEL = 'user.User'


# Internationalization
# https://docs.djangoproject.com/en/2.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'Asia/Karachi'

USE_I18N = True

USE_L10N = True

USE_TZ = True



# STATIC_ROOT = '~/django/auth_app/static'

STATICFILES_DIRS = (
    os.path.join(PROJECT_ROOT, '..', 'static'),
)
STATIC_URL = '/static/'

# X_FRAME_OPTIONS = 'ALLOW'
# X_FRAME_OPTIONS = 'allow-from http://localhost:4200/'
#X_FRAME_OPTIONS = 'allow-from https://example.com/
