from django.urls import path
from .views import *

app_name = 'api'

urlpatterns = [
    
    path('auth/login/', LoginView.as_view(), name='login'),
    path('auth/logout/', LogoutView.as_view(), name='logout'),
    path('auth/sign-up/', SignupView.as_view(), name='auth-sign-up'),
        
    #Change-Password
    path('user/change-password/',ChangePasswordView.as_view(), name="update-password"),

    #Profile
    path('user/get-user-details-by-token/',GetUserDetialsByTokenView.as_view(), name="get-user-details-by-token"),
   
    #role
    path('roles/', RoleCreateListView.as_view(), name="get-or-create-role"),
    
    #jobs
    path('jobs/', JobCreateListView.as_view(), name="jobs"),
    path('jobs/<int:id>/', GetUpdateDeleteJobView.as_view(), name="get-update-delete-jobs"),
    path('search-jobs/', SearchJobView.as_view(), name="search-job"),
    path('jobs-types/', JobTypesListView.as_view(), name='get-all-job-types'),
    path('jobs-status/', JobTypesListView.as_view(), name='get-all-job-status'),
    

    #tasks
    path('tasks/', TaskCreateListView.as_view(), name="tasks"),
    path('tasks/<int:id>/', GetUpdateDeleteTasksView.as_view(), name="get-update-delete-tasks"),
    path('tasks-types/', GetTaskTypesView.as_view(), name='get-all-task-types'),
    path('tasks-status/', GetTaskStatusView.as_view(), name='get-all-task-status'),
    
    
    #dependency-Types
    path('dependency-types/', DependencyTypesCreateListView.as_view(), name="dependency-types"),
    path('dependency-types/<int:id>/', UpdateDeleteDependencyTypesView.as_view(), name="update--delete-dependency-types"),
    
    
    #dependency
    path('dependency/', CreateListDependencyView.as_view(), name="dependency"),
    path('dependency/<int:id>/', GetUpdateDeleteDependencyIdView.as_view(), name="get-update-delete-dependency"),
    path('dependency-status/', GetDependencyStatusDetails.as_view(), name="get-dependency-status-list"),
    
    #Resources
    path('resources/', GetCreateResourcesView.as_view(), name="resources"),
    path('resources/<int:id>/', GetUpdateDeleteResourcesView.as_view(), name="get-update-delete-resources"),

    
    #Resources-Group
    path('resource-groups/', ResourcesGroupsCreateListView.as_view(), name="resources-groups"),
    path('resource-groups/<int:id>/', GetUpdateDeleteResourceGroupsView.as_view(), name="Get-update-delete-resources-group"),


    #operation exception type
    path('operational-exception-types/', GetCreateOperationalExceptionTypeView.as_view(), name="operational-exception-types"),
    path('operational-exception/<int:id>/', GetUpdateDeleteOperationalExceptionTypeView.as_view(), name="Get-update-delete-operational-exception-type"),
    
    #operation exception
    path('operational-exception/create-exception/', CreateOperationalExceptionView.as_view(), name="create-operational-exception"),
    path('operational-exception/update-exception/<int:id>/', UpdateOperationalExceptionView.as_view(), name="update-operational-exception"),
    path('operational-exception/get-exception-details/<int:id>/', GetOperationalExceptionDetailsView.as_view(), name="get-operational-exception-details"),
    path('operational-exception/delete-exception/<int:id>/', DeleteOperationalExceptionByIdView.as_view(), name="delete-operational-exception"),
    path('operational-exception/get-exception-list/', GetOperationalExceptionListView.as_view(), name="get-operational-exception-list"),
    
    #weekly shift template
    path('weekly-shift/create-template/', CreateWeeklyShiftTemplateView.as_view(), name="create-weekly-shift"),
    path('weekly-shift/update-template/<int:id>/', UpdateWeeklyShiftTemplateView.as_view(), name="update-weekly-shift"),
    path('weekly-shift/get-template-by-id/<int:id>/', GetWeeklyShiftTemplateView.as_view(), name="get-weekly-shift-details"),
    path('weekly-shift/delete-template/<int:id>/', DeleteWeeklyShiftTemplateView.as_view(), name="delete-weekly-shift"),
    path('weekly-shift/get-template-list/', WeeklyShiftTemplateListView.as_view(), name="get-weekly-shift-list"),
    
    #weekly shift template details
    path('weekly-shift-template/create-details/', CreateTemplateDetailsView.as_view(), name="create-weekly-shift-details"),
    path('weekly-shift-template/update-details/<int:id>/', UpdateTemplateDetailsView.as_view(), name="update-weekly-shift-details"),
    path('weekly-shift-template/get-details/<int:id>/', GetTemplateDetailsView.as_view(), name="get-weekly-shift-details"),
    path('weekly-shift-template/delete-details/<int:id>/', DeleteTemplateDetailsView.as_view(), name="delete-weekly-shift-details"),
    path('weekly-shift-template/get-details-list/', TemplateDetailsListView.as_view(), name="get-weekly-shift-details-list"),
    
    #Schedule Run
    path('schedule/create-details/', CreateScheduleRunView.as_view(), name="create-schedule-run-details"),
    path('schedule/update-details/<int:id>/', UpdateScheduleRunView.as_view(), name="update-schedule-run-details"),
    path('schedule/get-details/<int:id>/', GetScheduleRunByIdView.as_view(), name="get-schedule-run-details"),
    path('schedule/delete-details/<int:id>/', DeleteScheduleRunByIdView.as_view(), name="delete-schedule-run-details"),
    path('schedule/get-details-list/', ScheduleRunListView.as_view(), name="get-schedule-run-details-list"),
    path('schedule/get-all-status', ScheduleRunStatusListView.as_view(), name="schedule-run-status-list"),
    
    #search
    path('search/get-search-list/', GetSearchListView.as_view(), name="get-search-list"),
    path('search/get-search-details/', GetSearchDetailsView.as_view(), name="get-search-details"),
    
    
    #Assignment Rule
    path('assignment-rule/create-details/',CreateAssignmentRuleView.as_view(), name="create-assignment-rule-details"),
    path('assignment-rule/update-details/<int:id>/', UpdateAssignmentRuleView.as_view(), name="update-assignment-rule-details"),
    path('assignment-rule/get-details/<int:id>/', GetAssignmentRuleByIdView.as_view(), name="get-assignment-rule-details"),
    path('assignment-rule/delete-details/<int:id>/', DeleteAssignmentRuleView.as_view(), name="delete-assignment-rule-details"),
    path('assignment-rule/get-details-list/', AssignmentRuleListView.as_view(), name="get-assignment-rule-details-list"),
    
    #Task resource assigmnet
    path('task-resource-assignment/create-details/',CreateTaskResourceAssignmentView.as_view(), name="create-task-resource-assignment-details"),
    path('task-resource-assignment/update-details/<int:id>/', UpdateTaskResourceAssignmentView.as_view(), name="update-task-resource-assignment-details"),
    path('task-resource-assignment/get-details/<int:id>/', GetTaskResourceAssignmentByIdView.as_view(), name="get-task-resource-assignment-details"),
    path('task-resource-assignment/delete-details/<int:id>/', DeleteTaskResourceAssignmentView.as_view(), name="delete-task-resource-assignment-details"),
    path('task-resource-assignment/get-details-list/', TaskResourceAssignmentListView.as_view(), name="get-task-resource-assignment-details-list"),
    
    #Assignment Rule Criteria
    path('assignment-rule/create-criteria/',CreateAssignmentRuleCriteriaView.as_view(), name="create-assignment-rule-criteria"),
    path('assignment-rule/update-criteria/<int:id>/', UpdateAssignmentRuleCriteriaView.as_view(), name="update-assignment-rule-criteria"),
    path('assignment-rule/get-criteria/<int:id>/', GetAssignmentRuleCriteriaByIdView.as_view(), name="get-assignment-rule-criteria"),
    path('assignment-rule/delete-criteria/<int:id>/', DeleteAssignmentRuleCriteriaView.as_view(), name="delete-assignment-rule-criteria"),
    path('assignment-rule/get-criteria-list/', AssignmentRuleCriteriaListView.as_view(), name="get-task-resource-assignment-criteria-list"),

]   