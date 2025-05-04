import asyncio
from flask import request, jsonify
from controllers.base_controller import BaseController
from models.reset_password_request import ResetPasswordRequest
from models.user import User

class ResetPasswordController(BaseController):
    @staticmethod
    def initiate_reset():
        """
        Initiate a password reset request
        """
        try:
            data = request.get_json()
            
            # Validate required fields
            required_fields = ['username', 'email', 'name']
            for field in required_fields:
                if field not in data:
                    return ResetPasswordController.error_response(f"Missing required field: {field}", 400)
            
            # Create reset request
            result = asyncio.run(ResetPasswordRequest.create_reset_request(
                username=data['username'],
                email=data['email'],
                name=data['name']
            ))
            
            if result.get('status') == 'error':
                return ResetPasswordController.error_response(result.get('message'), 203)
                
            return ResetPasswordController.success_response({
                'message': result.get('message'),
                'requestId': result.get('requestId')
            })
            
        except Exception as e:
            return ResetPasswordController.error_response(str(e), 500)
    
    @staticmethod
    def verify_details():
        """
        Verify user details for a password reset request
        """
        try:
            data = request.get_json()
            
            # Validate required fields
            required_fields = ['requestId', 'username', 'email', 'name']
            for field in required_fields:
                if field not in data:
                    return ResetPasswordController.error_response(f"Missing required field: {field}", 400)
            
            # Verify details
            result = asyncio.run(ResetPasswordRequest.verify_user_details(
                request_id=data['requestId'],
                username=data['username'],
                email=data['email'],
                name=data['name']
            ))
            
            if result.get('status') == 'error':
                return ResetPasswordController.error_response(result.get('message'), 400)
                
            return ResetPasswordController.success_response({
                'message': result.get('message'),
                'isVerified': result.get('is_verified')
            })
            
        except Exception as e:
            return ResetPasswordController.error_response(str(e), 500)
    
    @staticmethod
    def complete_reset():
        """
        Complete the password reset process by updating the user's password
        """
        try:
            data = request.get_json()
            
            # Validate required fields
            required_fields = ['requestId', 'newPassword']
            for field in required_fields:
                if field not in data:
                    return ResetPasswordController.error_response(f"Missing required field: {field}", 400)
            
            # Complete reset
            result = asyncio.run(ResetPasswordRequest.complete_reset(
                request_id=data['requestId'],
                new_password=data['newPassword']
            ))
            
            if result.get('status') == 'error':
                return ResetPasswordController.error_response(result.get('message'), 400)
                
            return ResetPasswordController.success_response({
                'message': result.get('message')
            })
            
        except Exception as e:
            return ResetPasswordController.error_response(str(e), 500)
    
    @staticmethod
    def get_reset_request(request_id):
        """
        Get a reset password request by ID
        """
        try:
            reset_request = asyncio.run(ResetPasswordRequest.get_by_id(request_id))
            
            if not reset_request:
                return ResetPasswordController.error_response("Reset request not found", 404)
                
            return ResetPasswordController.success_response({
                'id': reset_request.id,
                'username': reset_request.username,
                'email': reset_request.email,
                'name': reset_request.name,
                'isReset': bool(reset_request.is_reset),
                'requestDate': reset_request.request_date,
                'updatedDate': reset_request.updated_date,
                'isUserDetailsCorrect': bool(reset_request.is_user_details_correct)
            })
            
        except Exception as e:
            return ResetPasswordController.error_response(str(e), 500)
    
    @staticmethod
    def get_all_reset_requests():
        """
        Get all reset password requests with user ID and role information,
        with optional filtering by username
        """
        try:
            # Get the username filter from query parameters if provided
            username_filter = request.args.get('username', None)
            
            # Get reset password requests with optional filtering
            reset_requests = asyncio.run(ResetPasswordRequest.get_all_requests(username_filter))
            
            # Format the response
            formatted_requests = []
            for req in reset_requests:
                formatted_requests.append({
                    'id': req.id,
                    'username': req.username,
                    'email': req.email,
                    'name': req.name,
                    'isReset': bool(req.is_reset),
                    'requestDate': req.request_date,
                    'updatedDate': req.updated_date,
                    'isUserDetailsCorrect': bool(req.is_user_details_correct),
                    'userId': req.user_id,
                    'userRole': req.user_role,
                })
                
            return ResetPasswordController.success_response(formatted_requests)
            
        except Exception as e:
            return ResetPasswordController.error_response(str(e), 500) 