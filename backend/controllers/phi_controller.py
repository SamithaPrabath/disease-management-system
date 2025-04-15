from flask import request
from flask_jwt_extended import jwt_required
from .base_controller import BaseController
from models.phi import PHI
from models.case import Case
from datetime import datetime

class PHIController(BaseController):
    @jwt_required()
    def get_phis():
        try:
            phis = PHI.query.all()
            return PHIController.success_response(
                [phi.to_dict() for phi in phis]
            )
        except Exception as e:
            return PHIController.error_response(str(e), 500)

    @jwt_required()
    def assign_case():
        try:
            data = request.get_json()
            case_id = data.get('caseId')
            phi_id = data.get('phiId')
            
            case = Case.query.get(case_id)
            if not case:
                return PHIController.error_response("Case not found", 404)
            
            case.assigned_phi = phi_id
            case.phi_assigned_date = datetime.utcnow()
            
            db.session.commit()
            return PHIController.success_response(
                case.to_dict(),
                "PHI assigned successfully"
            )
        except Exception as e:
            db.session.rollback()
            return PHIController.error_response(str(e), 500) 