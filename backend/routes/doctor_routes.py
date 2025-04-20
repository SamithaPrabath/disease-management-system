from flask import Blueprint
from controllers.doctor_controller import DoctorController

doctor_bp = Blueprint('doctor', __name__)
doctor_controller = DoctorController()

# Doctor CRUD routes
doctor_bp.route('/add', methods=['POST'])(doctor_controller.add_doctor)
doctor_bp.route('/all', methods=['GET'])(doctor_controller.get_doctors)
doctor_bp.route('/<int:id>', methods=['GET'])(doctor_controller.get_doctor)
doctor_bp.route('/<int:id>', methods=['PUT'])(doctor_controller.update_doctor)
doctor_bp.route('/<int:id>', methods=['DELETE'])(doctor_controller.delete_doctor)

# Referral routes
doctor_bp.route('/referrals', methods=['GET'])(doctor_controller.get_phi_referrals)
doctor_bp.route('/referrals/<int:referral_id>/accept', methods=['POST'])(doctor_controller.accept_referral) 