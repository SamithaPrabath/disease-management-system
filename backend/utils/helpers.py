import random
import string
from datetime import datetime

def generate_id(prefix, length=6):
    """Generate a unique ID with prefix and random characters"""
    chars = string.ascii_uppercase + string.digits
    random_str = ''.join(random.choice(chars) for _ in range(length))
    return f"{prefix}{random_str}"

def format_datetime(dt):
    """Format datetime object to string"""
    if dt:
        return dt.strftime('%Y-%m-%d %H:%M:%S')
    return None

def validate_date_format(date_str):
    """Validate date string format"""
    try:
        return datetime.strptime(date_str, '%Y-%m-%d')
    except ValueError:
        return None 