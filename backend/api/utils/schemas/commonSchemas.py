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
