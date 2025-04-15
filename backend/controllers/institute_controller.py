import asyncio
from flask import jsonify
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