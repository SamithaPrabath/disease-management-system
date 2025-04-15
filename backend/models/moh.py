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
    phoneNumber: str = None
    username: str = None
    role: str = "moh"

    
    @staticmethod
    async def add_moh_user(self):
        created_at = datetime.now()
        updated_at = datetime.now()
        user = User(
            password_hash=generate_password_hash(self.password),
            name=self.name,
            phone=self.phoneNumber,
            username=self.username,
            role=self.role,
            created_at=created_at,
            updated_at=updated_at
        )

        is_exists = await User.get_user_by_username(user.username)
        if is_exists:
            return {"message": "User already exists", "status": 400}
        
        user = await User.add_moh_user(user)

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
