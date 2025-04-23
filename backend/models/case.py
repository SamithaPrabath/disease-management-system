from dataclasses import dataclass
from models.moh import MOH
from models.user import User
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
                mohAssignedDate=result[27]
            )

            if case.assignedMoh:
                moh_user = await MOH.get_moh_user_by_id(case.assignedMoh)
                case.assignedMohDetails = {
                    "name": moh_user.name,
                    "area": moh_user.area,
                    "registrationNumber": moh_user.id
                }
                
            return case
        return {}
    @staticmethod
    async def get_all_cases(user_id):
        query_executor = AsyncQueryExecutor()

        user = await User.get_user_by_id(user_id)

        if user.role == "admin" or user.role == "epi":
            query = "SELECT * FROM cases"
            results = await query_executor.fetch_all(query)
        else:
            query = "SELECT * FROM cases where notifier = %s or confirmedBy = %s or instituteId = %s or assignedMoh = %s"
            results = await query_executor.fetch_all(query, (user_id, user_id, user_id, user_id))
        
        return [Case(*result) for result in results] if results else []
    
    @staticmethod
    async def get_all_cases_by_admin():
        query_executor = AsyncQueryExecutor()
        query = "SELECT * FROM cases where caseStatus = 'Confirmed'"
        results = await query_executor.fetch_all(query)
        return [Case(*result) for result in results] if results else []

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
