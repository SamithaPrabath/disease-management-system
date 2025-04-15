from flask import Blueprint
from controllers.case_controller import CaseController

case_bp = Blueprint('case', __name__)

case_bp.route('/add', methods=['POST'])(CaseController.create_case)
case_bp.route('/all', methods=['GET'])(CaseController.get_cases)
case_bp.route('/<case_id>', methods=['GET'])(CaseController.get_case)
case_bp.route('/confirm/<case_id>', methods=['PUT'])(CaseController.confirm_case)
# case_bp.route('/<case_id>', methods=['PUT'])(CaseController.update_case) 