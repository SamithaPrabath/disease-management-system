from flask import Blueprint
from controllers.notification_controller import NotificationController

notification_bp = Blueprint('notification', __name__)

notification_bp.route('/all', methods=['GET'])(NotificationController.get_all_notifications)

notification_bp.route('/<int:notification_id>', methods=['GET'])(NotificationController.get_notification_by_id)

notification_bp.route('/create', methods=['POST'])(NotificationController.create_notification)

notification_bp.route('/update/<int:notification_id>', methods=['PUT'])(NotificationController.update_notification)

notification_bp.route('/delete/<int:notification_id>', methods=['DELETE'])(NotificationController.delete_notification)

# Additional routes for notification-specific operations
notification_bp.route('/user/<int:user_id>', methods=['GET'])(NotificationController.get_user_notifications)

notification_bp.route('/mark-read/<int:notification_id>', methods=['PUT'])(NotificationController.mark_notification_as_read) 