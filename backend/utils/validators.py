import re

def validate_email(email):
    """Validate email format"""
    pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
    return bool(re.match(pattern, email))

def validate_phone(phone):
    """Validate phone number format"""
    pattern = r'^\+?1?\d{9,15}$'
    return bool(re.match(pattern, phone))

def validate_nic(nic):
    """Validate NIC number format"""
    old_pattern = r'^\d{9}[vVxX]$'
    new_pattern = r'^\d{12}$'
    return bool(re.match(old_pattern, nic) or re.match(new_pattern, nic)) 