from .auth_routes import auth_bp
from .case_routes import case_bp
from .phi_routes import phi_bp
from .moh_routes import moh_bp
from .disease_routes import disease_bp
from .institute_routes import institute_bp
from .doctor_routes import doctor_bp


__all__ = ['auth_bp', 'case_bp', 'phi_bp', 'moh_bp', 'disease_bp', 'institute_bp', 'doctor_bp'] 