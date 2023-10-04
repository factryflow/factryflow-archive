from api.models import WeeklyShiftTemplate, WeeklyShiftTemplateDetail
from api.schemas import WeeklyShiftTemplateIn, WeeklyShiftTemplateOut, WeeklyShiftTemplateDetailIn, WeeklyShiftTemplateDetailOut
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

weeklyshift_template_router = Router()



class WeeklyShiftTemplateViewSet(ModelViewSet):
    model_class = WeeklyShiftTemplate

    # AbstractModelView subclasses can be used as-is
    list = ListModelView(output_schema=WeeklyShiftTemplateOut)
    create = CreateModelView(
        input_schema=WeeklyShiftTemplateIn,
        output_schema=WeeklyShiftTemplateOut,
        pre_save=pre_save_hook(['created_by', 'updated_by']),
    )
    retrieve = RetrieveModelView(output_schema=WeeklyShiftTemplateOut)
    update = UpdateModelView(
        input_schema=WeeklyShiftTemplateIn,
        output_schema=WeeklyShiftTemplateOut,
        pre_save=pre_save_hook(['created_by', 'updated_by']),
    )
    delete = SoftDeleteModelView()


# The register_routes method must be called to register the routes with the router
WeeklyShiftTemplateViewSet.register_routes(weeklyshift_template_router)




weeklyshift_template_detail_router = Router()


class OperationalExceptionTypeViewSet(ModelViewSet):
    model_class = WeeklyShiftTemplateDetail

    # AbstractModelView subclasses can be used as-is
    list = ListModelView(output_schema=WeeklyShiftTemplateDetailOut)
    create = CreateModelView(
        input_schema=WeeklyShiftTemplateDetailIn,
        output_schema=WeeklyShiftTemplateDetailOut,
        pre_save=pre_save_hook(['template','created_by', 'updated_by']),
    )
    retrieve = RetrieveModelView(output_schema=WeeklyShiftTemplateDetailOut)
    update = UpdateModelView(
        input_schema=WeeklyShiftTemplateDetailIn,
        output_schema=WeeklyShiftTemplateDetailOut,
        pre_save=pre_save_hook(),
    )
    delete = SoftDeleteModelView()


# The register_routes method must be called to register the routes with the router
OperationalExceptionTypeViewSet.register_routes(weeklyshift_template_detail_router)






# from rest_framework import status
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework.permissions import AllowAny
# from api.utils.schemas import *
# from drf_yasg.utils import swagger_auto_schema
# from api.services.weeklyShiftTemplate import WeeklyShiftTemplateService

# template_service = WeeklyShiftTemplateService()



# class GetCreateWeeklyShiftTemplateView(APIView):

#     @swagger_auto_schema(
#         request_body=create_update_weekly_shift_template_request_body,
#         responses=response_create_update_weekly_shift_template,
#         operation_summary="Create weekly shift template.",
#     )
#     def post(self, request, format=None):
#         """
#         Create weekly shift template.
#         """
#         result = template_service.create_weekly_shift_template(request, format=None)
#         return Response(result, status=result["code"])
    
#     @swagger_auto_schema(
#         responses=weekly_shift_template_response,
#         operation_summary="List all weekly shift template",
#     )
#     def get(self, request, format=None):
#         """
#         List all weekly shift template.
#         """
#         result = template_service.get_all_weekly_shift_template(request, format=None)
#         return Response(result, status=result["code"])


# class GetUpdateDeleteWeeklyShiftTemplateView(APIView):
    
#     @swagger_auto_schema(
#         request_body=create_update_weekly_shift_template_request_body,
#         responses=response_create_update_weekly_shift_template,
#         operation_summary="update weekly shift template.",
#     )
#     def put(self, request, id, format=None):
#         """
#         update weekly shift template.
#         """
#         result = template_service.update_weekly_shift_template(request, id, format=None)
#         return Response(result, status=result["code"])

#     @swagger_auto_schema(
#         responses=response_create_update_weekly_shift_template,
#         operation_summary="get weekly shift template by id",
#     )
#     def get(self, request, id, format=None):
#         """
#         get weekly shift template by id
#         """
#         result = template_service.get_weekly_shift_template_by_id(request, id, format=None)
#         return Response(result, status=result["code"])
    
#     @swagger_auto_schema(
#         responses=response_delete_weekly_shift_template,
#         operation_summary="delete weekly shift template by id",
#     )
#     def delete(self, request, id, format=None):
#         """
#         delete weekly shift template by id
#         """
#         result = template_service.delete_weekly_shift_template(request, id, format=None)
#         return Response(result, status=result["code"])


# class GetCreateWeeklyShiftDetailsView(APIView):

#     @swagger_auto_schema(
#         request_body=create_update_weekly_shift_template_request_body,
#         responses=response_create_update_weekly_shift_template,
#         operation_summary="Create weekly shift template details",
#     )
#     def post(self, request, format=None):
#         """
#         Create weekly shift details.
#         """
#         result = template_service.create_template_details(request, format=None)
#         return Response(result, status=result["code"])
    
#     @swagger_auto_schema(
#         responses=template_details_response,
#         operation_summary="List all weekly shift details",
#     )
#     def get(self, request, format=None):
#         """
#         List all weekly shift details.
#         """
#         result = template_service.get_all_template_details(request, format=None)
#         return Response(result, status=result["code"])
    
	


# class GetUpdateDeleteWeeklyShiftDetailsView(APIView):
    
#     @swagger_auto_schema(
#         request_body=create_update_template_details_request_body,
#         responses=response_create_update_template_details,
#         operation_summary="update weekly shift template.",
#     )
#     def put(self, request, id, format=None):
#         """
#         update weekly shift template.
#         """
#         result = template_service.update_template_details(request, id, format=None)
#         return Response(result, status=result["code"])

#     @swagger_auto_schema(
#         responses=response_create_update_template_details,
#         operation_summary="get weekly shift template by id",
#     )
#     def get(self, request, id, format=None):
#         """
#         get weekly shift template by id
#         """
#         result = template_service.get_template_details_by_id(request, id, format=None)
#         return Response(result, status=result["code"])
    
#     @swagger_auto_schema(
#         responses=response_delete_template_details,
#         operation_summary="delete weekly shift template by id",
#     )
#     def delete(self, request, id, format=None):
#         """
#         delete weekly shift template by id
#         """
#         result = template_service.delete_template_details(request, id, format=None)
#         return Response(result, status=result["code"])
    

# class GetWeeklyShiftDetailsbyTemplateView(APIView):
#     @swagger_auto_schema(
#         responses=response_create_update_weekly_shift_template,
#         operation_summary="get weekly shift template by template id",
#     )
#     def get(self, request, template_id, format=None):
#         """
#         Get weekly shift template details by template id
#         """
#         result = template_service.get_weekly_shift_details_by_template_id(request, template_id, format=None)
#         return Response(result, status=result["code"])