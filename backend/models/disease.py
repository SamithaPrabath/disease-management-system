
from dataclasses import dataclass

from utils.db.query_executor import AsyncQueryExecutor


@dataclass
class Disease:
    id: int = None
    name: str = None
    category: str = None
    mod_of_transmission: str = None
    description: str = None

    @staticmethod
    async def get_all_diseases():
        query_executor = AsyncQueryExecutor()
        query = "SELECT * FROM disease"
        result = await query_executor.fetch_all(query)
        return [Disease(*row) for row in result]
    