from dataclasses import dataclass
from utils.db.query_executor import AsyncQueryExecutor

@dataclass
class LabReport:
    id: int = None
    case_id: int = None
    file: str = None

    async def save(self):
        query_executor = AsyncQueryExecutor()
        query = "INSERT INTO lab_reports (case_id, file) VALUES (%s, %s)"
        await query_executor.execute(query, (self.case_id, self.file))
        return self

    @staticmethod
    async def get_lab_reports_by_case_id(case_id):
        query_executor = AsyncQueryExecutor()
        query = f"SELECT * FROM lab_reports WHERE case_id = {case_id}"
        results = await query_executor.fetch_all(query)
        if results:
            return [LabReport(
                id=result[0],
                case_id=result[1],
                file=result[2]
            ) for result in results]
        return []
        
    @staticmethod
    async def add_lab_reports_for_case(case_id, file_paths):
        for file_path in file_paths:
            lab_report = LabReport(
                case_id=case_id,
                file=file_path
            )
            await lab_report.save()
        return True 