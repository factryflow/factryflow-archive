import jwt



def get_user_by_token(request):
	jwt_token_str = request.META['HTTP_AUTHORIZATION']
	jwt_token = jwt_token_str.replace('Bearer', '')
	user_detail = jwt.decode(jwt_token, None, None)
	return user_detail

def string_to_time(self, time_str):
    return datetime.strptime(time_str, '%H:%M').time()