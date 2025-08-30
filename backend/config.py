import os
from datetime import timedelta
from dotenv import load_dotenv

load_dotenv()

class Config:
    # Flask configurations
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'your-secret-key-here'
    HOST = os.environ.get('HOST') or '0.0.0.0'
    PORT = int(os.environ.get('PORT') or 5000)
    DEBUG = os.environ.get('DEBUG') or True
    
    # Upload folder configuration
    UPLOAD_FOLDER = os.environ.get('UPLOAD_FOLDER') or 'uploads'
    
    # JWT configurations
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY') or 'your-jwt-secret-key'
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)
    
    # Database configurations
    DB_HOST = os.environ.get('DB_HOST', 'localhost')
    DB_USER = os.environ.get('DB_USER', 'root')
    DB_PASSWORD = os.environ.get('DB_PASSWORD', '')
    DB_NAME = os.environ.get('DB_NAME', 'health_sentinel_db')
    DB_PORT = int(os.environ.get('DB_PORT', '3306'))
    
    # Email configurations
    SMTP_SERVER = os.environ.get('SMTP_SERVER', 'smtp.gmail.com')
    SMTP_PORT = int(os.environ.get('SMTP_PORT', 587))
    EMAIL_USER = os.environ.get('EMAIL_USER', '')
    EMAIL_PASSWORD = os.environ.get('EMAIL_PASSWORD', '')
    EMAIL_SEND_ENABLED = os.environ.get('EMAIL_SEND_ENABLED', 'True').lower() == 'true'

