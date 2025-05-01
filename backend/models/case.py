from dataclasses import dataclass
from models.moh import MOH
from models.phi import PHI
from models.user import User
from models.report import Report
from models.location import Location
from models.lab_report import LabReport
from utils.db.query_executor import AsyncQueryExecutor


@dataclass
class Case:
    id: int = None
    patientName: str = None
    guardian: str = None
    age: int = None
    sex: str = None
    diseaseName: str = None
    caseStatus: str = None
    nicNo: str = None
    phoneNumber: str = None
    instituteId: int = None
    dateOfOnset: str = None
    dateOfAdmission: str = None
    ward: str = None
    bhtNumber: str = None
    address: str = None
    notifiedDate: str = None
    confirmedBy: str = None
    notifier: str = None
    confirmedDate: str = None
    remarks: str = None
    natureOfConfirmation: str = None
    labResult: str = None
    markAsReceived: str = "false"
    phiAssignedDate: str = None
    assignedPhi: str = None
    sendReport: str = "false"
    assignedMoh: str = None
    mohAssignedDate: str = None
    reportId: str = None
    longitude: float = None
    latitude: float = None
    location_address: str = None
    lab_files: list = None
    notifierDetails: dict = None # name, role
    assignedMohDetails: dict = None # name, area, registrationNumber
    assignedPhiDetails: dict = None # name, area, registrationNumber
    confirmedByDetails: dict = None # name, role
    instituteName: str = None
    report: dict = None # reportCreatedDate, ethnicGroup, dischargeDate, isolationStatus, isolationDateFrom, isolationDateTo, outcome, movementHistory, labResults, phiRemarks, householdContacts {name, age, description, date, age, disposition}, otherContacts {name, age, description, date, age, disposition} 
    location_details: dict = None # id, case_id, longitude, latitude, address
    lab_reports: list = None # list of lab report dictionaries

    async def save(self):
        query_executor = AsyncQueryExecutor()
        query = "INSERT INTO cases (patientName, guardian, age, sex, diseaseName, caseStatus, nicNo, phoneNumber, instituteId, dateOfOnset, dateOfAdmission, ward, bhtNumber, address, notifiedDate, confirmedBy, notifier, confirmedDate, remarks, natureOfConfirmation, labResult, markAsReceived) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
        await query_executor.execute(query, (self.patientName, self.guardian, self.age, self.sex, self.diseaseName, self.caseStatus, self.nicNo, self.phoneNumber, self.instituteId, self.dateOfOnset, self.dateOfAdmission, self.ward, self.bhtNumber, self.address, self.notifiedDate, self.confirmedBy, self.notifier, self.confirmedDate, self.remarks, self.natureOfConfirmation, self.labResult, self.markAsReceived))
        
        # Get the last inserted case ID
        query_executor1 = AsyncQueryExecutor()
        result = await query_executor1.fetch_one("SELECT id FROM cases ORDER BY id DESC LIMIT 1")
        self.id = result[0]
        
        # Save location data if available
        if self.longitude is not None and self.latitude is not None:
            location = Location(
                case_id=self.id,
                longitude=self.longitude,
                latitude=self.latitude,
                address=self.location_address
            )
            await location.save()
        
        # Save lab report files if available
        if self.lab_files and len(self.lab_files) > 0:
            await LabReport.add_lab_reports_for_case(self.id, self.lab_files)
            
        return self
    
    async def update_conformation_details(self):
        query_executor = AsyncQueryExecutor()
        query = "UPDATE cases SET confirmedBy = %s, confirmedDate = %s, caseStatus = %s, remarks = %s, natureOfConfirmation = %s WHERE id = %s"
        await query_executor.execute(query, (self.confirmedBy, self.confirmedDate, self.caseStatus, self.remarks, self.natureOfConfirmation, self.id))
        return self

    @staticmethod
    async def get_case_by_id(id):
        query_executor = AsyncQueryExecutor()
        query = f"SELECT * FROM cases WHERE id = {id}"
        result = await query_executor.fetch_one(query)

        if result:
            case = Case(
                id=result[0],
                patientName=result[1],
                guardian=result[2],
                age=result[3],
                sex=result[4],
                diseaseName=result[5],
                caseStatus=result[6],
                nicNo=result[7],
                phoneNumber=result[8],
                instituteId=result[9],
                dateOfOnset=result[10],
                dateOfAdmission=result[11],
                ward=result[12],
                bhtNumber=result[13],
                address=result[14],
                notifiedDate=result[15],
                confirmedBy=result[16],
                notifier=result[17],
                confirmedDate=result[18],
                remarks=result[19],
                natureOfConfirmation=result[20],
                labResult=result[21],
                markAsReceived=result[22],
                phiAssignedDate=result[23],
                assignedPhi=result[24],
                sendReport=result[25],
                assignedMoh=result[26],
                mohAssignedDate=result[27],
                reportId=result[28]
            )

            if case.dateOfOnset:
                case.dateOfOnset = format_date_with_suffix(case.dateOfOnset)

            if case.dateOfAdmission:
                case.dateOfAdmission = format_date_with_suffix(case.dateOfAdmission)
            
            if case.notifiedDate:
                case.notifiedDate = format_date_with_suffix(case.notifiedDate)
                
            if case.confirmedDate:
                case.confirmedDate = format_date_with_suffix(case.confirmedDate)
                
            if case.phiAssignedDate:
                case.phiAssignedDate = format_date_with_suffix(case.phiAssignedDate)

            if case.mohAssignedDate:
                case.mohAssignedDate = format_date_with_suffix(case.mohAssignedDate)
                
            if case.assignedMoh:
                moh_user = await MOH.get_moh_user_by_id(case.assignedMoh)
                case.assignedMohDetails = {
                    "name": moh_user.name,
                    "area": moh_user.area,
                    "registrationNumber": moh_user.id
                }
            
            if case.assignedPhi:
                phi_user = await PHI.get_phi_user_by_id(case.assignedPhi)
                case.assignedPhiDetails = {
                    "name": phi_user.name,
                    "area": phi_user.area,
                    "registrationNumber": phi_user.id
                }
            
            if case.confirmedBy:
                confirmed_by_user = await User.get_user_by_id(case.confirmedBy)
                case.confirmedByDetails = {
                    "name": confirmed_by_user.name,
                    "role": confirmed_by_user.role
                }

            if case.instituteId:
                institute_user = await User.get_user_by_id(case.instituteId)
                case.instituteName = institute_user.name
            
            if case.notifier:
                notifier_user = await User.get_user_by_id(case.notifier)
                case.notifierDetails = {
                    "name": notifier_user.name,
                    "role": notifier_user.role
                }
            
            if case.reportId:
                report = await Report.get_report_by_id(case.reportId)
                case.report = {
                    "reportCreatedDate": report.reportCreatedDate,
                    "ethnicGroup": report.ethnicGroup,
                    "dischargeDate": report.dischargeDate,
                    "isolationStatus": report.isolationStatus,
                    "isolationDateFrom": report.isolationDateFrom,
                    "isolationDateTo": report.isolationDateTo,
                    "outcome": report.outcome,
                    "movementHistory": report.movementHistory,
                    "labResults": report.labResults,
                    "phiRemarks": report.phiRemarks
                }
            else:
                case.report = {}
            
            # Get location details
            location = await Location.get_location_by_case_id(case.id)
            if location:
                case.longitude = location.longitude
                case.latitude = location.latitude
                case.location_address = location.address
                case.location_details = {
                    "id": location.id,
                    "case_id": location.case_id,
                    "longitude": location.longitude,
                    "latitude": location.latitude,
                    "address": location.address
                }
            else:
                case.location_details = None
            
            # Get lab report files
            lab_reports = await LabReport.get_lab_reports_by_case_id(case.id)
            case.lab_files = [lab_report.file for lab_report in lab_reports] if lab_reports else []
            case.lab_reports = [
                {
                    "id": lab_report.id,
                    "case_id": lab_report.case_id,
                    "file": lab_report.file
                } for lab_report in lab_reports
            ] if lab_reports else []
            
            return case
        return {}
    @staticmethod
    async def get_all_cases(user_id):
        query_executor = AsyncQueryExecutor()

        user = await User.get_user_by_id(user_id)

        if user.role == "admin" or user.role == "epi":
            query = "SELECT id FROM cases order by id desc"
            results = await query_executor.fetch_all(query)
        else:
            query = "SELECT id FROM cases where notifier = %s or confirmedBy = %s or instituteId = %s or assignedMoh = %s or assignedPhi = %s order by id desc"
            results = await query_executor.fetch_all(query, (user_id, user_id, user_id, user_id, user_id))
        
        return [await Case.get_case_by_id(result[0]) for result in results] if results else []
    
    @staticmethod
    async def get_all_cases_by_admin():
        query_executor = AsyncQueryExecutor()
        query = "SELECT id FROM cases where caseStatus = 'Confirmed' order by id desc"
        results = await query_executor.fetch_all(query)
        return [await Case.get_case_by_id(result[0]) for result in results] if results else []

    @staticmethod
    async def update_mark_as_received(case_id: int, mark_as_received: str):
        query_executor = AsyncQueryExecutor()
        query = "UPDATE cases SET markAsReceived = %s WHERE id = %s"
        await query_executor.execute(query, (mark_as_received, case_id))
        return {"message": "Case markAsReceived updated successfully", "status": "success"}

    @staticmethod
    async def update_assigned_moh(case_id: int, assigned_moh: str, moh_assigned_date: str):
        query_executor = AsyncQueryExecutor()
        query = "UPDATE cases SET assignedMoh = %s, mohAssignedDate = %s WHERE id = %s"
        await query_executor.execute(query, (assigned_moh, moh_assigned_date, case_id))
        return {"message": "Case assignedMoh and mohAssignedDate updated successfully", "status": "success"}

    @staticmethod
    async def update_assigned_phi(case_id: int, assigned_phi: str, phi_assigned_date: str):
        query_executor = AsyncQueryExecutor()
        query = "UPDATE cases SET assignedPhi = %s, phiAssignedDate = %s WHERE id = %s"
        await query_executor.execute(query, (assigned_phi, phi_assigned_date, case_id))
        return {"message": "Case assignedPhi and phiAssignedDate updated successfully", "status": "success"}

    @staticmethod
    async def add_report(case_id: int, report_data: dict):
        # Create new report
        report = Report(
            ethnicGroup=report_data.get('ethnicGroup'),
            dischargeDate=report_data.get('dischargeDate'),
            isolationDateFrom=report_data.get('isolationDateFrom'),
            isolationDateTo=report_data.get('isolationDateTo'),
            movementHistory=report_data.get('movementHistory'),
            isolationStatus=report_data.get('isolationStatus'),
            outcome=report_data.get('outcome'),
            labResults=report_data.get('labResults'),
            householdContacts=report_data.get('householdContacts'),
            otherContacts=report_data.get('otherContacts'),
            phiRemarks=report_data.get('phiRemarks'),
            file=report_data.get('file'),
            reportCreatedDate=report_data.get('reportCreatedDate')
        )
        
        # Save the report
        saved_report = await report.save()
        
        # Update case with report ID
        query_executor1 = AsyncQueryExecutor()
        query = "UPDATE cases SET report_id = %s WHERE id = %s"
        await query_executor1.execute(query, (saved_report.id, case_id))
        
        return {
            "message": "Report added and case updated successfully",
            "status": "success",
            "reportId": saved_report.id
        }


def format_date_with_suffix(date_obj):
    day = date_obj.day
    # Get suffix
    if 10 <= day % 100 <= 20:
        suffix = 'th'
    else:
        suffix = {1: 'st', 2: 'nd', 3: 'rd'}.get(day % 10, 'th')
    
    # Format the final string
    return f"{day}{suffix} {date_obj.strftime('%b')} {date_obj.year}"
