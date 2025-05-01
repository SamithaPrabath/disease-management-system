from dataclasses import dataclass
from datetime import datetime
from utils.db.query_executor import AsyncQueryExecutor

@dataclass
class Notification:
    id: int = None
    message: str = None
    sender: int = None
    receiver: int = None
    update_time: datetime = None
    is_read: bool = False
    title: str = None

    @staticmethod
    async def get_notification_by_id(id):
        query_executor = AsyncQueryExecutor()
        query = f"SELECT * FROM notifications WHERE id = {id}"
        result = await query_executor.fetch_one(query)
        return Notification(*result) if result else None

    @staticmethod
    async def get_all_notifications():
        query_executor = AsyncQueryExecutor()
        query = "SELECT * FROM notifications ORDER BY update_time DESC"
        results = await query_executor.fetch_all(query)
        return [Notification(*result) for result in results] if results else []

    @staticmethod
    async def create_notification(message, sender, receiver, title):
        query_executor = AsyncQueryExecutor()
        query = """
            INSERT INTO notifications (message, sender, receiver, update_time, is_read, title)
            VALUES (%s, %s, %s, %s, %s, %s)
        """
        await query_executor.execute(query, (message, sender, receiver, datetime.now(), False, title))
        
        # Get the last inserted ID
        query_executor1 = AsyncQueryExecutor()
        result = await query_executor1.fetch_one("SELECT id FROM notifications ORDER BY id DESC LIMIT 1")
        return result[0] if result else None

    @staticmethod
    async def update_notification(id, message=None, sender=None, receiver=None, is_read=None):
        query_executor = AsyncQueryExecutor()
        updates = []
        params = []
        
        if message is not None:
            updates.append("message = %s")
            params.append(message)
        if sender is not None:
            updates.append("sender = %s")
            params.append(sender)
        if receiver is not None:
            updates.append("receiver = %s")
            params.append(receiver)
        if is_read is not None:
            updates.append("is_read = %s")
            params.append(is_read)
            
        if not updates:
            return {"message": "No fields to update", "status": "error"}
            
        query = f"UPDATE notifications SET {', '.join(updates)} WHERE id = %s"
        params.append(id)
        
        await query_executor.execute(query, tuple(params))
        return {"message": "Notification updated successfully", "status": "success"}

    @staticmethod
    async def delete_notification(id):
        query_executor = AsyncQueryExecutor()
        query = "DELETE FROM notifications WHERE id = %s"
        await query_executor.execute(query, (id,))
        return {"message": "Notification deleted successfully", "status": "success"}

    @staticmethod
    async def get_user_notifications(user_id):
        query_executor = AsyncQueryExecutor()
        query = """
            SELECT * FROM notifications 
            WHERE receiver = %s 
            ORDER BY update_time DESC
        """
        results = await query_executor.fetch_all(query, (user_id,))
        return [Notification(*result) for result in results] if results else []

    @staticmethod
    async def mark_notification_as_read(id):
        query_executor = AsyncQueryExecutor()
        query = "UPDATE notifications SET is_read = true WHERE id = %s"
        await query_executor.execute(query, (id,))
        return {"message": "Notification marked as read", "status": "success"} 