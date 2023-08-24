from abc import ABC, abstractmethod


class TaskBaseService(ABC):

    @abstractmethod
    def get_all_tasks(self):
        """ Abstract method to get all tasks """
        pass

    @abstractmethod
    def create_tasks(self):
        """
        Abstract method to create tasks
        """
        pass

    @abstractmethod
    def update_tasks(self):
        """
        Abstract method to create tasks
        """
        pass
    
    @abstractmethod
    def get_task_details_by_id(self):
        """
        Abstract method to create tasks
        """
        pass
    
    @abstractmethod
    def delete_tasks(self):
        """
        Abstract method to create tasks
        """
        pass
