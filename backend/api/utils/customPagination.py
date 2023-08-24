from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from math import ceil
import operator
from functools import reduce
from django.db.models import Q

class CustomPagination:

    def custom_pagination(self, request, model, search_keys, search_type, serializer, query):
        """ Function to handle custom pagination"""
        length = request.data['length']
        start = request.data['start']
        columns_order = request.data['order'][0]['column']
        order = request.data['columns'][columns_order]['data']
        direction = request.data['order'][0]['dir']
        search_value = request.data['search']['value']

        if (direction == 'desc'):
            order = '-' + order

        if (direction == 'undefined'):
            order = '-id'

        kwargs = []
        # print('\n\nquery')
        if (search_value):
            no_of_keys = len(search_keys)
            if no_of_keys > 0:
                for keyname in search_keys:
                    kwargs.append(Q(**{keyname:search_value}))

                if(search_type == 'and'):
                    query = query.filter(reduce(operator.and_, kwargs))
                else:
                    query = query.filter(reduce(operator.or_, kwargs))
        #else:
        #    query = model.objects.all()


        page_no = int(start/length + 1)
        query = query.order_by(order)
        paginator = Paginator(query, length)
        paginated_data = paginator.page(page_no)
        serializer = serializer(paginated_data, many=True)

        return {"response_object": serializer.data, "total_records": paginated_data.paginator.count}

class CustomPaginationMobileView:

    def custom_pagination_mobile_view(self, request, model, search_keys, search_type, serializer, query, user=None):
        """
        Function to handle custom pagination for mobile view
        """

        length = request.data['length']

        start = request.data['start']

        page_no = int(int(start)/int(length) + 1)

        paginator = Paginator(query, length)


        try:
            paginated_data = paginator.page(page_no)
        except PageNotAnInteger:
            # If page is not an integer, deliver first page.
            paginated_data = paginator.page(1)
        except EmptyPage:
            # If page is out of range (e.g. 9999), deliver last page of results.
            return {"response_object": None, "total_records": 0}    


        serializer = serializer(paginated_data, context={'user': user}, many=True)

        return {"response_object": serializer.data, "total_records": paginated_data.paginator.count}

