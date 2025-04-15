from dataclasses import dataclass, fields
from utils.db.query_executor import AsyncQueryExecutor


@dataclass
class Institute:
    id: int = None
    name: str = None
    registration_number: str = None
    email: str = None
    phone_number: str = None
    address: str = None
    city: str = None
    province: str = None


    @staticmethod
    async def get_institute_by_id(id):
        query_executor = AsyncQueryExecutor()
        query = f"SELECT * FROM institute WHERE id = {id}"
        result = await query_executor.fetch_one(query)
        return Institute(*result)
        
    @staticmethod
    async def get_all_institutes():
        query_executor = AsyncQueryExecutor()
        query = "SELECT * FROM institute"
        results = await query_executor.fetch_all(query)
        return [Institute(*result) for result in results] if results else []
    