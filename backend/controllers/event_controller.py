import asyncio
from flask import jsonify, request, url_for
from models.event import Event
from utils.upload import upload_file
from controllers.base_controller import BaseController

class EventController(BaseController):
    @staticmethod
    def create_event(phi_id):
        try:
            data = request.form
            image = request.files.get('image')
            
            if image:
                image_url = asyncio.run(upload_file(image))
            else:
                image_url = None

            event = Event(
                phi_id=phi_id,
                eventName=data.get('eventName'),
                startDate=data.get('startDate'),
                startTime=data.get('startTime'),
                location=data.get('location'),
                description=data.get('description'),
                image=image_url
            )

            result = asyncio.run(Event.create_event(event))
            return EventController.success_response(
                result
            )
        except Exception as e:
            return EventController.error_response(str(e), 500)

    @staticmethod
    def _convert_image_path_to_url(event_dict):
        """Convert image path to full URL"""
        if event_dict.get('image'):
            # Get the base URL from the request
            base_url = request.host_url.rstrip('/')
            # Combine base URL with image path
            event_dict['image'] = f"{base_url}/api{event_dict['image']}"
        return event_dict

    @staticmethod
    def get_all_events():
        try:
            events = asyncio.run(Event.get_all_events())
            events_data = []
            for event in events:
                event_dict = event.__dict__
                # Convert any datetime objects to strings
                for key, value in event_dict.items():
                    if hasattr(value, 'isoformat'):
                        event_dict[key] = value.isoformat()
                # Convert image path to URL
                event_dict = EventController._convert_image_path_to_url(event_dict)
                events_data.append(event_dict)
            
            return EventController.success_response(events_data)
        except Exception as e:
            return EventController.error_response(str(e), 500)

    @staticmethod
    def get_event_by_id(id):
        try:
            event = asyncio.run(Event.get_event_by_id(id))
            if event:
                event_dict = event.__dict__
                # Convert any datetime objects to strings
                for key, value in event_dict.items():
                    if hasattr(value, 'isoformat'):
                        event_dict[key] = value.isoformat()
                # Convert image path to URL
                event_dict = EventController._convert_image_path_to_url(event_dict)
                return EventController.success_response(event_dict)
            return EventController.error_response("Event not found", 404)
        except Exception as e:
            return EventController.error_response(str(e), 500)

    @staticmethod
    def get_events_by_phi_id(phi_id):
        try:
            events = asyncio.run(Event.get_events_by_phi_id(phi_id))
            events_data = []
            for event in events:
                event_dict = event.__dict__
                # Convert any datetime objects to strings
                for key, value in event_dict.items():
                    if hasattr(value, 'isoformat'):
                        event_dict[key] = value.isoformat()
                # Convert image path to URL
                event_dict = EventController._convert_image_path_to_url(event_dict)
                events_data.append(event_dict)
            
            return EventController.success_response(events_data)
        except Exception as e:
            print(e)
            return EventController.error_response(str(e), 500)

    @staticmethod
    def update_event(id):
        try:
            data = dict(request.form)
            image = request.files.get('image')
            
            if image:
                image_url = asyncio.run(upload_file(image))
                data['image'] = image_url

            result = asyncio.run(Event.update_event(id, data))
            return EventController.success_response(
                result
            )
        except Exception as e:
            return EventController.error_response(str(e), 500)

    @staticmethod
    def delete_event(id):
        try:
            result = asyncio.run(Event.delete_event(id))
            return EventController.success_response(
                result
            )
        except Exception as e:
            return EventController.error_response(str(e), 500) 