from flask import Blueprint

from controllers.disease_controller import DiseaseController


disease_bp = Blueprint('disease', __name__)

disease_bp.route('/all', methods=['GET'])(DiseaseController.get_all_diseases)
disease_bp.route('/update/<int:disease_id>', methods=['PUT'])(DiseaseController.update_disease)
disease_bp.route('/create', methods=['POST'])(DiseaseController.create_disease)
disease_bp.route('/delete/<int:disease_id>', methods=['DELETE'])(DiseaseController.delete_disease)