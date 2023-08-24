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
    path('dependency/get-dependency-types-list/', DependencyTypesListView.as_view(), name="tasks-list"),
    path('dependency/create-dependency-type/', CreateUpdateDependencyTypesView.as_view(), name="create-tasks"),
    path('dependency/update-dependency-type/<int:id>/', CreateUpdateDependencyTypesView.as_view(), name="update-tasks"),
    path('dependency/delete-dependency-type/<int:id>/', CreateUpdateDependencyTypesView.as_view(), name="delete-tasks"),

    
]