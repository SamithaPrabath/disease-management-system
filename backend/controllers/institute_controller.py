import asyncio
from flask import jsonify, request
from models.institute import Institute

class InstituteController:
    @staticmethod
    def get_all_institutes():
        try:
            institutes = asyncio.run(Institute.get_all_institutes())
            return jsonify({
                "status": "success",
                "data": institutes
            }), 200
        except Exception as e:
            return jsonify({
                "status": "error",
                "message": str(e)
            }), 500

    @staticmethod
    def get_institute_by_id(institute_id):
        try:
            institute = asyncio.run(Institute.get_institute_by_id(institute_id))
            if not institute:
                return jsonify({
                    "status": "error",
                    "message": "Institute not found"
                }), 404
            return jsonify({
                "status": "success",
                "data": institute
            }), 200
        except Exception as e:
            return jsonify({
                "status": "error",
                "message": str(e)
            }), 500

    @staticmethod
    def create_institute():
        try:
            data = request.get_json()
            required_fields = ['name', 'registrationNumber', 'email', 'phone', 'address', 'city', 'province']
            
            # Validate required fields
            for field in required_fields:
                if field not in data:
                    return jsonify({
                        "status": "error",
                        "message": f"Missing required field: {field}"
                    }), 400

            # Create the institute
            institute_id = asyncio.run(Institute.create_institute(
                name=data['name'],
                registration_number=data['registrationNumber'],
                email=data['email'],
                phone_number=data['phone'],
                address=data['address'],
                city=data['city'],
                province=data['province']
            ))

            return jsonify({
                "status": "success",
                "message": "Institute created successfully",
            }), 200

        except Exception as e:
            return jsonify({
                "status": "error",
                "message": str(e)
            }), 500

    @staticmethod
    def update_institute(institute_id):
        try:
            data = request.get_json()
            
            # Check if institute exists
            institute = asyncio.run(Institute.get_institute_by_id(institute_id))
            if not institute:
                return jsonify({
                    "status": "error",
                    "message": "Institute not found"
                }), 404

            # Update the institute
            result = asyncio.run(Institute.update_institute(
                id=institute_id,
                name=data.get('name'),
                email=data.get('email'),
                phone_number=data.get('phone'),
                address=data.get('address'),
                city=data.get('city'),
                province=data.get('province')
            ))

            if result["status"] == "error":
                return jsonify(result), 400

            return jsonify({
                "status": "success",
                "message": "Institute updated successfully"
            }), 200

        except Exception as e:
            return jsonify({
                "status": "error",
                "message": str(e)
            }), 500

    @staticmethod
    def delete_institute(institute_id):
        try:
            # Check if institute exists
            institute = asyncio.run(Institute.get_institute_by_id(institute_id))
            if not institute:
                return jsonify({
                    "status": "error",
                    "message": "Institute not found"
                }), 404

            # Delete the institute
            result = asyncio.run(Institute.delete_institute(institute_id))

            return jsonify({
                "status": "success",
                "message": "Institute deleted successfully"
            }), 200

        except Exception as e:
            return jsonify({
                "status": "error",
                "message": str(e)
            }), 500 