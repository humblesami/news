from django.core.serializers.json import DjangoJSONEncoder
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from django.contrib.auth.decorators import login_required
from django.db.models import Q

import json
import sys
import traceback
from django.apps import apps
from django.http import HttpResponse

from main_app import ws_methods

public_methods = {
    'auth_app': {
        'AuthUser': {
            'login_user': 1,
            'reset_password': 1,
            'set_password': 1
        }
    },
}


@csrf_exempt
def public(request):
    try:
        kw = request.POST
        res = 'Unknown'
        if not kw:
            kw = request.GET
        kw = json.loads(kw['input_data'])
        args = kw['args']
        try:
            res = public_methods[args['app']]
            res = res[args['model']]
            res = res[args['method']]
        except:
            res = 'Invalid method call'
            return produce_result(res, args)
        params = kw['params']
        model = apps.get_model(args['app'], args['model'])
        method_to_call = getattr(model, args['method'])
        res = method_to_call(request, params)
        return produce_result(res, args)
    except:
        return produce_exception()


@csrf_exempt
@api_view(["GET", "POST"])
def tokened_request(request):
    try:
        kw = request.POST
        if not kw:
            kw = request.GET
        kw = json.loads(kw['input_data'])
        args = kw['args']
        params = kw['params']
        model = apps.get_model(args['app'], args['model'])
        method_to_call = getattr(model, args['method'])
        res = method_to_call(request, params)
        return produce_result(res, args)
    except:
        return produce_exception()


@login_required()
def session(request):
    try:
        if request.user.id != 1:
            produce_result("unauthorized")
        kw = request.POST
        if not kw:
            kw = request.GET

        kw = json.loads(kw['input_data'])
        args = kw['args']
        params = kw['params']

        if not request.user.id:
            res = {'error': 'Invalid user'}
            return produce_result(res, args)

        model = apps.get_model(args['app'], args['model'])
        method_to_call = getattr(model, args['method'])
        res = method_to_call(request, params)
        return produce_result(res, args)
    except:
        return produce_exception()


def produce_exception():
    eg = traceback.format_exception(*sys.exc_info())
    errorMessage = ''
    cnt = 0
    for er in eg:
        cnt += 1
        if not 'lib/python' in er and not 'lib\\' in er:
            errorMessage += " " + er
    return HttpResponse(errorMessage)


def produce_result(res, args=None):
    if isinstance(res, dict):
        if 'error' not in res:
            if 'data' in res:
                res['error'] = ''
            else:
                res = {'data': res, 'error': ''}
        else:
            # Return ERROR data as it is
            pass
    elif type(res) == str:
        if res == 'done':
            res = {'error': '', 'data': 'done'}
        else:
            res = {'error': res}
    elif isinstance(res, list):
        res = {'error': '', 'data': res}
    else:
        if args:
            args = ' in ' + args['app'] + '.' + args['model'] + '.' + args['method']
        else:
            args = ''
        res = {'error': ' Invalid result type' + args}
    try:
        res = json.dumps(res, cls=DjangoJSONEncoder)
    except:
        print(args)
        print('\n\n\n')
        print(res['data'])
        print('\n\n\n')
        return produce_exception()
    return HttpResponse(res)