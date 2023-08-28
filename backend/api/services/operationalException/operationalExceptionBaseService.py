from abc import ABC, abstractmethod


class OperationalExceptionBaseService(ABC):

    @abstractmethod
    def get_all_exception_types(self):
        """ Abstract method to get all jobs """
        pass

    @abstractmethod
    def create_jobs(self):
        """
        Abstract method to create jobs
        """
        pass
    
