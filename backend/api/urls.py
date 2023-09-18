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
    path('role/get-all-roles/', RoleListView.as_view(), name="get-all-role"),
    path('role/create-role/', RoleCreateView.as_view(), name="create-role"),
    
    #jobs
    path('jobs/jobs-list/', JobListView.as_view(), name="jobs-list"),
    path('jobs/create-job/', CreateJobsView.as_view(), name="create-jobs"),
    path('jobs/update-jobs/<int:id>/', UpdateJobsView.as_view(), name="update-jobs"),
    path('jobs/get-job-details/<int:id>/', GetJobByIdView.as_view(), name="get-job-details"),
    path('jobs/delete-job/<int:id>/', DeleteJobByIdView.as_view(), name="delete-jobs"),
    path('jobs/search-job/', SearchJobView.as_view(), name="search-job"),
    path('jobs/get-all-types/', JobTypesListView.as_view(), name='get-all-job-types'),
    path('jobs/get-all-status/', JobTypesListView.as_view(), name='get-all-job-status'),

    #tasks
    path('tasks/tasks-list/', TaskListView.as_view(), name="tasks-list"),
    path('tasks/create-task/', CreateTasksView.as_view(), name="create-tasks"),
    path('tasks/update-tasks/<int:id>/', UpdateTasksView.as_view(), name="update-tasks"),
    path('tasks/get-task-details/<int:id>/', GetTasksDetailsView.as_view(), name="get-task-details"),
    path('tasks/delete-task/<int:id>/', DeleteTasksView.as_view(), name="delete-tasks"),
    path('tasks/get-all-types/', GetTaskTypesView.as_view(), name='get-all-task-types'),
    path('tasks/get-all-status/', GetTaskStatusView.as_view(), name='get-all-task-status'),
    
    
    #dependency-Types
    path('dependency/get-dependency-types-list/', DependencyTypesListView.as_view(), name="dependency-types-list"),
    path('dependency/create-dependency-type/', CreateDependencyTypesView.as_view(), name="create-dependency-types"),
    path('dependency/update-dependency-type/<int:id>/', UpdateDependencyTypesView.as_view(), name="update-dependency-types"),
    path('dependency/delete-dependency-type/<int:id>/', DeleteDependencyTypesView.as_view(), name="delete-dependency-types"),
    
    #dependency
    path('dependency/get-dependency-list/', DependencListView.as_view(), name="dependency-list"),
    path('dependency/create-dependency/', CreateDependencyView.as_view(), name="create-dependency"),
    path('dependency/update-dependency/<int:id>/', UpdateDependencyView.as_view(), name="update-dependency"),
    path('dependency/get-dependency-details/<int:id>/', GetDependencyByIdView.as_view(), name="update-dependency"),
    path('dependency/delete-dependency/<int:id>/', DeleteDependencyByIdView.as_view(), name="delete-dependency"),
    path('dependency/get-dependecy-status-list/', GetDependencyStatusDetails.as_view(), name="get-dependency-status-list"),
    
    #Resources
    path('resource/create-resources/', CreateResourcesView.as_view(), name="create-resources"),
    path('resource/update-resources/<int:id>/', UpdateResourcesView.as_view(), name="update-resources"),
    path('resource/get-resources-details/<int:id>/', GetResourcesDetailsByIdView.as_view(), name="get-resources-details"),
    path('resource/delete-resources/<int:id>/', DeleteResourceByIdView.as_view(), name="delete-resources"),
    path('resource/get-resources-list/', ResourcesListView.as_view(), name="get-resources-list"),
    
    #Resources-Group
    path('resource/create-resource-group/', CreateResourceGroupsView.as_view(), name="create-resources-group"),
    path('resource/update-resource-group/<int:id>/', UpdateResourceGroupsView.as_view(), name="update-resources-group"),
    path('resource/get-resource-group-details/<int:id>/', GetResourcesGroupsDetailsView.as_view(), name="get-resources-group-details"),
    path('resource/delete-resource-group/<int:id>/', DeleteResourceGroupsByIdView.as_view(), name="delete-resources-group"),
    path('resource/get-resource-group-list/', ResourcesGroupsListView.as_view(), name="get-resources-group-list"),

    #operation exception type
    path('operational-exception/create-type/', CreateOperationalExceptionTypeView.as_view(), name="create-operational-exception-type"),
    path('operational-exception/update-type/<int:id>/', UpdateOperationalExceptionTypeView.as_view(), name="update-operational-exception-type"),
    path('operational-exception/get-type-details/<int:id>/', GetOperationalExceptionTypeDetailsView.as_view(), name="get-operational-exception-type-details"),
    path('operational-exception/delete-type/<int:id>/', DeleteOperationalExceptionTypeByIdView.as_view(), name="delete-operational-exception-type"),
    path('operational-exception/get-type-list/', GetOperationalExceptionTypeListView.as_view(), name="get-operational-exception-type-list"),
    
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