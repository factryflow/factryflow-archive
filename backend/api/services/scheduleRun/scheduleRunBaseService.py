from abc import ABC, abstractmethod


class SchduleRunBaseService(ABC):

    @abstractmethod
    def get_all_schedule_run(self):
        """ Abstract method to get all schedule run """
        pass

    @abstractmethod
    def create_schedule_run(self):
        """
        Abstract method to create schedule run
        """
        pass
    
    @abstractmethod
    def update_schedule_run(self):
        """
        Abstract method to update schedule run
        """
        pass
    
    @abstractmethod
    def get_schedule_run_details_by_id(self):
        """
        Abstract method to get schedule run details by id
        """
        pass
    
    @abstractmethod
    def delete_schedule_run(self):
        """
        Abstract method to delete schedule run
        """
        pass
    
    
