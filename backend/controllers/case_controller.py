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