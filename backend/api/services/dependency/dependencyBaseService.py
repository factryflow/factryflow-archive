from abc import ABC, abstractmethod


class DependencyBaseService(ABC):

    @abstractmethod
    def get_all_dependency_types(self):
        """
        Abstract method to get all dependency types
        """
        pass

    @abstractmethod
    def create_dependency_types(self):
        """
        Abstract method to create dependency types
        """
        pass

    @abstractmethod
    def update_dependency_types(self):
        """
        Abstract method to create dependency types
        """
        pass
    
    
    @abstractmethod
    def delete_dependency_types(self):
        """
        Abstract method to create dependency types
        """
        pass
