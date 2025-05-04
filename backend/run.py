from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from config import Config
from routes import auth_bp, case_bp, phi_bp, moh_bp, disease_bp, institute_bp, doctor_bp, event_bp, upload_bp, notification_bp, user_bp, reset_password_bp
import os

def create_app():
    app = Flask(__name__)
    
    # Load configuration
    app.config.from_object(Config)
    
    # Initialize CORS
    CORS(app)
    
    # Initialize JWT
    JWTManager(app)
    
    # Create upload folder if it doesn't exist
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    
    # Register blueprints
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(case_bp, url_prefix='/api/cases')
    app.register_blueprint(phi_bp, url_prefix='/api/phis')
    app.register_blueprint(moh_bp, url_prefix='/api/mohs')
    app.register_blueprint(disease_bp, url_prefix='/api/diseases')
    app.register_blueprint(institute_bp, url_prefix='/api/institutes')
    app.register_blueprint(doctor_bp, url_prefix='/api/doctors')
    app.register_blueprint(event_bp, url_prefix='/api/events')
    app.register_blueprint(upload_bp, url_prefix='/api')
    app.register_blueprint(notification_bp, url_prefix='/api/notifications')
    app.register_blueprint(user_bp, url_prefix='/api/users')
    app.register_blueprint(reset_password_bp, url_prefix='/api/reset-password')
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)