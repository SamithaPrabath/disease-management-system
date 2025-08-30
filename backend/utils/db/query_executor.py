from .db_connection import AsyncDBConnection
from config import Config

db_config = {
    "host": Config.DB_HOST,
    "port": Config.DB_PORT,
    "user": Config.DB_USER,
    "password": Config.DB_PASSWORD,
    "database": Config.DB_NAME
}

class AsyncQueryExecutor:
    def __init__(self, db_config: dict = db_config):
        self.db_config = db_config
        self.db_con = AsyncDBConnection(db_config)

    async def __aenter__(self):
        return self

    async def __aexit__(self):
        await self.db_con.close_pool()

    async def execute(self, query, params: tuple = None) -> None | list[tuple]:
        """Execute a query without returning results (e.g., INSERT, UPDATE, DELETE)."""
        conn = await self.db_con.get_connection()
        async with conn.cursor() as cursor:
            await cursor.execute(query, params)
        await self.db_con.release_connection(conn)
        await self.db_con.close_pool()

    async def fetch_one(self, query, params: tuple = None) -> tuple:
        """Fetch one result from the database."""
        conn = await self.db_con.get_connection()
        async with conn.cursor() as cursor:
            await cursor.execute(query, params)
            result = await cursor.fetchone()
        await self.db_con.release_connection(conn)
        await self.db_con.close_pool()
        return result

    async def fetch_all(self, query, params: tuple = None) -> list[tuple]:
        """Fetch all results from the database."""
        conn = await self.db_con.get_connection()
        async with conn.cursor() as cursor:
            await cursor.execute(query, params)
            result = await cursor.fetchall()
        await self.db_con.release_connection(conn)
        await self.db_con.close_pool()
        return result
