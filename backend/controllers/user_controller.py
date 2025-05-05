import asyncio
from flask import request
from werkzeug.security import generate_password_hash
from models.user import User

class UserController:
    @staticmethod
    def update_password(user_id: int):
        data = request.get_json()
        new_password = data.get('newPassword')
        user = asyncio.run(User.get_user_by_id(user_id))
        if not user:
            return {"error": "User not found"}, 404
    
        new_password_hash = generate_password_hash(new_password)
        asyncio.run(User.update_password(user.username, new_password_hash))
        return {"message": "Password updated successfully"}, 200
    