import asyncio
from flask import request
from flask_jwt_extended import jwt_required
from .base_controller import BaseController
from models.epidemology import Epidemology
from utils.email_service import EmailService


class EpidemologyController(BaseController):
    @staticmethod
    def add_epidemology_user():
        try:
            data = request.get_json()
            epidemology_user = Epidemology(
                email=data.get("email"),
                district=data.get("district"),
                address=data.get("address"),
                name=data.get("name"),
                phoneNumber=data.get("phone"),
                username=data.get("username"),
                password=data.get("password")
            )
            result = asyncio.run(Epidemology.add_epidemology_user(epidemology_user))
            
            # Send welcome email if the epidemology user was added successfully
            if result.get("status") == 200:
                email_result = EmailService.send_welcome_email(
                    recipient_email=epidemology_user.email,
                    name=epidemology_user.name,
                    username=epidemology_user.username,
                    role=epidemology_user.role,
                    password=data.get("password")
                )
                # Add email sending result to the response
                result['email_status'] = email_result
                
            return EpidemologyController.success_response(result)
        except Exception as e:
            return EpidemologyController.error_response(str(e))
        
    @staticmethod
    def get_epidemology_users():
        try:
            epidemology_users = asyncio.run(Epidemology.get_epidemology_users())
            return EpidemologyController.success_response(epidemology_users)
        except Exception as e:
            return EpidemologyController.error_response(str(e))

    @staticmethod
    def delete_epidemology_user(id):
        try:
            result = asyncio.run(Epidemology.delete_epidemology_user(id))
            return EpidemologyController.success_response(result)
        except Exception as e:
            return EpidemologyController.error_response(str(e))

    @staticmethod
    def update_epidemology_user(id):
        try:
            data = request.get_json()
            result = asyncio.run(Epidemology.update_epidemology_user(id, data))
            return EpidemologyController.success_response(result)
        except Exception as e:
            return EpidemologyController.error_response(str(e))

    @staticmethod
    def get_epidemology_user(id):
        try:
            epidemology_user = asyncio.run(Epidemology.get_epidemology_user_by_id(id))
            if not epidemology_user:
                return EpidemologyController.error_response("Epidemology user not found", 404)
            return EpidemologyController.success_response(epidemology_user)
        except Exception as e:
            return EpidemologyController.error_response(str(e)) 