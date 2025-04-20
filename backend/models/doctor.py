from dataclasses import dataclass
from datetime import datetime
from werkzeug.security import generate_password_hash

from models.user import User
from models.phi import PHI
from utils.db.query_executor import AsyncQueryExecutor

@dataclass
class Doctor():
    id: int = None
    specialization: str = None
    email: str = None
    hospital: str = None
    password: str = None
    name: str = None
    phoneNumber: str = None
    username: str = None
    role: str = "doctor"
    license_number: str = None

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
        
        user = await User.add_doctor_user(user)

        query_executor = AsyncQueryExecutor()
        query = "INSERT INTO doctors (id, specialization, email, hospital, license_number) VALUES (%s, %s, %s, %s, %s)"
        await query_executor.execute(query, (user.id, self.specialization, self.email, self.hospital, self.license_number))
        
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
                user.specialization = doctor.specialization
                user.hospital = doctor.hospital
                user.license_number = doctor.license_number
                user.password_hash = ""
                users.append(user)

            return users
        return []

    @staticmethod
    async def get_doctor_user_by_id(id):
        query_executor = AsyncQueryExecutor()
        query = "SELECT * FROM doctors WHERE id = %s"
        result = await query_executor.fetch_one(query, (id,))
        
        if result:
            doctor = Doctor(*result)
            user = await User.get_user_by_id(doctor.id)
            if user:
                user.email = doctor.email
                user.specialization = doctor.specialization
                user.hospital = doctor.hospital
                user.license_number = doctor.license_number
                user.password_hash = ""
                return user
        return None

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
            (data.get('name'), data.get('phone'), updated_at, id)
        )
        
        # Update doctor table
        doctor_update_query = """
            UPDATE doctors 
            SET specialization = %s, 
                email = %s,
                hospital = %s,
                license_number = %s
            WHERE id = %s
        """
        await query_executor.execute(
            doctor_update_query, 
            (data.get('specialization'), data.get('email'), data.get('hospital'), data.get('license_number'), id)
        )
        
        return {"message": "Doctor user updated successfully", "status": 200}

    @staticmethod
    async def get_referrals_by_phi(phi_id):
        query_executor = AsyncQueryExecutor()
        query = """
            SELECT r.*, p.name as patient_name, p.age, p.gender, p.address, p.phone
            FROM referrals r
            JOIN patients p ON r.patient_id = p.id
            WHERE r.phi_id = %s AND r.doctor_id IS NULL
        """
        result = await query_executor.fetch_all(query, (phi_id,))
        return result if result else []

    @staticmethod
    async def accept_referral(referral_id, doctor_id):
        query_executor = AsyncQueryExecutor()
        query = """
            UPDATE referrals 
            SET doctor_id = %s,
                status = 'accepted',
                updated_at = %s
            WHERE id = %s
        """
        updated_at = datetime.now()
        await query_executor.execute(query, (doctor_id, updated_at, referral_id))
        return {"message": "Referral accepted successfully", "status": 200}