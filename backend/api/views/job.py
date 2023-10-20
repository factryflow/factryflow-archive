from ninja import Router
from ninja_crud.views import (
    CreateModelView,
    ListModelView,
    ModelViewSet,
    RetrieveModelView,
    UpdateModelView,
)

from api.models import Job, JobStatus, JobType
from api.schemas import JobIn, JobOut, JobStatusOut, JobTypeOut
from api.utils.crud_hooks import PostSaveActions, post_save_hook, pre_save_hook
from api.utils.crud_views import SoftDeleteModelView

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


job_router = Router()


def set_order_from_field(instance, field_name) -> None:
    order_value = getattr(instance, field_name, None)
    if order_value is not None:
        instance.to(order_value)


actions_obj = PostSaveActions()
actions_obj.register("order", set_order_from_field)


class JobViewSet(ModelViewSet):
    model_class = Job

    # AbstractModelView subclasses can be used as-is
    list = ListModelView(output_schema=JobOut)
    create = CreateModelView(
        input_schema=JobIn,
        output_schema=JobOut,
        pre_save=pre_save_hook(),
        post_save=post_save_hook(
            ("m2m", "dependencies", "dependency_ids"),
            ("reverse_fk", "tasks", "task_ids"),
            ("order", "order"),
            actions_obj=actions_obj,
        ),
    )
    retrieve = RetrieveModelView(output_schema=JobOut)
    update = UpdateModelView(
        input_schema=JobIn,
        output_schema=JobOut,
        pre_save=pre_save_hook(),
        post_save=post_save_hook(
            ("order", "order"),
            actions_obj=actions_obj,
        ),
    )
    delete = SoftDeleteModelView()


# The register_routes method must be called to register the routes with the router
JobViewSet.register_routes(job_router)
