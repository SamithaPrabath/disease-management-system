from dataclasses import dataclass
from utils.db.query_executor import AsyncQueryExecutor

@dataclass
class Location:
    id: int = None
    case_id: int = None
    longitude: float = None
    latitude: float = None
    address: str = None

    async def save(self):
        query_executor = AsyncQueryExecutor()
        query = "INSERT INTO locations (case_id, longitude, latitude, address) VALUES (%s, %s, %s, %s)"
        await query_executor.execute(query, (self.case_id, self.longitude, self.latitude, self.address))
        return self

    @staticmethod
    async def get_location_by_case_id(case_id):
        query_executor = AsyncQueryExecutor()
        query = f"SELECT * FROM locations WHERE case_id = {case_id}"
        result = await query_executor.fetch_one(query)
        if result:
            return Location(
                id=result[0],
                case_id=result[1],
                longitude=result[2],
                latitude=result[3],
                address=result[4]
            )
        return None 