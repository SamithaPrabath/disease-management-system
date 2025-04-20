from flask import Blueprint
from controllers.moh_controller import MOHController

moh_bp = Blueprint('moh', __name__)

moh_bp.route('/add', methods=['POST'])(MOHController.add_moh_user)
moh_bp.route('/getAll', methods=['GET'])(MOHController.get_moh_users)
moh_bp.route('/delete/<int:id>', methods=['DELETE'])(MOHController.delete_moh_user)
moh_bp.route('/update/<int:id>', methods=['PUT'])(MOHController.update_moh_user)