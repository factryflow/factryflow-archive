from abc import ABC, abstractmethod


class WeeklyShiftTemplateBaseService(ABC):

    @abstractmethod
    def get_all_weekly_shift_template(self):
        """ Abstract method to get all weekly_shift_template """
        pass

    @abstractmethod
    def create_weekly_shift_template(self):
        """
        Abstract method to create weekly_shift_template
        """
        pass
    
    @abstractmethod
    def update_weekly_shift_template(self):
        """
        Abstract method to update weekly_shift_template
        """
        pass
    
    @abstractmethod
    def get_weekly_shift_template_by_id(self):
        """
        Abstract method to get weekly_shift_template by id 
        """
        pass
    
    @abstractmethod
    def delete_weekly_shift_template(self):
        """
        Abstract method to delete weekly_shift_template
        """
        pass
    
    
    @abstractmethod
    def get_all_template_details(self):
        """ Abstract method to get all weekly_shift_template details """
        pass

    @abstractmethod
    def create_template_details(self):
        """
        Abstract method to create weekly_shift_template details
        """
        pass
    
    @abstractmethod
    def update_template_details(self):
        """
        Abstract method to update weekly_shift_template details
        """
        pass
    
    @abstractmethod
    def get_template_details_by_id(self):
        """
        Abstract method to get weekly_shift_template details by id 
        """
        pass
    
    @abstractmethod
    def delete_template_details(self):
        """
        Abstract method to delete weekly_shift_template details
        """
        pass
    
