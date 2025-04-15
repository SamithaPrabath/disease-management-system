from flask import Blueprint
from controllers.case_controller import CaseController

case_bp = Blueprint('case', __name__)

case_bp.route('/all', methods=['GET'])(CaseController.get_all_cases)

case_bp.route('/<int:case_id>', methods=['GET'])(CaseController.get_case_by_id)