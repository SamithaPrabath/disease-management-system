from flask import Blueprint
from controllers.user_controller import UserController

user_bp = Blueprint('user', __name__, url_prefix='/users')

user_bp.route('/<int:user_id>/reset-password', methods=['PUT'])(UserController.update_password)