import asyncio
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
    
