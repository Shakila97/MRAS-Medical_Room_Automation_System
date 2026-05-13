"""
MRAS v3.0 — User model and UserRole enum (re-exported from modules/user.py).

The canonical definition lives in src/modules/user.py.
This module exists only so that 'from src.models.user import ...' works.
"""

# Re-export so all import paths resolve to the same SQLModel class instance,
# which prevents the "Table 'users' is already defined" error.
from src.modules.user import User, UserRole  # noqa: F401

__all__ = ["User", "UserRole"]

