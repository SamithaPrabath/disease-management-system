import asyncio
from flask import jsonify, request
from models.notification import Notification

class NotificationController:
    @staticmethod
    def get_all_notifications():
        try:
            notifications = asyncio.run(Notification.get_all_notifications())
            return jsonify({
                "status": "success",
                "data": notifications
            }), 200
        except Exception as e:
            return jsonify({
                "status": "error",
                "message": str(e)
            }), 500

    @staticmethod
    def get_notification_by_id(notification_id):
        try:
            notification = asyncio.run(Notification.get_notification_by_id(notification_id))
            if not notification:
                return jsonify({
                    "status": "error",
                    "message": "Notification not found"
                }), 404
            return jsonify({
                "status": "success",
                "data": notification
            }), 200
        except Exception as e:
            return jsonify({
                "status": "error",
                "message": str(e)
            }), 500

    @staticmethod
    def create_notification():
        try:
            data = request.get_json()
            required_fields = ['message', 'sender', 'receiver']
            
            # Validate required fields
            for field in required_fields:
                if field not in data:
                    return jsonify({
                        "status": "error",
                        "message": f"Missing required field: {field}"
                    }), 400

            # Create the notification
            notification_id = asyncio.run(Notification.create_notification(
                message=data['message'],
                sender=data['sender'],
                receiver=data['receiver']
            ))

            return jsonify({
                "status": "success",
                "message": "Notification created successfully",
                "data": {"id": notification_id}
            }), 201

        except Exception as e:
            return jsonify({
                "status": "error",
                "message": str(e)
            }), 500

    @staticmethod
    def update_notification(notification_id):
        try:
            data = request.get_json()
            
            # Check if notification exists
            notification = asyncio.run(Notification.get_notification_by_id(notification_id))
            if not notification:
                return jsonify({
                    "status": "error",
                    "message": "Notification not found"
                }), 404

            # Update the notification
            result = asyncio.run(Notification.update_notification(
                id=notification_id,
                message=data.get('message'),
                sender=data.get('sender'),
                receiver=data.get('receiver'),
                is_read=data.get('is_read')
            ))

            if result["status"] == "error":
                return jsonify(result), 400

            return jsonify({
                "status": "success",
                "message": "Notification updated successfully"
            }), 200

        except Exception as e:
            return jsonify({
                "status": "error",
                "message": str(e)
            }), 500

    @staticmethod
    def delete_notification(notification_id):
        try:
            # Check if notification exists
            notification = asyncio.run(Notification.get_notification_by_id(notification_id))
            if not notification:
                return jsonify({
                    "status": "error",
                    "message": "Notification not found"
                }), 404

            # Delete the notification
            result = asyncio.run(Notification.delete_notification(notification_id))

            return jsonify({
                "status": "success",
                "message": "Notification deleted successfully"
            }), 200

        except Exception as e:
            return jsonify({
                "status": "error",
                "message": str(e)
            }), 500

    @staticmethod
    def get_user_notifications(user_id):
        try:
            notifications = asyncio.run(Notification.get_user_notifications(user_id))
            return jsonify({
                "status": "success",
                "data": notifications
            }), 200
        except Exception as e:
            return jsonify({
                "status": "error",
                "message": str(e)
            }), 500

    @staticmethod
    def mark_notification_as_read(notification_id):
        try:
            # Check if notification exists
            notification = asyncio.run(Notification.get_notification_by_id(notification_id))
            if not notification:
                return jsonify({
                    "status": "error",
                    "message": "Notification not found"
                }), 404

            # Mark notification as read
            result = asyncio.run(Notification.mark_notification_as_read(notification_id))

            return jsonify({
                "status": "success",
                "message": "Notification marked as read"
            }), 200

        except Exception as e:
            return jsonify({
                "status": "error",
                "message": str(e)
            }), 500 