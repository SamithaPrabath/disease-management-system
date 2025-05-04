from flask import Blueprint
from controllers.case_controller import CaseController

case_bp = Blueprint('case', __name__)

case_bp.route('/add', methods=['POST'])(CaseController.create_case)
case_bp.route('/all', methods=['GET'])(CaseController.get_cases)
case_bp.route('/<case_id>', methods=['GET'])(CaseController.get_case)
case_bp.route('/confirm/<case_id>', methods=['PUT'])(CaseController.confirm_case)
case_bp.route('/admin/all', methods=['GET'])(CaseController.get_all_cases_by_admin)
case_bp.route('/<case_id>/mark-received', methods=['PUT'])(CaseController.update_mark_as_received)
case_bp.route('/<case_id>/assign-moh', methods=['PUT'])(CaseController.update_assigned_moh)
case_bp.route('/<case_id>/assign-phi', methods=['PUT'])(CaseController.update_assigned_phi)
case_bp.route('/add-report/<case_id>', methods=['PUT'])(CaseController.add_report)
case_bp.route('/locations/markers', methods=['GET'])(CaseController.get_locations_for_markers)