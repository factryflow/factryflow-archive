from api.models import OperationalExceptionType, OperationalException
from api.schemas import OperationalExceptionIn, OperationalExceptionOut, OperationalExceptionTypeIn, OperationalExceptionTypeOut
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

operational_exception_router = Router()



class OperationalExceptionViewSet(ModelViewSet):
    model_class = OperationalException

    # AbstractModelView subclasses can be used as-is
    list = ListModelView(output_schema=OperationalExceptionOut)
    create = CreateModelView(
        input_schema=OperationalExceptionIn,
        output_schema=OperationalExceptionOut,
        pre_save=pre_save_hook(['operational_exception_type', 'weekly_shift_template']),
    )
    retrieve = RetrieveModelView(output_schema=OperationalExceptionOut)
    update = UpdateModelView(
        input_schema=OperationalExceptionIn,
        output_schema=OperationalExceptionOut,
        pre_save=pre_save_hook(['operational_exception_type', 'weekly_shift_template']),
    )
    delete = SoftDeleteModelView()


# The register_routes method must be called to register the routes with the router
OperationalExceptionViewSet.register_routes(operational_exception_router)




operational_exception_type_router = Router()


class OperationalExceptionTypeViewSet(ModelViewSet):
    model_class = OperationalException

    # AbstractModelView subclasses can be used as-is
    list = ListModelView(output_schema=OperationalExceptionTypeOut)
    create = CreateModelView(
        input_schema=OperationalExceptionTypeIn,
        output_schema=OperationalExceptionTypeOut,
        pre_save=pre_save_hook(),
    )
    retrieve = RetrieveModelView(output_schema=OperationalExceptionTypeOut)
    update = UpdateModelView(
        input_schema=OperationalExceptionTypeIn,
        output_schema=OperationalExceptionTypeOut,
        pre_save=pre_save_hook(),
    )
    delete = SoftDeleteModelView()


# The register_routes method must be called to register the routes with the router
OperationalExceptionTypeViewSet.register_routes(operational_exception_type_router)










# from rest_framework import status
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework.permissions import AllowAny
# from drf_yasg.utils import swagger_auto_schema
# from api.utils.schemas import *

# from api.services.operationalException import OperationalExceptionService

# exception_service = OperationalExceptionService()


# class GetCreateOperationalExceptionTypeView(APIView):
#     @swagger_auto_schema(
#         request_body=create_update_operational_exception_type,
#         responses=response_create_update_operational_exception_type,
#         operation_summary="Create operational exception type",
#     )
#     def post(self, request, format=None):
#         """
#         Create operational exception type.
#         """
#         result = exception_service.create_exception_types(request, format=None)
#         return Response(result, status=result["code"])
    
#     @swagger_auto_schema(
#         responses=operational_exception_type_details_response,
#         operation_summary="get operational exception type list ",
#     )
#     def get(self, request, format=None):
#         """
#         List all operational exception type.
#         """
#         result = exception_service.get_all_exception_types(request, format=None)
#         return Response(result, status=result["code"])
    

# class GetUpdateDeleteOperationalExceptionTypeView(APIView):
#     @swagger_auto_schema(
#         request_body=create_update_operational_exception_type,
#         responses=response_create_update_operational_exception_type,
#         operation_summary="Update operational exception type",
#     )
#     def put(self, request, id, format=None):
#         """
#         Update operational exception type
#         """
#         result = exception_service.update_exception_types(request, id, format=None)
#         return Response(result, status=result["code"])

#     @swagger_auto_schema(
#         responses=operational_exception_type_details_response,
#         operation_summary="get operational exception type details by id ",
#     )
#     def get(self, request, id, format=None):
#         """
#         get operational exception type detail by id
#         """
#         result = exception_service.get_exception_type_by_id(request, id, format=None)
#         return Response(result, status=result["code"])
    
#     @swagger_auto_schema(
#         responses=delete_operational_exception_type_response,
#         operation_summary="delete operational exception type",
#     )
    
#     def delete(self, request, id, format=None):
#         """
#         delete operational exception type detail by id
#         """
#         result = exception_service.delete_exception_types(request, id, format=None)
#         return Response(result, status=result["code"])
    



# class GetCreateOperationalExceptionView(APIView):

#     @swagger_auto_schema(
#         request_body=create_update_operational_exception_body,
#         responses=operational_exception_details_response,
#         operation_summary="Create operational exception type",
#     )
#     def post(self, request, format=None):
#         """
#         Create operational exception.
#         """
#         result = exception_service.create_exception(request, format=None)
#         return Response(result, status=result["code"])
    
#     @swagger_auto_schema(
#         responses=operational_exception_details_response,
#         operation_summary="get operational exception type list ",
#     )
#     def get(self, request, format=None):
#         """
#         List all operational exception .
#         """
#         result = exception_service.get_all_exception(request, format=None)
#         return Response(result, status=result["code"])


# class GetUpdateDeleteOperationalExceptionView(APIView):
    
#     @swagger_auto_schema(
#         request_body=create_update_operational_exception_body,
#         responses=response_create_update_operational_exception,
#         operation_summary="Update operational exception type",
#     )
#     def put(self, request, id, format=None):
#         """
#         Update operational exception
#         """
#         result = exception_service.update_exception(request, id, format=None)
#         return Response(result, status=result["code"])

#     @swagger_auto_schema(
#         responses=operational_exception_details_response,
#         operation_summary="get operational exception details by id ",
#     )
#     def get(self, request, id, format=None):
#         """
#         get operational exception detail by id
#         """
#         result = exception_service.get_exception_by_id(request, id, format=None)
#         return Response(result, status=result["code"])
    
#     @swagger_auto_schema(
#         responses=response_delete_operational_exception,
#         operation_summary="delete operational exception ",
#     )
    
#     def delete(self, request, id, format=None):
#         """
#         delete operational exception  detail by id
#         """
#         result = exception_service.delete_exception(request, id, format=None)
#         return Response(result, status=result["code"])
    