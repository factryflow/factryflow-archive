# API Design Style Guide

1. **Resource Naming**:
    - Use *plural nouns* for resource names.
        - Good: `GET /users`, `POST /orders`
        - Avoid: `GET /user`, `POST /order`
    - Avoid using verbs in the endpoint names. Rely on HTTP methods to indicate the action.
        - Good: `GET /users` (to retrieve users)
        - Avoid: `GET /get-users` or `POST /create-user`

2. **HTTP Methods**:
    - **CREATE**: Use `POST`.
    - **READ**: Use `GET`.
    - **UPDATE**: Use `PUT` (full update) or `PATCH` (partial update).
    - **DELETE**: Use `DELETE`.

3. **URL Structure**:
    - Keep URLs simple and intuitive.
    - Use *kebab-case* for multi-word resource names: `GET /order-items`.
    - Nest resources for relations: `GET /users/{id}/orders`.

4. **Versioning**:
    - Include version in the URL: `/v1/users`.

5. **Filters, Sorting, and Pagination**:
    - Use query parameters.
        - Filter: `/products?category=electronics`
        - Sort: `/products?sort=price-asc`
        - Paginate: `/products?page=2&limit=20`

6. **Status Codes**:
    - Use standard HTTP status codes.
        - 200: OK
        - 201: Created
        - 400: Bad Request
        - 404: Not Found
        - 500: Internal Server Error

7. **Error Handling**:
    - Provide clear error messages in a consistent format.
        - Example: `{"error": "User not found", "code": 404}`

8. **Consistency**:
    - Maintain a consistent structure for API endpoints, responses, and payloads.

9. **Documentation**:
    - Clearly document all endpoints, request/response formats, and potential error messages.
