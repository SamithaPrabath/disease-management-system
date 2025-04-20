from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.doctor import Doctor
from controllers.base_controller import BaseController

class DoctorController(BaseController):
    @jwt_required()
    async def add_doctor(self):
        data = request.get_json()
        doctor = Doctor(
            specialization=data.get('specialization'),
            email=data.get('email'),
            hospital=data.get('hospital'),
            password=data.get('password'),
            name=data.get('name'),
            phoneNumber=data.get('phoneNumber'),
            username=data.get('username'),
            license_number=data.get('license_number')
        )
        result = await Doctor.add_doctor_user(doctor)
        return jsonify(result), result.get('status', 200)

    @jwt_required()
    async def get_doctors(self):
        doctors = await Doctor.get_doctor_users()
        return jsonify(doctors), 200

    @jwt_required()
    async def get_doctor(self, id):
        doctor = await Doctor.get_doctor_user_by_id(id)
        if doctor:
            return jsonify(doctor.__dict__), 200
        return jsonify({"message": "Doctor not found"}), 404

    @jwt_required()
    async def update_doctor(self, id):
        data = request.get_json()
        result = await Doctor.update_doctor_user(id, data)
        return jsonify(result), result.get('status', 200)

    @jwt_required()
    async def delete_doctor(self, id):
        result = await Doctor.delete_doctor_user(id)
        return jsonify(result), result.get('status', 200)

    @jwt_required()
    async def get_phi_referrals(self):
        current_user_id = get_jwt_identity()
        referrals = await Doctor.get_referrals_by_phi(current_user_id)
        return jsonify(referrals), 200

    @jwt_required()
    async def accept_referral(self, referral_id):
        current_user_id = get_jwt_identity()
        result = await Doctor.accept_referral(referral_id, current_user_id)
        return jsonify(result), result.get('status', 200) 