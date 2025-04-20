from flask import Blueprint
from controllers.institute_controller import InstituteController

institute_bp = Blueprint('institute', __name__)

institute_bp.route('/all', methods=['GET'])(InstituteController.get_all_institutes)

institute_bp.route('/<int:institute_id>', methods=['GET'])(InstituteController.get_institute_by_id)

institute_bp.route('/create', methods=['POST'])(InstituteController.create_institute)

institute_bp.route('/update/<int:institute_id>', methods=['PUT'])(InstituteController.update_institute)

institute_bp.route('/delete/<int:institute_id>', methods=['DELETE'])(InstituteController.delete_institute)
