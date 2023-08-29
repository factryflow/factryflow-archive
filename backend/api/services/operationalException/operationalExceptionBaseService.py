from abc import ABC, abstractmethod


class OperationalExceptionBaseService(ABC):

    @abstractmethod
    def get_all_exception_types(self):
        """ Abstract method to get all exception type """
        pass

    @abstractmethod
    def create_exception_types(self):
        """
        Abstract method to create exception type
        """
        pass
    
    @abstractmethod
    def update_exception_types(self):
        """
        Abstract method to update exception type
        """
        pass
    
    @abstractmethod
    def get_exception_type_by_id(self):
        """
        Abstract method to get exception type 
        """
        pass
    
    @abstractmethod
    def delete_exception_types(self):
        """
        Abstract method to delete exception type
        """
        pass
    
