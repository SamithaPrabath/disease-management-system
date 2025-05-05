from dataclasses import dataclass
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
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
    is_initial: str = None
    reg_number: str = None
    address: str = None
    district: str = None

    @staticmethod
    async def get_user_by_id(id):
        query_executor = AsyncQueryExecutor()
        query = f"SELECT * FROM users WHERE id = {id}"
        result = await query_executor.fetch_one(query)
        if result:
            user = User(
                id=result[0],
                username=result[1],
                password_hash=result[2],
                name=result[3],
                role=result[4],
                status=result[5],
                phone=result[6],
                created_at=result[7],
                updated_at=result[8],
                is_initial=result[9]
            )
            return user
        return None
        
    @staticmethod
    async def get_user_by_username(username):
        query_executor = AsyncQueryExecutor()
        query = "SELECT id FROM users WHERE BINARY username = %s"
        result = await query_executor.fetch_one(query, (username,))
        if result:
            return await User.get_user_by_id(result[0])
        return None
    
    @staticmethod
    async def add_user(self):
        query_executor = AsyncQueryExecutor()
        query = "INSERT INTO users (username, password_hash, name, role, phone, created_at, updated_at) VALUES (%s, %s, %s, %s, %s, %s, %s)"
        await query_executor.execute(query, (self.username, self.password_hash, self.name, self.role,self.phone, self.created_at, self.updated_at))
        
        user = await User.get_user_by_username(self.username)
        return user
        
    @staticmethod
    async def update_password(username, new_password=None):
        """
        Update a user's password by username
        
        Args:
            username (str): The username of the user
            new_password (str): The new password (will be hashed)
            
        Returns:
            dict: A dictionary with the update status
        """
        try:
            user = await User.get_user_by_username(username)
            if not user:
                return {
                    "status": "error",
                    "message": "User not found"
                }
            
            if new_password:
                # Hash the new password
                password_hash = generate_password_hash(new_password)
                updated_at = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
                
                # Update the password
                query_executor = AsyncQueryExecutor()
                query = "UPDATE users SET password_hash = %s, updated_at = %s, is_initial_login = 1 WHERE id = %s"
                await query_executor.execute(query, (password_hash, updated_at, user.id))
            else:
                password_hash = generate_password_hash(username)
                query = "UPDATE users SET password_hash = %s, updated_at = %s, is_initial_login = 0 WHERE id = %s"
                await query_executor.execute(query, (password_hash, updated_at, user.id))
            
            return {
                "status": "success",
                "message": "Password updated successfully"
            }
            
        except Exception as e:
            return {
                "status": "error",
                "message": f"Error updating password: {str(e)}"
            }