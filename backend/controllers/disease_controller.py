import asyncio
from flask import request
from controllers.base_controller import BaseController
from models.disease import Disease


class DiseaseController(BaseController):
    @staticmethod
    def get_all_diseases():
        diseases = asyncio.run(Disease.get_all_diseases())

        if not diseases:
            return DiseaseController.error_response("No diseases found", 404)

        return DiseaseController.success_response(
            [disease for disease in diseases]
        )
    
    @staticmethod
    def update_disease(disease_id: int):
        try:
            data = request.get_json()
            if not data:
                return DiseaseController.error_response("No data provided", 400)
                
            name = data.get('diseaseName')
            category = data.get('category')
            mod_of_transmission = data.get('modeOfTransmission')
            description = data.get('description')
            
            asyncio.run(Disease.update_disease(
                disease_id=disease_id,
                name=name,
                category=category,
                mod_of_transmission=mod_of_transmission,
                description=description
            ))
            
            return DiseaseController.success_response({"message": "Disease updated successfully"})
        except Exception as e:
            return DiseaseController.error_response(str(e), 400)
    
    @staticmethod
    def create_disease():
        try:
            data = request.get_json()
            if not data:
                return DiseaseController.error_response("No data provided", 400)
                
            name = data.get('diseaseName')
            category = data.get('category')
            mod_of_transmission = data.get('modeOfTransmission')
            description = data.get('description')
            
            if not all([name, category, mod_of_transmission, description]):
                return DiseaseController.error_response("All fields are required", 400)
            
            result = asyncio.run(Disease.create_disease(
                name=name,
                category=category,
                mod_of_transmission=mod_of_transmission,
                description=description
            ))
               
            return DiseaseController.success_response(result)
        except Exception as e:
            return DiseaseController.error_response(str(e), 400)
    
    @staticmethod
    def delete_disease(disease_id: int):
        try:
            result = asyncio.run(Disease.delete_disease(disease_id))
            
            if result["status"] == "error":
                return DiseaseController.error_response(result["message"], 404)
                
            return DiseaseController.success_response(result)
        except Exception as e:
            return DiseaseController.error_response(str(e), 400)
    
