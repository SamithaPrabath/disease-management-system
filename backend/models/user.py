from dataclasses import dataclass
from werkzeug.security import generate_password_hash, check_password_hash

from utils.db.query_executor import AsyncQueryExecutor


@dataclass
class User:
    id: int = None
    username: str = None
    password_hash: str = None
    name: str = None
    role: str = None
    status: str = None
    phone: str = None
    created_at: str = None
    updated_at: str = None
    email: str = None
    area: str = None
    moh: str = None
    moh_id: str = None
    institute_id: str = None

    @staticmethod
    async def get_user_by_id(id):
        query_executor = AsyncQueryExecutor()
        query = f"SELECT * FROM users WHERE id = {id}"
        result = await query_executor.fetch_one(query)
        if result:
            return User(*result)
        return None
        
    @staticmethod
    async def get_user_by_username(username):
        query_executor = AsyncQueryExecutor()
        query = f"SELECT * FROM users WHERE username = '{username}'"
        result = await query_executor.fetch_one(query)
        if result:
            return User(*result)
        return None
    
    @staticmethod
    async def add_moh_user(self):
        query_executor = AsyncQueryExecutor()
        query = "INSERT INTO users (username, password_hash, name, role, phone, created_at, updated_at) VALUES (%s, %s, %s, %s, %s, %s, %s)"
        await query_executor.execute(query, (self.username, self.password_hash, self.name, self.role,self.phone, self.created_at, self.updated_at))
        
        user = await User.get_user_by_username(self.username)
        return user

    @staticmethod
    async def add_phi_user(self):
        query_executor = AsyncQueryExecutor()
        query = "INSERT INTO users (username, password_hash, name, role, phone, created_at, updated_at) VALUES (%s, %s, %s, %s, %s, %s, %s)"
        await query_executor.execute(query, (self.username, self.password_hash, self.name, self.role,self.phone, self.created_at, self.updated_at))
        
        user = await User.get_user_by_username(self.username)
        return user
    
    @staticmethod
    async def add_institute_user(self):
        query_executor = AsyncQueryExecutor()
        query = "INSERT INTO users (username, password_hash, name, role, phone, created_at, updated_at) VALUES (%s, %s, %s, %s, %s, %s, %s)"
        await query_executor.execute(query, (self.username, self.password_hash, self.name, self.role,self.phone, self.created_at, self.updated_at))
        
        user = await User.get_user_by_username(self.username)
        return user
    
    @staticmethod
    async def add_doctor_user(self):
        query_executor = AsyncQueryExecutor()
        query = "INSERT INTO users (username, password_hash, name, role, phone, created_at, updated_at) VALUES (%s, %s, %s, %s, %s, %s, %s)"
        await query_executor.execute(query, (self.username, self.password_hash, self.name, self.role,self.phone, self.created_at, self.updated_at))
        
        user = await User.get_user_by_username(self.username)
        return user

