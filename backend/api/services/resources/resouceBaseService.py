from abc import ABC, abstractmethod


class ResourceBaseService(ABC):

    @abstractmethod
    def get_all_resources(self):
        """ Abstract method to get all resources """
        pass

    @abstractmethod
    def create_resources(self):
        """
        Abstract method to create resources
        """
        pass
    
    @abstractmethod
    def update_resources(self):
        """
        Abstract method to update resources
        """
        pass

    @abstractmethod
    def delete_resources(self):
        """
        Abstract method to delete resources
        """
        pass
    
    @abstractmethod
    def get_resource_details_by_id(self):
        """
        Abstract method to get resource details by id
        """
        pass