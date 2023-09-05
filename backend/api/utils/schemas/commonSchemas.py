from drf_yasg import openapi

auth_request_body = [
            openapi.Parameter(
                'Authorization',  # Header parameter name
                openapi.IN_HEADER,  # Parameter location
                description="Bearer Token",
                type=openapi.TYPE_STRING,
                format="Bearer [YourAccessTokenHere]",  # Example format for Bearer Token
                required=True,  # Whether it's required
            ),
        ]

common_type = openapi.TYPE_OBJECT


search_request_body = openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'search_value': openapi.Schema(type=openapi.TYPE_STRING, description="search_value"),
            },
            required=['search_value'],  # Specify required fields
)


search_details_request_body = openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'id':openapi.Schema(type=openapi.TYPE_STRING, description="id"),
                'type': openapi.Schema(type=openapi.TYPE_STRING, description="type"),
            },
            required=['id', 'type'],  # Specify required fields
)