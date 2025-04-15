
from flask import Blueprint

from controllers.disease_controller import DiseaseController


disease_bp = Blueprint('disease', __name__)

disease_bp.route('/all', methods=['GET'])(DiseaseController.get_all_diseases)