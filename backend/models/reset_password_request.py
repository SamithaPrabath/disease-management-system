from dataclasses import dataclass
from datetime import datetime
from models.user import User
from utils.db.query_executor import AsyncQueryExecutor

@dataclass
class ResetPasswordRequest:
    id: int = None
    username: str = None
    email: str = None
    name: str = None
    is_reset: int = 0
    request_date: str = None
    updated_date: str = None
    is_user_details_correct: int = 0
    user_id: int = None
    user_role: str = None
    
    @staticmethod
    async def create_reset_request(username, email, name):
        """
        Create a new password reset request
        
        Args:
            username (str): The username of the user requesting password reset
            email (str): The email of the user
            name (str): The name of the user
            
        Returns:
            dict: A dictionary containing the status and message of the operation
        """
        try:
            query_executor = AsyncQueryExecutor()
            
            # Check if username exists
            user = await User.get_user_by_username(username)
            if not user:
                return {
                    "status": "error",
                    "message": "Username not found"
                }
            
            # First check if there's an existing request for this username
            existing_request = await ResetPasswordRequest.get_by_username(username)
            if existing_request:
                # Update the existing request
                existing_request.email = email
                existing_request.name = name
                existing_request.request_date = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
                existing_request.is_reset = 0
                existing_request.is_user_details_correct = 0
                
                # Update in database
                query = """
                    UPDATE reset_password_request 
                    SET email = %s, name = %s, request_date = %s, is_reset = %s, is_user_details_correct = %s
                    WHERE username = %s
                """
                await query_executor.execute(query, (
                    email, name, existing_request.request_date, existing_request.is_reset, 
                    existing_request.is_user_details_correct, username
                ))
                
                return {
                    "status": "success",
                    "message": "Password reset request updated",
                    "requestId": existing_request.id
                }
            
            # Create a new request
            request_date = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            query = """
                INSERT INTO reset_password_request 
                (username, email, name, is_reset, request_date, is_user_details_correct) 
                VALUES (%s, %s, %s, %s, %s, %s)
            """
            await query_executor.execute(query, (username, email, name, 0, request_date, 0))
            
            # Get the ID of the newly created request
            query_executor2 = AsyncQueryExecutor()
            result = await query_executor2.fetch_one("SELECT id FROM reset_password_request WHERE username = %s", (username,))
            request_id = result[0] if result else None
            
            return {
                "status": "success",
                "message": "Password reset request created",
                "requestId": request_id
            }
            
        except Exception as e:
            return {
                "status": "error",
                "message": f"Error creating reset request: {str(e)}"
            }
    
    @staticmethod
    async def verify_user_details(request_id, username, email, name):
        """
        Verify if the user details match with an existing user
        
        Args:
            request_id (int): The ID of the reset request
            username (str): The username to verify
            email (str): The email to verify
            name (str): The name to verify
            
        Returns:
            dict: A dictionary with the verification status
        """
        try:
            # Get the user by username
            user = await User.get_user_by_username(username)
            if not user:
                return {
                    "status": "error",
                    "message": "User not found"
                }
            
            # Verify the details
            is_verified = False
            verification_message = "Verification failed"
            
            # Get user details - here we check if email or name matches
            # This logic can be adjusted based on how strict you want the verification to be
            if user.name.lower() == name.lower():
                is_verified = True
                verification_message = "User details verified successfully"
            
            # Update the request
            query_executor = AsyncQueryExecutor()
            updated_date = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            
            query = """
                UPDATE reset_password_request 
                SET is_user_details_correct = %s, updated_date = %s
                WHERE id = %s
            """
            await query_executor.execute(query, (1 if is_verified else 0, updated_date, request_id))
            
            return {
                "status": "success" if is_verified else "error",
                "message": verification_message,
                "is_verified": is_verified
            }
            
        except Exception as e:
            return {
                "status": "error",
                "message": f"Error verifying user details: {str(e)}"
            }
    
    @staticmethod
    async def complete_reset(request_id, new_password):
        """
        Complete the password reset process by updating the user's password
        
        Args:
            request_id (int): The ID of the reset request
            new_password (str): The new password for the user
            
        Returns:
            dict: A dictionary with the reset status
        """
        try:
            # Get the reset request
            reset_request = await ResetPasswordRequest.get_by_id(request_id)
            if not reset_request:
                return {
                    "status": "error",
                    "message": "Reset request not found"
                }
            
            # Check if user details were verified
            if not reset_request.is_user_details_correct:
                return {
                    "status": "error",
                    "message": "User details have not been verified"
                }
            
            # Update the user's password
            result = await User.update_password(reset_request.username, new_password)
            if result.get("status") == "error":
                return result
            
            # Mark the reset request as completed
            query_executor = AsyncQueryExecutor()
            updated_date = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            
            query = """
                UPDATE reset_password_request 
                SET is_reset = 1, updated_date = %s
                WHERE id = %s
            """
            await query_executor.execute(query, (updated_date, request_id))
            
            return {
                "status": "success",
                "message": "Password reset completed successfully"
            }
            
        except Exception as e:
            return {
                "status": "error",
                "message": f"Error completing password reset: {str(e)}"
            }
    
    @staticmethod
    async def get_by_id(request_id):
        """
        Get a reset password request by ID
        
        Args:
            request_id (int): The ID of the reset request
            
        Returns:
            ResetPasswordRequest: The reset request object, or None if not found
        """
        query_executor = AsyncQueryExecutor()
        query = "SELECT * FROM reset_password_request WHERE id = %s"
        result = await query_executor.fetch_one(query, (request_id,))
        
        if result:
            return ResetPasswordRequest(
                id=result[0],
                username=result[1],
                email=result[2],
                name=result[3],
                is_reset=result[4],
                request_date=result[5],
                updated_date=result[6],
                is_user_details_correct=result[7]
            )
        return None
    
    @staticmethod
    async def get_by_username(username):
        """
        Get a reset password request by username
        
        Args:
            username (str): The username associated with the reset request
            
        Returns:
            ResetPasswordRequest: The reset request object, or None if not found
        """
        query_executor = AsyncQueryExecutor()
        query = "SELECT * FROM reset_password_request WHERE username = %s"
        result = await query_executor.fetch_one(query, (username,))
        
        if result:
            return ResetPasswordRequest(
                id=result[0],
                username=result[1],
                email=result[2],
                name=result[3],
                is_reset=result[4],
                request_date=result[5],
                updated_date=result[6],
                is_user_details_correct=result[7]
            )
        return None
    
    @staticmethod
    async def get_all_requests(username_filter=None):
        """
        Get all reset password requests with user ID and role information,
        with optional filtering by username
        
        Args:
            username_filter (str, optional): Filter requests by this username
            
        Returns:
            list: A list of ResetPasswordRequest objects with user details
        """
        query_executor = AsyncQueryExecutor()
        
        # Build the query based on whether there's a username filter
        if username_filter:
            query = """
                SELECT r.*, u.id as user_id, u.role as user_role 
                FROM reset_password_request r
                LEFT JOIN users u ON r.username = u.username
                WHERE r.username LIKE %s
                ORDER BY r.request_date DESC
            """
            results = await query_executor.fetch_all(query, (f"%{username_filter}%",))
        else:
            query = """
                SELECT r.*, u.id as user_id, u.role as user_role 
                FROM reset_password_request r
                LEFT JOIN users u ON r.username = u.username
                ORDER BY r.request_date DESC
            """
            results = await query_executor.fetch_all(query)
        
        reset_requests = []
        if results:
            for result in results:
                reset_request = ResetPasswordRequest(
                    id=result[0],
                    username=result[1],
                    email=result[2],
                    name=result[3],
                    is_reset=result[4],
                    request_date=result[5],
                    updated_date=result[6],
                    is_user_details_correct=result[7]
                )
                # Add user ID and role as additional attributes
                reset_request.user_id = result[8]  # user_id from the JOIN
                reset_request.user_role = result[9]  # user_role from the JOIN
                
                reset_requests.append(reset_request)
                
        return reset_requests 