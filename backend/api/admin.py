from django.contrib import admin

# Register your models here.
from api.models import *

admin.site.register(Dependency)
admin.site.register(DependencyTypes)
admin.site.register(Job)
admin.site.register(OperationalException)
admin.site.register(OperationalExceptionType)
admin.site.register(ResourceGroups)
admin.site.register(Resources)
admin.site.register(User)
admin.site.register(Role)
admin.site.register(Tasks)