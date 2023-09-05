from abc import ABC, abstractmethod


class AssignmentRuleBaseService(ABC):
    
    @abstractmethod
    def get_all_assignment_rule(self):
        """ Abstract method to get all assignment rule"""
        pass

    @abstractmethod
    def create_assignment_rule(self):
        """
        Abstract method to create assignment rule
        """
        pass
    
    @abstractmethod
    def update_assignment_rule(self):
        """
        Abstract method to update assignment rule
        """
        pass
    
    @abstractmethod
    def get_assignment_rule_by_id(self):
        """
        Abstract method to get assignment rule by id 
        """
        pass
    
    @abstractmethod
    def delete_assignment_rule(self):
        """
        Abstract method to delete assignment rule
        """
        pass
