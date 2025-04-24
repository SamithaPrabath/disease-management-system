from dataclasses import dataclass
from utils.db.query_executor import AsyncQueryExecutor


@dataclass
class Report:
    id: int = None
    ethnicGroup: str = None
    dischargeDate: str = None
    isolationDateFrom: str = None
    isolationDateTo: str = None
    movementHistory: str = None
    isolationStatus: str = None
    outcome: str = None
    labResults: str = None
    householdContacts: str = None
    otherContacts: str = None
    phiRemarks: str = None
    file: str = None
    reportCreatedDate: str = None

    async def save(self):
        query_executor = AsyncQueryExecutor()
        query = """
            INSERT INTO report (
                ethnicGroup, dischargeDate, isolationDateFrom, isolationDateTo,
                movementHistory, isolationStatus, outcome, labResults,
                householdContacts, otherContacts, phiRemarks, file, reportCreatedDate
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        await query_executor.execute(query, (
            self.ethnicGroup, self.dischargeDate, self.isolationDateFrom,
            self.isolationDateTo, self.movementHistory, self.isolationStatus,
            self.outcome, self.labResults, self.householdContacts,
            self.otherContacts, self.phiRemarks, self.file, self.reportCreatedDate
        ))
        
        # Get the last inserted ID
        query_executor1 = AsyncQueryExecutor()
        result = await query_executor1.fetch_one("SELECT id FROM report ORDER BY id DESC LIMIT 1")
        self.id = result[0]
        return self

    @staticmethod
    async def get_report_by_id(id):
        query_executor = AsyncQueryExecutor()
        query = f"SELECT * FROM report WHERE id = {id}"
        result = await query_executor.fetch_one(query)

        if result:
            return Report(
                id=result[0],
                ethnicGroup=result[1],
                dischargeDate=result[2],
                isolationDateFrom=result[3],
                isolationDateTo=result[4],
                movementHistory=result[5],
                isolationStatus=result[6],
                outcome=result[7],
                labResults=result[8],
                householdContacts=result[9],
                otherContacts=result[10],
                phiRemarks=result[11],
                file=result[12],
                reportCreatedDate=result[13]
            )
        return None

    @staticmethod
    async def get_all_reports():
        query_executor = AsyncQueryExecutor()
        query = "SELECT id FROM report"
        results = await query_executor.fetch_all(query)
        return [await Report.get_report_by_id(result[0]) for result in results] if results else []

    async def update(self):
        query_executor = AsyncQueryExecutor()
        query = """
            UPDATE report SET 
                ethnicGroup = %s,
                dischargeDate = %s,
                isolationDateFrom = %s,
                isolationDateTo = %s,
                movementHistory = %s,
                isolationStatus = %s,
                outcome = %s,
                labResults = %s,
                householdContacts = %s,
                otherContacts = %s,
                phiRemarks = %s,
                file = %s,
                reportCreatedDate = %s
            WHERE id = %s
        """
        await query_executor.execute(query, (
            self.ethnicGroup, self.dischargeDate, self.isolationDateFrom,
            self.isolationDateTo, self.movementHistory, self.isolationStatus,
            self.outcome, self.labResults, self.householdContacts,
            self.otherContacts, self.phiRemarks, self.file, self.reportCreatedDate,
            self.id
        ))
        return self 