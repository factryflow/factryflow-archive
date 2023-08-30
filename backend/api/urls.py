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
    path('jobs/create-job/', CreateUpdateJobsView.as_view(), name="create-jobs"),
    path('jobs/update-jobs/<int:id>/', CreateUpdateJobsView.as_view(), name="update-jobs"),
    path('jobs/get-job-details/<int:id>/', CreateUpdateJobsView.as_view(), name="get-job-details"),
    path('jobs/delete-job/<int:id>/', CreateUpdateJobsView.as_view(), name="delete-jobs"),

    #tasks
    path('tasks/tasks-list/', TaskListView.as_view(), name="tasks-list"),
    path('tasks/create-task/', CreateUpdateTasksView.as_view(), name="create-tasks"),
    path('tasks/update-tasks/<int:id>/', CreateUpdateTasksView.as_view(), name="update-tasks"),
    path('tasks/get-task-details/<int:id>/', CreateUpdateTasksView.as_view(), name="get-task-details"),
    path('tasks/delete-task/<int:id>/', CreateUpdateTasksView.as_view(), name="delete-tasks"),
    
    #dependency-Types
    path('dependency/get-dependency-types-list/', DependencyTypesListView.as_view(), name="dependency-types-list"),
    path('dependency/create-dependency-type/', CreateDependencyTypesView.as_view(), name="create-dependency-types"),
    path('dependency/update-dependency-type/<int:id>/', UpdateDependencyTypesView.as_view(), name="update-dependency-types"),
    path('dependency/delete-dependency-type/<int:id>/', DeleteDependencyTypesView.as_view(), name="delete-dependency-types"),
    
    #dependency
    path('dependency/get-dependency-list/', DependencListView.as_view(), name="dependency-list"),
    path('dependency/create-dependency/', CreateUpdateDependencView.as_view(), name="create-dependency"),
    path('dependency/update-dependency/<int:id>/', CreateUpdateDependencView.as_view(), name="update-dependency"),
    path('dependency/get-dependency-details/<int:id>/', CreateUpdateDependencView.as_view(), name="update-dependency"),
    path('dependency/delete-dependency/<int:id>/', CreateUpdateDependencView.as_view(), name="delete-dependency"),
    
    #Resources
    path('resource/create-resources/', CreateUpdateResourcesView.as_view(), name="create-resources"),
    path('resource/update-resources/<int:id>/', CreateUpdateResourcesView.as_view(), name="update-resources"),
    path('resource/get-resources-details/<int:id>/', CreateUpdateResourcesView.as_view(), name="get-resources-details"),
    path('resource/delete-resources/<int:id>/', CreateUpdateResourcesView.as_view(), name="delete-resources"),
    path('resource/get-resources-list/', ResourcesListView.as_view(), name="get-resources-list"),
    
    #Resources-Group
    path('resource/create-resource-group/', CreateUpdateResourceGroupsView.as_view(), name="create-resources-group"),
    path('resource/update-resource-group/<int:id>/', CreateUpdateResourceGroupsView.as_view(), name="update-resources-group"),
    path('resource/get-resource-group-details/<int:id>/', CreateUpdateResourceGroupsView.as_view(), name="get-resources-group-details"),
    path('resource/delete-resource-group/<int:id>/', CreateUpdateResourceGroupsView.as_view(), name="delete-resources-group"),
    path('resource/get-resource-group-list/', ResourceGroupsListView.as_view(), name="get-resources-group-list"),

    #operation exception type
    path('operational-exception/create-type/', CreateUpdateOperationalExceptionTypeView.as_view(), name="create-operational-exception-type"),
    path('operational-exception/update-type/<int:id>/', CreateUpdateOperationalExceptionTypeView.as_view(), name="update-operational-exception-type"),
    path('operational-exception/get-type-details/<int:id>/', CreateUpdateOperationalExceptionTypeView.as_view(), name="get-operational-exception-type-details"),
    path('operational-exception/delete-type/<int:id>/', CreateUpdateOperationalExceptionTypeView.as_view(), name="delete-operational-exception-type"),
    path('operational-exception/get-type-list/', OperationalExceptionTypeListView.as_view(), name="get-operational-exception-type-list"),
    
    
    #operation exception
    path('operational-exception/create-exception/', CreateUpdateOperationalExceptionView.as_view(), name="create-operational-exception"),
    path('operational-exception/update-exception/<int:id>/', CreateUpdateOperationalExceptionView.as_view(), name="update-operational-exception"),
    path('operational-exception/get-exception-details/<int:id>/', CreateUpdateOperationalExceptionView.as_view(), name="get-operational-exception-details"),
    path('operational-exception/delete-exception/<int:id>/', CreateUpdateOperationalExceptionView.as_view(), name="delete-operational-exception"),
    path('operational-exception/get-exception-list/', OperationalExceptionListView.as_view(), name="get-operational-exception-list"),
    
    #weekly shift template
    path('weekly-shift/create-template/', CreateUpdateWeeklyShiftTemplateView.as_view(), name="create-weekly-shift"),
    path('weekly-shift/update-template/<int:id>/', CreateUpdateWeeklyShiftTemplateView.as_view(), name="update-weekly-shift"),
    path('weekly-shift/get-template-by-id/<int:id>/', CreateUpdateWeeklyShiftTemplateView.as_view(), name="get-weekly-shift-details"),
    path('weekly-shift/delete-template/<int:id>/', CreateUpdateWeeklyShiftTemplateView.as_view(), name="delete-weekly-shift"),
    path('weekly-shift/get-template-list/', WeeklyShiftTemplateListView.as_view(), name="get-weekly-shift-list"),
    
    #weekly shift template details
    path('weekly-shift-template/create-details/', CreateUpdateTemplateDetailsView.as_view(), name="create-weekly-shift-details"),
    path('weekly-shift-template/update-details/<int:id>/', CreateUpdateTemplateDetailsView.as_view(), name="update-weekly-shift-details"),
    path('weekly-shift-template/get-details/<int:id>/', CreateUpdateTemplateDetailsView.as_view(), name="get-weekly-shift-details"),
    path('weekly-shift-template/delete-details/<int:id>/', CreateUpdateTemplateDetailsView.as_view(), name="delete-weekly-shift-details"),
    path('weekly-shift-template/get-details-list/', TemplateDetailsListView.as_view(), name="get-weekly-shift-details-list"),
       
]