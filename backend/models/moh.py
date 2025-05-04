from dataclasses import dataclass
from datetime import datetime
from werkzeug.security import generate_password_hash

from models.user import User
from utils.db.query_executor import AsyncQueryExecutor

@dataclass
class MOH():
    id: int = None
    area: str = None
    email: str = None
    password: str = None
    name: str = None
    phone: str = None
    username: str = None
    role: str = "moh"

    
    @staticmethod
    async def add_moh_user(self):
        created_at = datetime.now()
        updated_at = datetime.now()
        user = User(
            password_hash=generate_password_hash(self.password),
            name=self.name,
            phone=self.phone,
            username=self.username,
            role=self.role,
            created_at=created_at,
            updated_at=updated_at
        )

        is_exists = await User.get_user_by_username(user.username)
        if is_exists:
            return {"message": "User already exists", "status": 400}
        
        user = await User.add_user(user)

        query_executor = AsyncQueryExecutor()
        query = "INSERT INTO moh (id,area, email) VALUES (%s, %s, %s)"
        await query_executor.execute(query, (user.id, self.area, self.email))
        
        return {"message": "User added successfully", "status": 200}

    @staticmethod
    async def get_moh_users():
        query_executor = AsyncQueryExecutor()
        query = "SELECT * FROM moh"
        result = await query_executor.fetch_all(query)
        
        users = []
        if result:
            moh_users = [MOH(*moh) for moh in result]
        
            for moh in moh_users:
                user = await User.get_user_by_id(moh.id)
                user.email = moh.email
                user.area = moh.area
                user.password_hash = ""
                users.append(user)

            return users
        return []

    @staticmethod
    async def get_moh_user_by_id(id):
        query_executor = AsyncQueryExecutor()
        query = "SELECT * FROM moh WHERE id = %s"
        result = await query_executor.fetch_one(query, (id,))
        
        if result:
            moh = MOH(*result)
            user = await User.get_user_by_id(moh.id)
            if user:
                user.email = moh.email
                user.area = moh.area
                user.password_hash = ""
                return user
        return None

    @staticmethod
    async def delete_moh_user(id):
        query_executor = AsyncQueryExecutor()
        # First delete from moh table
        query = "DELETE FROM moh WHERE id = %s"
        await query_executor.execute(query, (id,))
        
        query_executor1 = AsyncQueryExecutor()
        # Then delete from users table
        query = "DELETE FROM users WHERE id = %s"
        await query_executor1.execute(query, (id,))
        
        return {"message": "MOH user deleted successfully", "status": 200}

    @staticmethod
    async def update_moh_user(id, data):
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
        # Update moh table
        moh_update_query = """
            UPDATE moh 
            SET area = %s, 
                email = %s
            WHERE id = %s
        """
        await query_executor1.execute(
            moh_update_query, 
            (data.get('area'), data.get('email'), id)
        )
        
        return {"message": "MOH user updated successfully", "status": 200}
