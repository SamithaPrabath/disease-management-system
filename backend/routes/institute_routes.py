from flask import Blueprint
from controllers.institute_controller import InstituteController

institute_bp = Blueprint('institute', __name__)

institute_bp.route('/all', methods=['GET'])(InstituteController.get_all_institutes)

institute_bp.route('/<int:institute_id>', methods=['GET'])(InstituteController.get_institute_by_id)
