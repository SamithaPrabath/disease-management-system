from flask import Blueprint
from controllers.phi_controller import PHIController

phi_bp = Blueprint('phi', __name__)

phi_bp.route('/add', methods=['POST'])(PHIController.add_phi_user)
phi_bp.route('/getAll', methods=['GET'])(PHIController.get_phi_users)
phi_bp.route('/delete/<int:id>', methods=['DELETE'])(PHIController.delete_phi_user)
phi_bp.route('/update/<int:id>', methods=['PUT'])(PHIController.update_phi_user)

