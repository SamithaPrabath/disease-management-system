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
    
    @staticmethod
    async def update_disease(disease_id: int, name: str = None, category: str = None, 
                           mod_of_transmission: str = None, description: str = None):
        query_executor = AsyncQueryExecutor()
        update_fields = []
        params = []
        
        if name is not None:
            update_fields.append("name = %s")
            params.append(name)
        if category is not None:
            update_fields.append("category = %s")
            params.append(category)
        if mod_of_transmission is not None:
            update_fields.append("mod_of_transmission = %s")
            params.append(mod_of_transmission)
        if description is not None:
            update_fields.append("description = %s")
            params.append(description)
            
        if not update_fields:
            return False
            
        query = f"UPDATE disease SET {', '.join(update_fields)} WHERE id = %s"
        params.append(disease_id)
        
        result = await query_executor.execute(query, params)
        
        return {"message": "Disease updated successfully", "status": "success"}
    
    @staticmethod
    async def create_disease(name: str, category: str, mod_of_transmission: str, description: str):
        query_executor = AsyncQueryExecutor()
        query = """
            INSERT INTO disease (name, category, mod_of_transmission, description)
            VALUES (%s, %s, %s, %s)
        """
        params = [name, category, mod_of_transmission, description]
        
        await query_executor.fetch_one(query, params)
        
        return {"message": "Disease created successfully", "status": "success"}
    
    @staticmethod
    async def delete_disease(disease_id: int):
        query_executor = AsyncQueryExecutor()
        query = "DELETE FROM disease WHERE id = %s"
        params = [disease_id]
        
        await query_executor.execute(query, params)
        return {"message": "Disease deleted successfully", "status": "success"}
        