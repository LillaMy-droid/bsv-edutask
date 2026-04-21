import pytest
from unittest.mock import patch, MagicMock

from src.util.daos import getDao
from src.controllers.usercontroller import UserController as usercontroller

class TestEmailLogin:
   
   @pytest.fixture
   def dao_find():
        yield DAO()

    @pytest.fixture
   def mock_response():
        yield {
            "email":email
        }

    @pytest.mark.namespaces
    def test_email(self, mocker):
        user = {"email":email}

        mocked_user = mocker.patch("getDao", return_value=user)

        email = "test@email.com"
        
        result = usercontroller.get_user_by_email(email)
        assert result is user
        mocked_user.assert_called_once()



    @pytest.mark.namespaces
    def test_multiple_users(self):
        thisdict = [
            {"user_one": "test@email.com"},
            {"user_two": "test@email.com"},
            {"user_three": "test@email.com"}
        ]
