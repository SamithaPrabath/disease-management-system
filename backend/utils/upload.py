import os
import uuid
from werkzeug.utils import secure_filename
from flask import current_app

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

async def upload_file(file):
    """
    Upload a file to the server and return the file URL
    
    Args:
        file: The file object from request.files
        
    Returns:
        str: The URL of the uploaded file
    """
    if not file:
        return None
        
    if not allowed_file(file.filename):
        raise ValueError('File type not allowed')
        
    # Generate a unique filename
    filename = secure_filename(file.filename)
    unique_filename = f"{uuid.uuid4().hex}_{filename}"
    
    # Ensure upload directory exists
    upload_folder = current_app.config['UPLOAD_FOLDER']
    os.makedirs(upload_folder, exist_ok=True)
    
    # Save the file
    file_path = os.path.join(upload_folder, unique_filename)
    file.save(file_path)
    
    # Return the relative URL path
    return f"/uploads/{unique_filename}" 