from dataclasses import dataclass
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
    notifierDetails: dict = None # name, role
    assignedMohDetails: dict = None # name, area, registrationNumber
    assignedPhiDetails: dict = None # name, area, registrationNumber
    confirmedByDetails: dict = None # name, role
    report: dict = None # reportCreatedDate, ethnicGroup, dischargeDate, isolationStatus, isolationDateFrom, isolationDateTo, outcome, movementHistory, labResults, phiRemarks, householdContacts {name, age, description, date, age, disposition}, otherContacts {name, age, description, date, age, disposition} 

    async def save(self):
        query_executor = AsyncQueryExecutor()
        query = "INSERT INTO cases (patientName, guardian, age, sex, diseaseName, caseStatus, nicNo, phoneNumber, instituteId, dateOfOnset, dateOfAdmission, ward, bhtNumber, address, notifiedDate, confirmedBy, notifier, confirmedDate, remarks, natureOfConfirmation, labResult, markAsReceived) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
        await query_executor.execute(query, (self.patientName, self.guardian, self.age, self.sex, self.diseaseName, self.caseStatus, self.nicNo, self.phoneNumber, self.instituteId, self.dateOfOnset, self.dateOfAdmission, self.ward, self.bhtNumber, self.address, self.notifiedDate, self.confirmedBy, self.notifier, self.confirmedDate, self.remarks, self.natureOfConfirmation, self.labResult, self.markAsReceived))
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
        return Case(*result) if result else {}
        
    @staticmethod
    async def get_all_cases(user_id):
        query_executor = AsyncQueryExecutor()
        query = "SELECT * FROM cases where notifier = %s or confirmedBy = %s"
        results = await query_executor.fetch_all(query, (user_id, user_id))
        
        return [Case(*result) for result in results] if results else []
