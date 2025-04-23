from flask import request, jsonify
from models.doctor import Doctor
from controllers.base_controller import BaseController
import asyncio

class DoctorController(BaseController):
    
    def add_doctor(self):
        data = request.get_json()
        doctor = Doctor(
            name=data['name'],
            email=data['email'],
            phoneNumber=data['phoneNumber'],
            username=data['username'],
            password=data['password'],
            moh=data['moh'],
            area=data['area'],
            role=data['role'],
            institute_id=data['instituteId']
        )
        result = asyncio.run(Doctor.add_doctor_user(doctor))
        return jsonify(result), result.get('status', 200)

    def get_all_doctors(self):
        try:
            doctors = asyncio.run(Doctor.get_doctor_users())
            if not doctors:
                return DoctorController.error_response("No doctors found", 404)
            return DoctorController.success_response(doctors)
        except Exception as e:
            return DoctorController.error_response(str(e), 500)

    def update_doctor(self, doctor_id):
        try:
            data = request.get_json()
            result = asyncio.run(Doctor.update_doctor_user(doctor_id, data))
            if result.get('status') == 200:
                return DoctorController.success_response(result)
            return DoctorController.error_response(result.get('message', 'Failed to update doctor'), result.get('status', 400))
        except Exception as e:
            return DoctorController.error_response(str(e), 500)

    def delete_doctor(self, doctor_id):
        try:
            result = asyncio.run(Doctor.delete_doctor_user(doctor_id))
            if result.get('status') == 200:
                return DoctorController.success_response(result)
            return DoctorController.error_response(result.get('message', 'Failed to delete doctor'), result.get('status', 400))
        except Exception as e:
            return DoctorController.error_response(str(e), 500)

    