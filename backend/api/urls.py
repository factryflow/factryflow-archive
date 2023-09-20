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
    path('operational-exceptions/', GetCreateOperationalExceptionView.as_view(), name="operational-exceptions"),
    path('operational-exceptions/<int:id>/', GetUpdateDeleteOperationalExceptionView.as_view(), name="Get-update-delete-operational-exceptions"),
   
    #weekly shift template
    path('weekly-shift-template/', GetCreateWeeklyShiftTemplateView.as_view(), name="weekly-shift-template"),
    path('weekly-shift-template/<int:id>/', GetUpdateDeleteWeeklyShiftTemplateView.as_view(), name="Get-update-delete-weekly-shift-template"),
   
    #weekly shift template details
    path('weekly-shift-template-details/', GetCreateWeeklyShiftDetailsView.as_view(), name="weekly-shift-details"),
    path('weekly-shift-template-details/<int:id>/', GetUpdateDeleteWeeklyShiftDetailsView.as_view(), name="Get-update-delete-weekly-shift-details"),
    
   
    #Schedule Run
    path('schedule-details/', GetCreateScheduleRunView.as_view(), name="schedule-run-details"),
    path('schedule-details/<int:id>/', GetUpdateDeleteScheduleRunView.as_view(), name="Get-update-delete-schedule-run-details"),
    path('schedule-status', ScheduleRunStatusListView.as_view(), name="schedule-run-status"),
    
    #search
    path('search/get-search-list/', GetSearchListView.as_view(), name="get-search-list"),
    path('search/get-search-details/', GetSearchDetailsView.as_view(), name="get-search-details"),
    
    
    #Assignment Rule
    path('assignment-rule-details/',GetCreateAssignmentRuleView.as_view(), name="assignment-rule-details"),
    path('assignment-rule-details/<int:id>/', GetUpdateAssignmentRuleView.as_view(), name="Get-update-delete-assignment-rule-details"),


    #Task resource assigmnet
    path('task-resource-assignment-details/',GetCreateTaskResourceAssignmentView.as_view(), name="task-resource-assignment-details"),
    path('task-resource-assignment-details/<int:id>/', GetUpdateResourceAssignmentView.as_view(), name="Get-update-delete-resource-assignment-details"),
    
    #Assignment Rule Criteria
    path('assignment-rule-criteria/',GetCreateAssignmentRuleCriteriaView.as_view(), name="assignment-rule-criteria"),
    path('assignment-rule-criteria/<int:id>/', GetUpdateAssignmentRuleCriteriaView.as_view(), name="Get-update-delete-assignment-rule-criteria"),

]