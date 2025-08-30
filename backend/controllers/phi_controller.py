import asyncio
from flask import request
from flask_jwt_extended import jwt_required
from .base_controller import BaseController
from models.phi import PHI
from utils.email_service import EmailService


class PHIController(BaseController):
    @staticmethod
    def add_phi_user():
        try:
            data = request.get_json()
            phi_user = PHI(**data)
            result = asyncio.run(PHI.add_phi_user(phi_user))
            
            # Send welcome email if the PHI was added successfully
            if result.get("status") == 200:
                email_result = EmailService.send_welcome_email(
                    recipient_email=phi_user.email,
                    name=phi_user.name,
                    username=phi_user.username,
                    role=phi_user.role,
                    password=data.get("password")
                )
                # Add email sending result to the response
                result['email_status'] = email_result
                
            return PHIController.success_response(result)
        except Exception as e:
            return PHIController.error_response(str(e))
        
    @staticmethod
    def get_phi_users():
        try:
            phi_users = asyncio.run(PHI.get_phi_users())
            return PHIController.success_response(phi_users)
        except Exception as e:
            return PHIController.error_response(str(e))

    @staticmethod
    def delete_phi_user(id):
        try:
            result = asyncio.run(PHI.delete_phi_user(id))
            return PHIController.success_response(result)
        except Exception as e:
            return PHIController.error_response(str(e))

    @staticmethod
    def update_phi_user(id):
        try:
            data = request.get_json()
            result = asyncio.run(PHI.update_phi_user(id, data))
            return PHIController.success_response(result)
        except Exception as e:
            return PHIController.error_response(str(e))

    @staticmethod
    def get_phi_user(id):
        try:
            phi_user = asyncio.run(PHI.get_phi_user_by_moh_id(id))
            if not phi_user:
                return PHIController.error_response("PHI user not found", 404)
            return PHIController.success_response(phi_user)
        except Exception as e:
            return PHIController.error_response(str(e))
    