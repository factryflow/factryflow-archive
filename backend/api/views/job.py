from api.models import Job, JobType, JobStatus
from api.schemas import JobOut, JobIn, JobTypeOut, JobStatusOut
from api.utils.crud_views import SoftDeleteModelView
from api.utils.model_utils import pre_save_hook
from ninja import Router
from ninja_crud.views import (
    CreateModelView,
    ListModelView,
    ModelViewSet,
    RetrieveModelView,
    UpdateModelView,
)

job_type_router = Router()
class JobTypeViewSet(ModelViewSet):
    model_class = JobType

    # AbstractModelView subclasses can be used as-is
    list = ListModelView(output_schema=JobTypeOut)
    
JobTypeViewSet.register_routes(job_type_router)


job_status_router = Router()
class JobStatusViewSet(ModelViewSet):
    model_class = JobStatus

    # AbstractModelView subclasses can be used as-is
    list = ListModelView(output_schema=JobStatusOut)
    
JobStatusViewSet.register_routes(job_status_router)

def set_job_type_and_status(request, instance) -> None:
    # Assuming the payload contains job_type_id and job_status_id
    job_type_id = getattr(instance, 'job_type_id', None)
    job_status_id = getattr(instance, 'job_status_id', None)

    if job_type_id:
        instance.job_type = JobType.objects.get(id=int(job_type_id))
    if job_status_id:
        instance.job_status = JobStatus.objects.get(id=int(job_status_id))


job_router = Router()
class JobViewSet(ModelViewSet):
    model_class = Job

    # AbstractModelView subclasses can be used as-is
    list = ListModelView(output_schema=JobOut)
    create = CreateModelView(
        input_schema=JobIn,
        output_schema=JobOut,
        pre_save=pre_save_hook(['job_type', 'job_status']),
    )
    retrieve = RetrieveModelView(output_schema=JobOut)
    update = UpdateModelView(
        input_schema=JobIn,
        output_schema=JobOut,
        pre_save=pre_save_hook(['job_type', 'job_status']),
    )
    delete = SoftDeleteModelView()


# The register_routes method must be called to register the routes with the router
JobViewSet.register_routes(job_router)
