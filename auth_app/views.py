from django.http import HttpResponse
from django.contrib.auth import logout

from token_app.models import PostUserToken
from django.shortcuts import render, redirect
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt


def login(request, next=None):
    context = {}
    return render(request, 'login.html', context)

def logout_user(request):
    logout(request)
    return redirect('/user/login')

def forgot_password(request):
    context = {}
    return render(request, 'password_reset.html', context)

def load_verify_code_page(request):
    context = {}
    # username = request.session.get('username')
    # if username:
    #     del request.session['username']
    #     user = Profile.objects.get(username=username)
    #     auth_type = user.get_two_factor_auth_display()
    #     context = {'message': 'Please check your '+auth_type+' to get latest verification code just received'}
    return render(request, 'verify_code.html', context)

@csrf_exempt
@api_view(["GET", "POST"])
def verify_token(request):
    return HttpResponse('done')

def reset_password(request, token):
    context = {}
    if not token:
        context['error'] = 'Invalid Token'
    user_token = PostUserToken.validate_token(token, do_not_expire=True)
    if not user_token:
        context['error'] = 'Invalid Token'
    return render(request, 'password_reset.html', context)