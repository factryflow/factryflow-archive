from abc import ABC, abstractmethod


class RoleBaseService(ABC):

    @abstractmethod
    def get_all_roles(self):
        """ Abstract method to get all roles """
        pass

    @abstractmethod
    def create(self):
        """
        Abstract method to create Role
        """
        pass

