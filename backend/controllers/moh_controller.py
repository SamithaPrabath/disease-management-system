import asyncio
from flask import request
from flask_jwt_extended import jwt_required
from .base_controller import BaseController
from models.moh import MOH
from models.case import Case
from datetime import datetime
from utils.email_service import EmailService

class MOHController(BaseController):
    @staticmethod
    def add_moh_user():
        try:
            data = request.get_json()
            moh_user = MOH(
                area=data.get("area"),
                email=data.get("email"),
                name=data.get("name"),
                username=data.get("username"),
                password=data.get("password"),
                role=data.get("role"),
                phone=data.get("phoneNumber")
            )
            result = asyncio.run(MOH.add_moh_user(moh_user))
            
            # Send welcome email if the MOH user was added successfully
            if result.get("status") == 200:
                email_result = EmailService.send_welcome_email(
                    recipient_email=moh_user.email,
                    name=moh_user.name,
                    username=moh_user.username,
                    role=moh_user.role,
                    password=data.get("password")
                )
                # Add email sending result to the response
                result['email_status'] = email_result
                
            return MOHController.success_response(result)
        except Exception as e:
            return MOHController.error_response(str(e))
        
    @staticmethod
    def get_moh_users():
        try:
            moh_users = asyncio.run(MOH.get_moh_users())
            return MOHController.success_response(moh_users)
        except Exception as e:
            return MOHController.error_response(str(e))

    @staticmethod
    def delete_moh_user(id):
        try:
            result = asyncio.run(MOH.delete_moh_user(id))
            return MOHController.success_response(result)
        except Exception as e:
            return MOHController.error_response(str(e))

    @staticmethod
    def update_moh_user(id):
        try:
            data = request.get_json()
            result = asyncio.run(MOH.update_moh_user(id, data))
            return MOHController.success_response(result)
        except Exception as e:
            return MOHController.error_response(str(e))
        
