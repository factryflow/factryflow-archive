from http import HTTPStatus

from api.views import *
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

api = NinjaExtraAPI(urls_namespace="api")
api.register_controllers(NinjaJWTDefaultController)


api.add_router("/users", user_no_auth_router, tags=["users"])
api.add_router("/users", user_auth_router, auth=JWTAuth(), tags=["users"])
api.add_router("/items", item_router, auth=JWTAuth(), tags=["items"])
api.add_router("/roles", role_router, tags=["roles"])
api.add_router("/jobs", job_router, auth=JWTAuth(), tags=["jobs"])
api.add_router("/job-types", job_type_router, auth=JWTAuth(), tags=["job-types"])
api.add_router("/job-status", job_status_router, auth=JWTAuth(), tags=["job-status"])
api.add_router("/operational-exception-type", operational_exception_type_router, auth=JWTAuth(), tags=["operational-exception-type"])
api.add_router("/operational-exception", operational_exception_router, auth=JWTAuth(), tags=["operational-exception"])
api.add_router("/weekly-shift-template-detail", weeklyshift_template_detail_router, auth=JWTAuth(), tags=["weekly-shift-template-detail"])
api.add_router("/weekly-shift-template", weeklyshift_template_router, auth=JWTAuth(), tags=["weekly-shift-template"])
api.add_router("/assignment-rule", assignment_rule_router, auth=JWTAuth(), tags=["assignment-rule"])
api.add_router("/assignment-rule-criteria", assignment_rule_criteria_router, auth=JWTAuth(), tags=["assignment-rule-criteria"])
api.add_router("/assignment-rule-resource-group", assignment_rule_resource_group_router, auth=JWTAuth(), tags=["assignment-rule-resource-group"])
api.add_router("/resource", resource_router, auth=JWTAuth(), tags=["resource"])
api.add_router("/resource-group", resource_group_router, auth=JWTAuth(), tags=["resource-group"])


@api.exception_handler(ObjectDoesNotExist)
def handle_object_does_not_exist(request, exc):
    return api.create_response(
        request,
        {"message": "ObjectDoesNotExist", "detail": str(exc)},
        status=HTTPStatus.NOT_FOUND,
    )


@api.exception_handler(PermissionDenied)
def handle_permission_error(request, exc: PermissionDenied):
    return api.create_response(
        request,
        {
            "message": "PermissionDenied",
            "detail": "You don't have the permission to access this resource.",
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

