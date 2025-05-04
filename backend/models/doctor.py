from dataclasses import dataclass
from datetime import datetime
from werkzeug.security import generate_password_hash

from models.moh import MOH
from models.user import User
from models.phi import PHI
from utils.db.query_executor import AsyncQueryExecutor

@dataclass
class Doctor():
    id: int = None
    institute_id: int = None
    email: str = None
    area: str = None
    reg_number: str = None
    name: str = None
    phoneNumber: str = None
    username: str = None
    password: str = None
    role: str = None
    

    @staticmethod
    async def add_doctor_user(self):
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
        
        user = await User.add_user(user)

        query_executor = AsyncQueryExecutor()
        query = "INSERT INTO doctors (id, institute_id, email, area, reg_number) VALUES (%s, %s, %s, %s, %s)"
        await query_executor.execute(query, (user.id, self.institute_id, self.email, self.area, self.reg_number))
        
        return {"message": "Doctor added successfully", "status": 200}

    @staticmethod
    async def get_doctor_users():
        query_executor = AsyncQueryExecutor()
        query = "SELECT * FROM doctors"
        result = await query_executor.fetch_all(query)
        
        users = []
        if result:
            doctor_users = [Doctor(*doctor) for doctor in result]
        
            for doctor in doctor_users:
                user = await User.get_user_by_id(doctor.id)
                user.email = doctor.email
                user.area = doctor.area
                user.institute_id = doctor.institute_id
                user.reg_number = doctor.moh
                user.password_hash = ""

                moh_user = await MOH.get_moh_user_by_id(doctor.moh)
                user.moh = moh_user.name
                users.append(user)

            return users
        return []

    @staticmethod
    async def update_doctor_user(id, data):
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
            (data.get('name'), data.get('phoneNumber'), updated_at, id)
        )
        
        # Update doctor table
        doctor_update_query = """
            UPDATE doctors 
            SET email = %s,
                area = %s,
                moh = %s
            WHERE id = %s
        """

        query_executor1 = AsyncQueryExecutor()
        await query_executor1.execute(
            doctor_update_query, 
            (data.get('email'), data.get('area'), data.get('moh'), id)
        )
        
        return {"message": "Doctor user updated successfully", "status": 200}

    @staticmethod
    async def delete_doctor_user(id):
        query_executor = AsyncQueryExecutor()
        # First delete from doctor table
        query = "DELETE FROM doctors WHERE id = %s"
        await query_executor.execute(query, (id,))
        
        query_executor1 = AsyncQueryExecutor()
        # Then delete from users table
        query = "DELETE FROM users WHERE id = %s"
        await query_executor1.execute(query, (id,))
        
        return {"message": "Doctor user deleted successfully", "status": 200}
