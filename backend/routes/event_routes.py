from flask import Blueprint
from controllers.event_controller import EventController

event_bp = Blueprint('events', __name__)

event_bp.route('/add-event/<int:phi_id>', methods=['POST'])(EventController.create_event)

event_bp.route('/events', methods=['GET'])(EventController.get_all_events)

event_bp.route('/get-event/<int:id>', methods=['GET'])(EventController.get_event_by_id)

event_bp.route('/get-events/phi/<int:phi_id>', methods=['GET'])(EventController.get_events_by_phi_id)

event_bp.route('/update-event/<int:id>', methods=['PUT'])(EventController.update_event)

event_bp.route('/delete-event/<int:id>', methods=['DELETE'])(EventController.delete_event)
