import pytest
from unittest.mock import patch, MagicMock

from src.util.daos import getDao
from src.controllers.usercontroller import UserController

class TestEmailLogin:
    @pytest.mark.namespaces
    def test_email(self):
        