from dataclasses import dataclass
from datetime import datetime
from werkzeug.security import generate_password_hash

from models.user import User
from utils.db.query_executor import AsyncQueryExecutor

@dataclass
class Epidemology():
    id: int = None
    email: str = None
    district: str = None
    password: str = None
    name: str = None
    phoneNumber: str = None
    username: str = None
    address: str = None
    role: str = "epi"

    @staticmethod
    async def add_epidemology_user(self):
        created_at = datetime.now()
        updated_at = datetime.now()
        user = User(
            password_hash=generate_password_hash(self.password),
            name=self.name,
            phone=self.phoneNumber,
            username=self.username,
            role=self.role,
            created_at=created_at,
            updated_at=updated_at,
            address=self.address
        )

        is_exists = await User.get_user_by_username(user.username)
        if is_exists:
            return {"message": "User already exists", "status": 400}
        
        user = await User.add_user(user)

        query_executor = AsyncQueryExecutor()
        query = "INSERT INTO epidemology (id, email, district, address) VALUES (%s, %s, %s, %s)"
        await query_executor.execute(query, (user.id, self.email, self.district, self.address))
        
        return {"message": "User added successfully", "status": 200}

    @staticmethod
    async def get_epidemology_users():
        query_executor = AsyncQueryExecutor()
        query = "SELECT * FROM epidemology"
        result = await query_executor.fetch_all(query)
        
        users = []
        if result:
            epidemology_users = [Epidemology(
                id=epi[0],
                email=epi[1],
                district=epi[2],
                address=epi[3]
            ) for epi in result]
        
            for epi in epidemology_users:
                user = await User.get_user_by_id(epi.id)
                user.email = epi.email
                user.district = epi.district
                user.address = epi.address
                user.password_hash = ""
                users.append(user)

            return users
        return []

    @staticmethod
    async def get_epidemology_user_by_id(id):
        query_executor = AsyncQueryExecutor()
        query = "SELECT * FROM epidemology WHERE id = %s"
        result = await query_executor.fetch_one(query, (id,))
        
        if result:
            epidemology = Epidemology(*result)
            user = await User.get_user_by_id(epidemology.id)
            if user:
                user.email = epidemology.email
                user.district = epidemology.district
                user.address = epidemology.address
                user.password_hash = ""
                return user
        return None

    @staticmethod
    async def delete_epidemology_user(id):
        query_executor = AsyncQueryExecutor()
        # First delete from epidemology table
        query = "DELETE FROM epidemology WHERE id = %s"
        await query_executor.execute(query, (id,))
        
        query_executor1 = AsyncQueryExecutor()
        # Then delete from users table
        query = "DELETE FROM users WHERE id = %s"
        await query_executor1.execute(query, (id,))
        
        return {"message": "Epidemology user deleted successfully", "status": 200}

    @staticmethod
    async def update_epidemology_user(id, data):
        query_executor = AsyncQueryExecutor()
        
        # Update users table
        user_update_query = """
            UPDATE users 
            SET name = %s, 
                phone = %s, 
                updated_at = %s
            WHERE id = %s
        """
        updated_at = datetime.now()
        await query_executor.execute(
            user_update_query, 
            (data.get('name'), data.get('phone'), updated_at, id)
        )
        
        query_executor1 = AsyncQueryExecutor()

        # Update epidemology table
        epidemology_update_query = """
            UPDATE epidemology 
            SET district = %s, 
                email = %s,
                address = %s
            WHERE id = %s
        """
        await query_executor1.execute(
            epidemology_update_query, 
            (data.get('district'), data.get('email'), data.get('address'), id)
        )
        
        return {"message": "Epidemology user updated successfully", "status": 200} 