import pytest
from unittest.mock import patch, MagicMock
from src.util.daos import getDao
from src.controllers.usercontroller import UserController as usercontroller

class TestEmailLogin:
#    @pytest.fixture
#    def dao_find():
#         yield DAO()

#     @pytest.fixture
#    def mock_response():
#         yield {
#             "email":email
#         }

#     @pytest.mark.namespaces
#     def test_email(self, mocker):
#         user = {"email":email}

#         mocked_user = mocker.patch("getDao", return_value=user)

#         email = "test@email.com"
        
#         result = usercontroller.get_user_by_email(email)
#         assert result is user
#         mocked_user.assert_called_once()

    @pytest.mark.namespaces
    def test_multiple_users(self, capsys):
        dao_mock = MagicMock()
        user_c = usercontroller(dao_mock)

        test_users = [
            {"name": "user_one", "email": "test@email.com"},
            {"name": "user_two", "email": "test@email.com"},
        ]

        user_c.dao.find.return_value = test_users
        result = user_c.get_user_by_email("test@email.com")
        captured = capsys.readouterr()

        assert result == test_users[0]
        assert "more than one user found" in captured.out.lower()