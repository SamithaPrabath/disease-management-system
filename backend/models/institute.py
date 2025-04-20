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
    
    @staticmethod
    async def create_institute(name, registration_number, email, phone_number, address, city, province):
        query_executor = AsyncQueryExecutor()
        query = """
            INSERT INTO institute (name, registration_number, email, phone_number, address, city, province)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        """
        await query_executor.execute(query, (name, registration_number, email, phone_number, address, city, province))
        
        return {"message": "Institute created successfully", "status": "success"}
    
    @staticmethod
    async def update_institute(id, name=None, registration_number=None, email=None, phone_number=None, address=None, city=None, province=None):
        query_executor = AsyncQueryExecutor()
        updates = []
        params = []
        
        if name is not None:
            updates.append("name = %s")
            params.append(name)
        if email is not None:
            updates.append("email = %s")
            params.append(email)
        if phone_number is not None:
            updates.append("phone_number = %s")
            params.append(phone_number)
        if address is not None:
            updates.append("address = %s")
            params.append(address)
        if city is not None:
            updates.append("city = %s")
            params.append(city)
        if province is not None:
            updates.append("province = %s")
            params.append(province)
            
        if not updates:
            return {"message": "No fields to update", "status": "error"}
            
        query = f"UPDATE institute SET {', '.join(updates)} WHERE id = %s"
        params.append(id)
        
        await query_executor.execute(query, tuple(params))
        return {"message": "Institute updated successfully", "status": "success"}
    
    @staticmethod
    async def delete_institute(id):
        query_executor = AsyncQueryExecutor()
        query = "DELETE FROM institute WHERE id = %s"
        await query_executor.execute(query, (id,))
        return {"message": "Institute deleted successfully", "status": "success"}
    