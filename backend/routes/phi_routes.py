from flask import Blueprint
from controllers.phi_controller import PHIController

phi_bp = Blueprint('phi', __name__)

phi_bp.route('/', methods=['GET'])(PHIController.get_phis)
phi_bp.route('/assign', methods=['POST'])(PHIController.assign_case) 