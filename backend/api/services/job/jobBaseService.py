from abc import ABC, abstractmethod


class JobBaseService(ABC):

    @abstractmethod
    def get_all_jobs(self):
        """ Abstract method to get all jobs """
        pass

    @abstractmethod
    def create_jobs(self):
        """
        Abstract method to create jobs
        """
        pass
    
