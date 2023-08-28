from abc import ABC, abstractmethod


class UserBaseService(ABC):

    @abstractmethod
    def login(self):
        """ Abstarct method for User Log in """
        pass