from django.apps import apps
from django.db import models
from django.db.models import Q
from main_app import ws_methods

all_apps = {
    'app1':
        {
            'Event': ['name', 'description'],
            'Topic': ['name', 'lead'],
        },
    'app2':
        {
            'Event': ['name', 'description'],
            'Topic': ['name', 'lead'],
        },
}


class Search(models.Model):

    def execute(cls, request, params):
        search_text = params['kw'].lower()
        is_content_search = params.get('is_content_search')
        results = []
        search_models = params.get('search_models')
        if is_content_search:
            search_apps = {
                'documents':
                    {
                        'file': ['content']
                    }
            }
        else:
            search_apps = all_apps

        if search_models:
            for app_name in search_models:
                for model_name in search_models[app_name]:
                    fields = search_apps[app_name][model_name]
                    kwargs = {}
                    q_objects = Q()
                    for field in fields:
                        q_objects |= Q(**{field + '__contains': params['kw']})
                        kwargs.update({'{0}__{1}'.format(field, 'contains'): search_text})
                    model_obj = apps.get_model(app_name, model_name)
                    search_result = model_obj.objects.filter(q_objects)
                    if search_result:
                        search_result = ws_methods.queryset_to_list_search(search_result)
                        for result in search_result:
                            result['model'] = app_name + '.' + model_name
                        results = results + search_result
            return results
        else:
            for app, models in search_apps.items():
                for model, fields in models.items():
                    kwargs = {}
                    q_objects = Q()
                    for field in fields:
                        q_objects |= Q(**{field + '__contains': params['kw']})
                        kwargs.update({'{0}__{1}'.format(field, 'contains'): search_text})
                    model_obj = apps.get_model(app, model)
                    search_result = model_obj.objects.filter(q_objects)
                    if search_result:
                        search_result = ws_methods.queryset_to_list_search(search_result)
                        for result in search_result:
                            result['model'] = app + '.' + model
                        results = results + search_result
            return results
