from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

# from api.utils.schemas import *
from drf_yasg.utils import swagger_auto_schema

# from api.services.search import SearchService

# search_service = SearchService()


# class GetSearchListView(APIView):
#     @swagger_auto_schema(
#         request_body=search_request_body,
#         responses=[],
#         operation_summary="get search data list ",
#     )
#     def post(self, request, format=None):
#         """
#         List all search data list.
#         """
#         result = search_service.get_all_search_list(request, format=None)
#         return Response(result, status=result["code"])


# class GetSearchDetailsView(APIView):
#     @swagger_auto_schema(
#         request_body=search_details_request_body,
#         responses=[],
#         operation_summary="get search data in details ",
#     )
#     def post(self, request, format=None):
#         """
#         get search data in details
#         """
#         result = search_service.get_search_data_details(request, format=None)
#         return Response(result, status=result["code"])
