from api.models import Jobs, TasksResourceAssignment, AssignmentRule
from api.serializers.assignmentRule import *
from api.serializers.taskResourceAssignment import *
from rest_framework import status
from api.utils.messages.commonMessages import *
from api.utils.messages.assignmentRuleMessages import *
from .assignmentRuleBaseService import AssignmentRuleBaseService


class AssignmentRuleService(AssignmentRuleBaseService):
    """
    Create, Retrieve, Update or Delete a assignment rule instance and Return all assignment rule.
    """

    def __init__(self):
        pass

    def get_all_assignment_rule(self, request, format=None):
        """
        Retun all the assignment rule
        """
        assignmnet_obj = AssignmentRule.objects.all()
        serializer = GetAssignmentRuleDetailsSerializer(assignmnet_obj, many=True)
        return ({"data": serializer.data, "code": status.HTTP_200_OK, "message": OK})

    def create_assignment_rule(self, request, format=None):
        """
        Create New assignment rule
        """
        serializer = CreateUpdateAssignmentRuleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            assignmnet_obj = AssignmentRule.objects.get(id=serializer.data["id"])
            serializer = GetAssignmentRuleDetailsSerializer(assignmnet_obj)
            return ({"data": serializer.data, "code": status.HTTP_201_CREATED, "message": ASSIGNMENT_RULE_CREATED})

        return ({"data": serializer.errors, "code": status.HTTP_400_BAD_REQUEST, "message": BAD_REQUEST})

    def update_assignment_rule(self, request, id, format=None):
        """
        Update assignment rule details
        """
        try:
            assignmnet_obj = AssignmentRule.objects.get(id=id)
            serializer = CreateUpdateAssignmentRuleSerializer(assignmnet_obj, data=request.data)
            if serializer.is_valid():
                serializer.save()
                serializer = GetAssignmentRuleDetailsSerializer(assignmnet_obj)
                return ({"data": serializer.data, "code": status.HTTP_201_CREATED, "message": ASSIGNMENT_RULE_UPDATED})

            return ({"data": serializer.errors, "code": status.HTTP_400_BAD_REQUEST, "message": BAD_REQUEST})
        except AssignmentRule.DoesNotExist:
            return({"data":None, "code":status.HTTP_400_BAD_REQUEST, "message":RECORD_NOT_FOUND})
        
        
    def get_assignment_rule_by_id(self, request, id, format=None):
        """
        Get assignment rule details by id
        """
        try:
            assignmnet_obj = AssignmentRule.objects.get(id=id)
            serializer = GetAssignmentRuleDetailsSerializer(assignmnet_obj)
            return({"data":serializer.data, "code":status.HTTP_200_OK, "message":OK})
        except AssignmentRule.DoesNotExist:
            return({"data":None, "code":status.HTTP_400_BAD_REQUEST, "message":RECORD_NOT_FOUND})
        
    
    def delete_assignment_rule(self, request, id, format=None):
        """
        delete assignment rule details
        """
        try:
            assignmnet_obj = AssignmentRule.objects.get(id=id)
            assignmnet_obj.is_deleted = True
            assignmnet_obj.save()
            return({"data":None, "code":status.HTTP_200_OK, "message":ASSIGNMENT_RULE_DELETED})
        except AssignmentRule.DoesNotExist:
            return({"data":None, "code":status.HTTP_400_BAD_REQUEST, "message":RECORD_NOT_FOUND})
        
    
    def create_task_resource_assignment(self, request, format=None):
        """Task Resource Assignment"""
        serializer = CreateUpdateTaskResourceAssignmentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            task_obj = TasksResourceAssignment.objects.get(id=serializer.data["id"])
            serializer = GetTaskResourceAssignmentDetailsSerializer(task_obj)
            return ({"data": serializer.data, "code": status.HTTP_201_CREATED, "message": TASK_RESOURCE_ASSIGNMENT_CREATED})
        return ({"data": serializer.errors, "code": status.HTTP_400_BAD_REQUEST, "message": BAD_REQUEST})
    
    
    def update_task_resource_assignment(self, request, id, format=None):
        """
        Update task resource assignment
        """
        try:
            task_obj = TasksResourceAssignment.objects.get(id=id)
            serializer = CreateUpdateTaskResourceAssignmentSerializer(task_obj, data=request.data)
            if serializer.is_valid():
                serializer.save()
                serializer = GetTaskResourceAssignmentDetailsSerializer(task_obj)
                return ({"data": serializer.data, "code": status.HTTP_201_CREATED, "message": TASK_RESOURCE_ASSIGNMENT_UPDATED})
            return ({"data": serializer.errors, "code": status.HTTP_400_BAD_REQUEST, "message": BAD_REQUEST})
        except TasksResourceAssignment.DoesNotExist:
            return({"data":None, "code":status.HTTP_400_BAD_REQUEST, "message":RECORD_NOT_FOUND})
        
    def get_task_resource_assignment_by_id(self, request, id, format=None):
        """
        get task resource assignment by id
        """
        try:
            task_obj = TasksResourceAssignment.objects.get(id=id)
            serializer = GetTaskResourceAssignmentDetailsSerializer(task_obj)
            return ({"data": serializer.data, "code": status.HTTP_200_OK, "message": OK})
        except TasksResourceAssignment.DoesNotExist:
            return({"data":None, "code":status.HTTP_400_BAD_REQUEST, "message":RECORD_NOT_FOUND})
        
    
    def get_all_task_resource_assignment(self, request, format=None):
        """
        Retun all the task_resource_assignment
        """
        task_obj = TasksResourceAssignment.objects.all()
        serializer = GetTaskResourceAssignmentDetailsSerializer(task_obj, many=True)
        return ({"data": serializer.data, "code": status.HTTP_200_OK, "message": OK})
    
    
    def delete_task_resource_assignment(self, request, id, format=None):
        """
        delete task_resource_assignment details
        """
        try:
            task_obj = TasksResourceAssignment.objects.get(id=id)
            task_obj.is_deleted = True
            task_obj.save()
            return({"data":None, "code":status.HTTP_200_OK, "message":TASK_RESOURCE_ASSIGNMENT_DELETED})
        except AssignmentRule.DoesNotExist:
            return({"data":None, "code":status.HTTP_400_BAD_REQUEST, "message":RECORD_NOT_FOUND})
        


    def create_assignment_rule_criteria(self, request, format=None):
        """Create assignment rule criteria"""
        serializer = CreateUpdateAssignmentRuleCriteriaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            assignment_rule_criteria_obj = AssignmentRuleCriteria.objects.get(id=serializer.data["id"])
            serializer = GetAssignmentRuleCriteriaDetailsSerializer(assignment_rule_criteria_obj)
            return ({"data": serializer.data, "code": status.HTTP_201_CREATED, "message": ASSINGMENT_RULE_CRITERIA_CREATED})
        return ({"data": serializer.errors, "code": status.HTTP_400_BAD_REQUEST, "message": BAD_REQUEST})
    
    
    def update_assignment_rule_criteria(self, request, id, format=None):
        """
        Update assignment rule criteria
        """
        try:
            assignment_rule_criteria_obj = AssignmentRuleCriteria.objects.get(id=id)
            serializer = CreateUpdateAssignmentRuleCriteriaSerializer(assignment_rule_criteria_obj, data=request.data)
            if serializer.is_valid():
                serializer.save()
                serializer = GetAssignmentRuleCriteriaDetailsSerializer(assignment_rule_criteria_obj)
                return ({"data": serializer.data, "code": status.HTTP_201_CREATED, "message": ASSINGMENT_RULE_CRITERIA_UPDATED})
            return ({"data": serializer.errors, "code": status.HTTP_400_BAD_REQUEST, "message": BAD_REQUEST})
        except AssignmentRuleCriteria.DoesNotExist:
            return({"data":None, "code":status.HTTP_400_BAD_REQUEST, "message":RECORD_NOT_FOUND})
        
    def get_assignment_rule_criteria_by_id(self, request, id, format=None):
        """
        get assignment rule criteria by id
        """
        try:
            assignment_rule_criteria_obj = AssignmentRuleCriteria.objects.get(id=id)
            serializer = GetAssignmentRuleCriteriaDetailsSerializer(assignment_rule_criteria_obj)
            return ({"data": serializer.data, "code": status.HTTP_200_OK, "message": OK})
        except AssignmentRuleCriteria.DoesNotExist:
            return({"data":None, "code":status.HTTP_400_BAD_REQUEST, "message":RECORD_NOT_FOUND})
        
    
    def get_all_assignment_rule_criteria(self, request, format=None):
        """
        Retun all the assignment rule criteria
        """
        assignment_rule_criteria_obj = AssignmentRuleCriteria.objects.all()
        serializer = GetAssignmentRuleCriteriaDetailsSerializer(assignment_rule_criteria_obj, many=True)
        return ({"data": serializer.data, "code": status.HTTP_200_OK, "message": OK})
    
    
    def delete_assignment_rule_criteria(self, request, id, format=None):
        """
        delete assignment rule criteria details
        """
        try:
            assignment_rule_criteria_obj = AssignmentRuleCriteria.objects.get(id=id)
            assignment_rule_criteria_obj.is_deleted = True
            assignment_rule_criteria_obj.save()
            return({"data":None, "code":status.HTTP_200_OK, "message":ASSINGMENT_RULE_CRITERIA_DELETED})
        except AssignmentRuleCriteria.DoesNotExist:
            return({"data":None, "code":status.HTTP_400_BAD_REQUEST, "message":RECORD_NOT_FOUND})
        
    #assignment rule resource group
    
    def create_assignment_rule_criteria(self, request, format=None):
        """Create assignment rule criteria"""
        serializer = CreateUpdateAssignmentRuleResourceGroupSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            assignment_resource_obj = AssignmentRuleResourceGroup.objects.get(id=serializer.data["id"])
            serializer = GetAssignmentRuleResourceGroupDetailsSerializer(assignment_resource_obj)
            return ({"data": serializer.data, "code": status.HTTP_201_CREATED, "message": ASSINGMENT_RULE_CRITERIA_CREATED})
        return ({"data": serializer.errors, "code": status.HTTP_400_BAD_REQUEST, "message": BAD_REQUEST})
    
    
    def update_assignment_rule_criteria(self, request, id, format=None):
        """
        Update assignment rule criteria
        """
        try:
            assignment_resource_obj = AssignmentRuleResourceGroup.objects.get(id=id)
            serializer = CreateUpdateAssignmentRuleResourceGroupSerializer(assignment_resource_obj, data=request.data)
            if serializer.is_valid():
                serializer.save()
                serializer = GetAssignmentRuleResourceGroupDetailsSerializer(assignment_resource_obj)
                return ({"data": serializer.data, "code": status.HTTP_201_CREATED, "message": ASSINGMENT_RULE_CRITERIA_UPDATED})
            return ({"data": serializer.errors, "code": status.HTTP_400_BAD_REQUEST, "message": BAD_REQUEST})
        except AssignmentRuleResourceGroup.DoesNotExist:
            return({"data":None, "code":status.HTTP_400_BAD_REQUEST, "message":RECORD_NOT_FOUND})
        
    def get_assignment_rule_criteria_by_id(self, request, id, format=None):
        """
        get assignment rule criteria by id
        """
        try:
            assignment_resource_obj = AssignmentRuleResourceGroup.objects.get(id=id)
            serializer = GetAssignmentRuleResourceGroupDetailsSerializer(assignment_resource_obj)
            return ({"data": serializer.data, "code": status.HTTP_200_OK, "message": OK})
        except AssignmentRuleResourceGroup.DoesNotExist:
            return({"data":None, "code":status.HTTP_400_BAD_REQUEST, "message":RECORD_NOT_FOUND})
        
    
    def get_all_assignment_rule_criteria(self, request, format=None):
        """
        Retun all the assignment rule criteria
        """
        assignment_resource_obj = AssignmentRuleResourceGroup.objects.all()
        serializer = GetAssignmentRuleResourceGroupDetailsSerializer(assignment_resource_obj, many=True)
        return ({"data": serializer.data, "code": status.HTTP_200_OK, "message": OK})
    
    
    def delete_assignment_rule_criteria(self, request, id, format=None):
        """
        delete assignment rule criteria details
        """
        try:
            assignment_resource_obj = AssignmentRuleResourceGroup.objects.get(id=id)
            assignment_resource_obj.is_deleted = True
            assignment_resource_obj.save()
            return({"data":None, "code":status.HTTP_200_OK, "message":ASSINGMENT_RULE_CRITERIA_DELETED})
        except AssignmentRuleResourceGroup.DoesNotExist:
            return({"data":None, "code":status.HTTP_400_BAD_REQUEST, "message":RECORD_NOT_FOUND})