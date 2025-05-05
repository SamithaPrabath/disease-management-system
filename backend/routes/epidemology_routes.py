from flask import Blueprint
from controllers.epidemology_controller import EpidemologyController

epidemology_bp = Blueprint('epidemology', __name__)

epidemology_bp.route('/add', methods=['POST'])(EpidemologyController.add_epidemology_user)
epidemology_bp.route('/getAll', methods=['GET'])(EpidemologyController.get_epidemology_users)
epidemology_bp.route('/getUser/<int:id>', methods=['GET'])(EpidemologyController.get_epidemology_user)
epidemology_bp.route('/delete/<int:id>', methods=['DELETE'])(EpidemologyController.delete_epidemology_user)
epidemology_bp.route('/update/<int:id>', methods=['PUT'])(EpidemologyController.update_epidemology_user) 