from django.db.models import Q
import operator
from functools import reduce


def search_data(request, search_keys, search_type, serializer, query):
    print(query)
    search_value = request.data.get("search_value")
    kwargs = []
    no_of_keys = len(search_keys)
    for keyname in search_keys:
        if no_of_keys > 0:
            for keyname in search_keys:
                kwargs.append(Q(**{keyname: search_value}))

            if search_type == "and":
                query = query.filter(reduce(operator.and_, kwargs))
            else:
                query = query.filter(reduce(operator.or_, kwargs))

    serializer = serializer(query, many=True)

    return serializer
