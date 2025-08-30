from flask import Blueprint, send_from_directory
from config import Config
import os

upload_bp = Blueprint('uploads', __name__)

@upload_bp.route('/uploads/<filename>')
def uploaded_file(filename):
    """
    Serve uploaded files securely
    
    Args:
        filename: The name of the file to serve
        
    Returns:
        The requested file if it exists, 404 if not found
    """
    try:
        return send_from_directory(Config.UPLOAD_FOLDER, filename)
    except Exception as e:
        return {"message": "File not found", "status": 404}, 404 