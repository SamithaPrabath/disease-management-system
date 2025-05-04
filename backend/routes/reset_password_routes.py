from flask import Blueprint
from controllers.reset_password_controller import ResetPasswordController

reset_password_bp = Blueprint('reset_password', __name__)

# Route to initiate a password reset request
reset_password_bp.route('/initiate', methods=['POST'])(ResetPasswordController.initiate_reset)

# Route to verify user details
reset_password_bp.route('/verify', methods=['POST'])(ResetPasswordController.verify_details)

# Route to complete the password reset
reset_password_bp.route('/complete', methods=['POST'])(ResetPasswordController.complete_reset)

# Route to get all password reset requests
reset_password_bp.route('/all', methods=['GET'])(ResetPasswordController.get_all_reset_requests)

# Route to get a password reset request by ID
reset_password_bp.route('/<request_id>', methods=['GET'])(ResetPasswordController.get_reset_request) 