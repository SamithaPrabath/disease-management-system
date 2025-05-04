from datetime import datetime
from flask import request
from .base_controller import BaseController
from models.case import Case
from models.location import Location
import asyncio
import os
from werkzeug.utils import secure_filename

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
            files = request.files.getlist('files[]')  # Get all files from files[] array
            
            # Create uploads directory if it doesn't exist
            upload_dir = os.path.join(os.getcwd(), 'uploads')
            if not os.path.exists(upload_dir):
                os.makedirs(upload_dir)
            
            # Handle file uploads
            file_paths = []
            for file in files:
                if file and file.filename:
                    # Secure the filename
                    filename = secure_filename(file.filename)
                    # Create a unique filename to avoid collisions
                    unique_filename = f"{datetime.now().strftime('%Y%m%d_%H%M%S')}_{filename}"
                    file_path = os.path.join(upload_dir, unique_filename)
                    file.save(file_path)
                    file_paths.append(unique_filename)
            
            new_case = Case(
                patientName=data.get('patientName'),
                guardian=data.get('guardian'),
                age=data.get('age'),
                sex=data.get('sex'),
                diseaseName=data.get('diseaseName'),
                caseStatus=data.get('caseStatus'),
                nicNo=data.get('nicNo'),
                phoneNumber=data.get('phoneNumber'),
                instituteId=data.get('instituteId'),
                dateOfOnset=data.get('dateOfOnset'),
                dateOfAdmission=data.get('dateOfAdmission'),
                ward=data.get('ward'),
                bhtNumber=data.get('bhtNumber'),
                address=data.get('address'),
                notifiedDate=data.get('notifiedDate'),
                confirmedBy=data.get('confirmedBy'),
                notifier=data.get('notifier'),
                confirmedDate=data.get('confirmedDate'),
                labResult=data.get('labResult'),
                longitude=data.get('longitude'),
                latitude=data.get('latitude'),
                location_address=data.get('locationAddress'),
                lab_files=file_paths  # Store array of file paths
            )
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
            phi_assigned_date = data.get('phiAssignedDate')

            if not assigned_phi:
                assigned_phi = None
            if not phi_assigned_date:
                phi_assigned_date = None
            
            result = asyncio.run(Case.update_assigned_phi(case_id, assigned_phi, phi_assigned_date))
            return CaseController.success_response(result)
        except Exception as e:
            return CaseController.error_response(str(e), 500)

    @staticmethod
    def add_report(case_id):
        try:
            # Get form data
            report_data = dict(request.form)
            
            # Handle file uploads - getting all files with the key 'files'
            files = request.files.getlist('files')
            
            # Create uploads/reports directory if it doesn't exist
            upload_dir = os.path.join(os.getcwd(), 'uploads')
            if not os.path.exists(upload_dir):
                os.makedirs(upload_dir)
            
            # Handle file uploads
            file_paths = []
            for file in files:
                if file and file.filename:
                    # Secure the filename
                    filename = secure_filename(file.filename)
                    # Create a unique filename to avoid collisions
                    unique_filename = f"{datetime.now().strftime('%Y%m%d_%H%M%S')}_{filename}"
                    file_path = os.path.join(upload_dir, unique_filename)
                    file.save(file_path)
                    file_paths.append(unique_filename)
            
            # Add report to case
            result = asyncio.run(Case.add_report(case_id, report_data, file_paths))
            return CaseController.success_response(result)
        except Exception as e:
            return CaseController.error_response(str(e), 500)

    @staticmethod
    def get_locations_for_markers():
        """
        Get all location details for displaying on map with markers.
        
        Returns:
            A JSON response with location details including position, label, and case information.
        """
        try:
            user_id = request.args.get('userID')
            disease_name = request.args.get('diseaseName')
            status = request.args.get('status')
            
            locations = asyncio.run(Case.get_locations_for_map(user_id, disease_name, status))
            
            # Format locations for markers
            markers = []
            for location in locations:
                if location.get('latitude') and location.get('longitude'):
                    markers.append({
                        'id': location.get('case_id'),
                        'position': {
                            'lat': float(location.get('latitude')),
                            'lng': float(location.get('longitude'))
                        },
                        'label': location.get('disease_name') or '',
                        'patientName': location.get('patient_name'),
                        'caseStatus': location.get('case_status'),
                        'address': location.get('address'),
                        'notifiedDate': location.get('notified_date'),
                        'confirmedDate': location.get('confirmed_date')
                    })
            
            return CaseController.success_response(markers)
        except Exception as e:
            return CaseController.error_response(str(e), 500)

    @staticmethod
    def update_send_report(case_id):
        """
        Update the sendReport field for a case
        
        Args:
            case_id: The ID of the case to update
        """
        try:
            data = request.get_json()
            send_report = data.get('userId')
            
            # Validate the sendReport field
            if send_report is None:
                return CaseController.error_response("sendReport field is required", 400)
                
            # Update the sendReport status
            result = asyncio.run(Case.update_send_report(case_id, send_report))
            
            if result.get('status') == 'error':
                return CaseController.error_response(result.get('message'), 500)
                
            return CaseController.success_response(result)
            
        except Exception as e:
            return CaseController.error_response(str(e), 500)