import asyncio
from flask import request
from flask_jwt_extended import create_access_token, create_refresh_token
from werkzeug.security import check_password_hash
from .base_controller import BaseController
from models.user import User

class AuthController(BaseController):
    @staticmethod
    def login():
        try:
            data = request.get_json()
            username = data.get('username')
            password = data.get('password')

            if not username or not password:
                return AuthController.error_response("Username and password are required")

            user = asyncio.run(User.get_user_by_username(username=username))
            if not user or not check_password_hash(user.password_hash, password):
                return AuthController.error_response("Invalid credentials", 401)

            access_token = create_access_token(identity=user.id)
            refresh_token = create_refresh_token(identity=user.id)

            return AuthController.success_response({
                'user': user,
                'access_token': access_token,
                'refresh_token': refresh_token
            })

        except Exception as e:
            return AuthController.error_response(str(e), 500) 