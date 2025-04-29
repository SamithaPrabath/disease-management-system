from datetime import datetime
from flask import request
from .base_controller import BaseController
from models.case import Case
import asyncio

class CaseController(BaseController):
    @staticmethod
    def get_cases():
        try:
            user_id = request.args.get('userID')
            cases = asyncio.run(Case.get_all_cases(user_id))
            return CaseController.success_response(
                [case for case in cases]
            )
        except Exception as e:
            return CaseController.error_response(str(e), 500)

    @staticmethod
    def get_case(case_id):
        try:
            case = asyncio.run(Case.get_case_by_id(case_id))
            if not case:
                return CaseController.error_response("Case not found", 404)
            
            return CaseController.success_response(case)
        except Exception as e:
            return CaseController.error_response(str(e), 500)

    @staticmethod
    def create_case():
        try:
            data = dict(request.form)
            new_case = Case(**data)
            asyncio.run(new_case.save())
            return CaseController.success_response(new_case)
        except Exception as e:
            return CaseController.error_response(str(e), 500)
        
    @staticmethod
    def confirm_case(case_id):
        try:
            data = request.get_json()
            case = asyncio.run(Case.get_case_by_id(case_id))
            case.confirmedBy = data.get('confirmedBy')
            case.confirmedDate = data.get('confirmedDate')
            case.caseStatus = "Confirmed"
            case.remarks = data.get('remarks')
            case.natureOfConfirmation = data.get('natureOfConfirmation')

            if not case:
                return CaseController.error_response("Case not found", 404)
            
            
            asyncio.run(case.update_conformation_details())
            return CaseController.success_response(case)
        except Exception as e:
            return CaseController.error_response(str(e), 500)
    
    @staticmethod
    def get_all_cases_by_admin():
        try:
            cases = asyncio.run(Case.get_all_cases_by_admin())
            return CaseController.success_response(cases)
        except Exception as e:
            return CaseController.error_response(str(e), 500)

    @staticmethod
    def update_mark_as_received(case_id):
        try:
            data = request.get_json()
            mark_as_received = data.get('markAsReceived')
            
            if mark_as_received is None:
                return CaseController.error_response("markAsReceived field is required", 400)
                
            result = asyncio.run(Case.update_mark_as_received(case_id, mark_as_received))
            return CaseController.success_response(result)
        except Exception as e:
            return CaseController.error_response(str(e), 500)

    @staticmethod
    def update_assigned_moh(case_id):
        try:
            data = request.get_json()
            assigned_moh = data.get('assignedMoh')
            moh_assigned_date = data.get('mohAssignedDate')
            
            if not assigned_moh or not moh_assigned_date:
                return CaseController.error_response("assignedMoh and mohAssignedDate fields are required", 400)
                
            result = asyncio.run(Case.update_assigned_moh(case_id, assigned_moh, moh_assigned_date))
            return CaseController.success_response(result)
        except Exception as e:
            return CaseController.error_response(str(e), 500)

    @staticmethod
    def update_assigned_phi(case_id):
        try:
            data = request.get_json()
            assigned_phi = data.get('assignedPhi')
            phi_assigned_date = datetime.now().strftime('%Y-%m-%d')

            if not assigned_phi:
                assigned_phi = None
            
            result = asyncio.run(Case.update_assigned_phi(case_id, assigned_phi, phi_assigned_date))
            return CaseController.success_response(result)
        except Exception as e:
            return CaseController.error_response(str(e), 500)

    @staticmethod
    def add_report(case_id):
        try:
            # Get form data
            report_data = dict(request.form)
            
            # Handle file upload if present
            if 'file' in request.files:
                file = request.files['file']
                if file.filename:
                    # Save the file and get its path
                    # You'll need to implement your file saving logic here
                    file_path = f"uploads/reports/{file.filename}"
                    file.save(file_path)
                    report_data['file'] = file_path
            
            # Add report to case
            result = asyncio.run(Case.add_report(case_id, report_data))
            return CaseController.success_response(result)
        except Exception as e:
            return CaseController.error_response(str(e), 500)