from http import HTTPStatus

from django.core.exceptions import (
    FieldError,
    ObjectDoesNotExist,
    PermissionDenied,
    ValidationError,
)
from ninja.errors import ValidationError as NinjaValidationError
from ninja_extra import NinjaExtraAPI
from ninja_jwt.authentication import JWTAuth
from ninja_jwt.controller import NinjaJWTDefaultController

from api.views import *

api = NinjaExtraAPI(urls_namespace="api")
api.register_controllers(NinjaJWTDefaultController)


api.add_router("/users", user_no_auth_router, tags=["users"])

api.add_router("/users", user_auth_router, auth=JWTAuth(), tags=["users"])


api.add_router("/jobs", job_router, auth=JWTAuth(), tags=["jobs"])
api.add_router("/job-types", job_type_router, auth=JWTAuth(), tags=["jobs"])
api.add_router("/job-status", job_status_router, auth=JWTAuth(), tags=["jobs"])

api.add_router("/tasks", task_router, auth=JWTAuth(), tags=["tasks"])
api.add_router("/task-types", task_type_router, auth=JWTAuth(), tags=["tasks"])
api.add_router("/task-status", task_status_router, auth=JWTAuth(), tags=["tasks"])

api.add_router(
    "/dependencies", dependency_router, auth=JWTAuth(), tags=["dependencies"]
)
api.add_router(
    "/dependency-types", dependency_type_router, auth=JWTAuth(), tags=["dependencies"]
)
api.add_router(
    "/dependency-status",
    dependency_status_router,
    auth=JWTAuth(),
    tags=["dependencies"],
)

api.add_router("/items", item_router, auth=JWTAuth(), tags=["items"])

api.add_router(
    "/work-centers", work_center_router, auth=JWTAuth(), tags=["work-centers"]
)

api.add_router("/resources", resource_router, auth=JWTAuth(), tags=["resources"])

api.add_router(
    "/resource-groups", resource_group_router, auth=JWTAuth(), tags=["resource-groups"]
)

api.add_router(
    "/operational-exceptions",
    operational_exception_router,
    auth=JWTAuth(),
    tags=["operational-exceptions"],
)
api.add_router(
    "operational-exception-types",
    operational_exception_type_router,
    auth=JWTAuth(),
    tags=["operational-exceptions"],
)

api.add_router(
    "/weekly-shift-templates",
    weeklyshift_template_router,
    auth=JWTAuth(),
    tags=["weekly-shift-templates"],
)
api.add_router(
    "/assignment-rules",
    assignment_rule_router,
    auth=JWTAuth(),
    tags=["assignment-rules"],
)
api.add_router(
    "/assignment-rule-criteria",
    assignment_rule_criteria_router,
    auth=JWTAuth(),
    tags=["assignment-rules"],
)

api.add_router(
    "/schedule-runs", schedule_run_router, auth=JWTAuth(), tags=["schedule-runs"]
)
api.add_router(
    "/schedule-run-status",
    schedule_run_status_router,
    auth=JWTAuth(),
    tags=["schedule-runs"],
)

api.add_router(
    "/custom-fields", custom_field_router, auth=JWTAuth(), tags=["custom-fields"]
)


@api.exception_handler(ObjectDoesNotExist)
def handle_object_does_not_exist(request, exc):
    return api.create_response(
        request,
        {"message": "ObjectDoesNotExist", "detail": str(exc)},
        status=HTTPStatus.NOT_FOUND,
    )


@api.exception_handler(PermissionDenied)
def handle_permission_error(request, exc: PermissionDenied):
    # Get the specific detail message from the exception if it exists.
    detail_message = (
        exc.args[0]
        if exc.args
        else "You don't have the permission to access this resource."
    )

    return api.create_response(
        request,
        {
            "message": "PermissionDenied",
            "detail": detail_message,
        },
        status=HTTPStatus.FORBIDDEN,
    )


@api.exception_handler(NinjaValidationError)
def handle_ninja_validation_error(request, exc: NinjaValidationError):
    mapped_msg = {error["loc"][-1]: error["msg"] for error in exc.errors}
    return api.create_response(
        request,
        data={"message": "NinjaValidationError", "detail": mapped_msg},
        status=HTTPStatus.BAD_REQUEST,
    )


@api.exception_handler(ValidationError)
def handle_validation_error(request, exc: ValidationError):
    status = HTTPStatus.BAD_REQUEST
    for field, errors in exc.error_dict.items():
        for error in errors:
            if error.code in ["unique", "unique_together"]:
                status = HTTPStatus.CONFLICT
    return api.create_response(
        request,
        data={"message": "ValidationError", "detail": exc.message_dict},
        status=status,
    )


@api.exception_handler(FieldError)
def handle_field_error(request, exc: FieldError):
    return api.create_response(
        request,
        data={"message": "FieldError", "detail": str(exc)},
        status=HTTPStatus.BAD_REQUEST,
    )
