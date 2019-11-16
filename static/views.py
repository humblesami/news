from main_app import ws_methods
from django.shortcuts import render

def index(request):
    user = request.user
    context = {'uid': None}
    if user and user.id:
        context = {
            'uid' : user.id,
            'name': ws_methods.get_user_name(user),
            'id' : user.id,
            'login': user.username
        }
    return render(request, 'index.html', context)


def login(request):
  return render(request, 'login.html', {})
