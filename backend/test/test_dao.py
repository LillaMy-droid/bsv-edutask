import pytest
from unittest.mock import patch, MagicMock
from src.util.dao import DAO

class TestDAOCreate:

    @pytest.fixture
    def setup_dao(self):
        dao = DAO("test_edutask")
        dao.collection.delete_many({})  
        yield dao
        dao.collection.delete_many({})

    @pytest.mark.dao_create
    def test_insert_collection(self, setup_dao):
        result = setup_dao.create({"test": "test_dict"})
        # result = dao.create({"test": "test_dict"})
        assert result is not None
