from flask import Blueprint
from controllers.doctor_controller import DoctorController

doctor_bp = Blueprint('doctor', __name__)
doctor_controller = DoctorController()

# Doctor CRUD routes
doctor_bp.route('/add', methods=['POST'])(doctor_controller.add_doctor)
doctor_bp.route('/all', methods=['GET'])(doctor_controller.get_all_doctors)
doctor_bp.route('/update/<int:doctor_id>', methods=['PUT'])(doctor_controller.update_doctor)
doctor_bp.route('/delete/<int:doctor_id>', methods=['DELETE'])(doctor_controller.delete_doctor)