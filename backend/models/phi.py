from dataclasses import dataclass
from datetime import datetime
from werkzeug.security import generate_password_hash

from models.moh import MOH
from models.user import User
from utils.db.query_executor import AsyncQueryExecutor

@dataclass
class PHI():
    id: int = None
    area: str = None
    email: str = None
    moh_id: str = None
    password: str = None
    name: str = None
    phoneNumber: str = None
    username: str = None
    role: str = "phi"
    moh: str = None

    @staticmethod
    async def add_phi_user(self):
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
        
        user = await User.add_phi_user(user)

        query_executor = AsyncQueryExecutor()
        query = "INSERT INTO phis (id, area, email, moh_id) VALUES (%s, %s, %s, %s)"
        await query_executor.execute(query, (user.id, self.area, self.email, self.moh))
        
        return {"message": "User added successfully", "status": 200}

    @staticmethod
    async def get_phi_users():
        query_executor = AsyncQueryExecutor()
        query = "SELECT * FROM phis"
        result = await query_executor.fetch_all(query)
        
        users = []
        if result:
            phi_users = [PHI(*phi) for phi in result]
        
            for phi in phi_users:
                user = await User.get_user_by_id(phi.id)
                user.email = phi.email
                user.area = phi.area
                user.password_hash = ""

                moh = await MOH.get_moh_user_by_id(phi.moh_id)
                user.moh = moh.name
                user.moh_id = moh.id
                users.append(user)

            return users
        return []

    @staticmethod
    async def get_phi_user_by_id(id):
        query_executor = AsyncQueryExecutor()
        query = "SELECT * FROM phis WHERE id = %s"
        result = await query_executor.fetch_one(query, (id,))
        
        if result:
            phi = PHI(*result)
            user = await User.get_user_by_id(phi.id)
            if user:
                user.email = phi.email
                user.area = phi.area
                user.password_hash = ""
                return user
        return None

    @staticmethod
    async def delete_phi_user(id):
        query_executor = AsyncQueryExecutor()
        # First delete from phi table
        query = "DELETE FROM phis WHERE id = %s"
        await query_executor.execute(query, (id,))
        
        query_executor1 = AsyncQueryExecutor()
        # Then delete from users table
        query = "DELETE FROM users WHERE id = %s"
        await query_executor1.execute(query, (id,))
        
        return {"message": "PHI user deleted successfully", "status": 200}

    @staticmethod
    async def update_phi_user(id, data):
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

        try:
            mod_id = int(data.get('moh'))
        except:
            mod_id = None

        if mod_id:
        # Update phi table
            phi_update_query = """
                UPDATE phis 
            SET area = %s, 
                email = %s,
                moh_id = %s
            WHERE id = %s
            """
            await query_executor1.execute(
                phi_update_query, 
                (data.get('area'), data.get('email'), mod_id, id)
            )
        else:
            phi_update_query = """
                UPDATE phis 
            SET area = %s, 
                email = %s
            WHERE id = %s
            """
            await query_executor1.execute(
                phi_update_query, 
                (data.get('area'), data.get('email'), id)
            )
        
        return {"message": "PHI user updated successfully", "status": 200}