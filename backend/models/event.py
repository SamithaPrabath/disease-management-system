from dataclasses import dataclass
from datetime import datetime
from utils.db.query_executor import AsyncQueryExecutor

@dataclass
class Event():
    id: int = None
    phi_id: int = None
    eventName: str = None
    startDate: str = None
    startTime: str = None
    location: str = None
    description: str = None
    image: str = None

    @staticmethod
    async def create_event(event):
        query_executor = AsyncQueryExecutor()
        query = """
            INSERT INTO events (phi_id, eventName, startDate, startTime, location, description, image)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        """
        await query_executor.execute(query, (
            event.phi_id,
            event.eventName,
            event.startDate,
            event.startTime,
            event.location,
            event.description,
            event.image
        ))
        return {"message": "Event created successfully", "status": 200}

    @staticmethod
    async def get_all_events():
        query_executor = AsyncQueryExecutor()
        query = "SELECT * FROM events ORDER BY startDate DESC, startTime DESC"
        result = await query_executor.fetch_all(query)
        
        if result:
            return [Event(*event) for event in result]
        return []

    @staticmethod
    async def get_event_by_id(id):
        query_executor = AsyncQueryExecutor()
        query = "SELECT * FROM events WHERE id = %s"
        result = await query_executor.fetch_one(query, (id,))
        
        if result:
            return Event(*result)
        return None

    @staticmethod
    async def get_events_by_phi_id(phi_id):
        query_executor = AsyncQueryExecutor()
        if phi_id:
            query = "SELECT * FROM events WHERE phi_id = %s ORDER BY startDate DESC, startTime DESC"
            result = await query_executor.fetch_all(query, (phi_id,))
        else:
            query = "SELECT * FROM events ORDER BY startDate DESC, startTime DESC"
            result = await query_executor.fetch_all(query)
        
        if result:
            return [Event(*event) for event in result]
        return []

    @staticmethod
    async def update_event(id, data):
        query_executor = AsyncQueryExecutor()
        
        # Get current event data
        current_event = await Event.get_event_by_id(id)
        if not current_event:
            return {"message": "Event not found", "status": 404}
        
        # Prepare update query and values
        update_fields = []
        values = []
        
        # Check each field and only update if provided
        if 'eventName' in data:
            update_fields.append("eventName = %s")
            values.append(data.get('eventName'))
        
        if 'startDate' in data:
            update_fields.append("startDate = %s")
            values.append(data.get('startDate'))
        
        if 'startTime' in data:
            update_fields.append("startTime = %s")
            values.append(data.get('startTime'))
        
        if 'location' in data:
            update_fields.append("location = %s")
            values.append(data.get('location'))
        
        if 'description' in data:
            update_fields.append("description = %s")
            values.append(data.get('description'))
        
        if 'image' in data:
            update_fields.append("image = %s")
            values.append(data.get('image'))
        
        # If no fields to update, return
        if not update_fields:
            return {"message": "No fields to update", "status": 400}
        
        # Add id to values
        values.append(id)
        
        # Build and execute update query
        query = f"""
            UPDATE events 
            SET {', '.join(update_fields)}
            WHERE id = %s
        """
        
        await query_executor.execute(query, tuple(values))
        return {"message": "Event updated successfully", "status": 200}

    @staticmethod
    async def delete_event(id):
        query_executor = AsyncQueryExecutor()
        query = "DELETE FROM events WHERE id = %s"
        await query_executor.execute(query, (id,))
        return {"message": "Event deleted successfully", "status": 200} 