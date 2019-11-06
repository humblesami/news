function ajax_request(input_data, call_backs) {
    if(!call_backs){
        call_backs = {};
    }    
    if (!input_data) {
        console.log('No data and arguments for request ',input_data);
        return;
    }

    var ajax_user = localStorage.getItem('user');
    if(ajax_user){
        ajax_user = JSON.parse(ajax_user);
    }
    var api_url = '/rest/public';
    if(ajax_user)    
    {
        if(ajax_user.cookie)
        {
            api_url = '/rest/secure';
        }
    }
    var req_url = site_config.server_base_url + api_url;
    var args_data = {input_data : JSON.stringify(input_data)};
    
    var options = {};
    options.headers = {};
    if(ajax_user && ajax_user.cookie && ajax_user.cookie.token)
    {        
        options.headers ['Authorization'] = 'Token '+ajax_user.cookie.token;
    }
    else if(api_url.endsWith('/secure'))
    {        
        handle_authorization('Invalid acces to secure api');        
        return;
    }
    options.data = args_data;
    options.dataType = 'json';
    
    if(req_url.indexOf('localhost')> -1)
    {
        if(input_data.args && input_data.args.post)
        {
            options.type = 'POST';
        }
        else
        {            
            options.type = 'GET';
        }
    }
    else
    {
        options.type = 'POST';
    }    
    options.contentType = "application/json; charset=utf-8";    

    options.url = req_url;
    options.timeout = 30000;
    var loading_text = 'Data From Server';
    var url_with_params = 'Nothing';
    options.beforeSend = function(a, b) {
        url_with_params = b.url.toString();
        if(site_config.trace_request || is_localhost)
        {
            if(api_url == '/rest/secure')
            {
                url_with_params = url_with_params.replace('rest/secure','rest/secure1');
            }
            if(url_with_params.length < 1500)
            {
                console.log(url_with_params, input_data.args);    
            }
            else{
                console.log(input_data.args);
            }
        }
        options.no_loader = true;
        if (!options.no_loader)
        {
            if(input_data.args){
                loading_text = input_data.args.model;
                if(is_localhost)
                {
                    loading_text += "."+input_data.args.method;
                }
            }
            site_functions.showLoader(loading_text);
        }
        if (options.type == 'post')
            url_with_params = options;
    };

    options.success = function(response) {
        var result = false;
        if (!response) {
            console.log("Undefined response", url_with_params);            
        } else if (response.data) {
            response = response.data;
            if (call_backs.success) {
                try{
                    call_backs.success(response);
                }
                catch(er)
                {
                    console.log(response, er);
                }
            } else if(site_config.show_logs.indexOf('ajax_success')){
                return response;
            }
        }
        else {
            if(!response.error)
            {
                response.error = response;
            }
            handleError(response);
        }
    };
    options.complete = function() {
        if (options.onComplete)
            options.onComplete();
        if (!options.no_loader)
            site_functions.hideLoader(loading_text);
    };
    options.error = function(err) {   
        console.log('status '+err.status);
        if(err.status == 0)
        {
            err = 'Could not connect to server '+site_config.server_base_url;
            if(window.navigator.onLine)
            {
                err += ' because no internet connection or server unavailble';
            }
            else
            {
                err += ' because server unavailble';
            }
            console.log(err);
            return;
        }
        if(err.status == 404)
        {
            er = api_url + ' unavailable at '+ site_config.server_base_url;
            console.log(err);
            return;
        }

        if(err.responseText == '{"detail":"Invalid token."}' || 
            err.responseText == '{"detail":"Authentication credentials were not provided."}')
        {
            console.log(input_data.args.method + ' needs login to be accessed');
            handle_authorization(err.responseText);
            return;
        }
        else
        {
            if (err.statusText =='OK')
            {                            
                err = {
                    error: err.responseText
                }     
                handleError(err);       
            }
            else{
                console.log('Api failed to reach');
            }
        }
    };

    function handle_authorization(error){
        try{
            console.log(error);
            var is_admin = ajax_user.cookie.groups.find(function(item){
                return item.name == 'Admin';
            });
            if(!is_admin)
            {
                window['functions'].go_to_login();
            }
        }
        catch(error){
            window['functions'].go_to_login();
        }
        site_functions.hideLoader("ajax" + api_url);
    }


    function handleError(response)
    {
        if(response.error && response.error.data)
        {
            console.log(response.error.data);
            response.error = response.error.message;
        }
        if(response.error){
            response.error = response.error.replace(/<br\/>/g, "\n");
            console.log(response.error);
        }
        response.error = response.error.replace(/[^0-9a-z _]/gi, '')
        var report_str_index = response.error.indexOf('report_error_dev');        
        if(report_str_index > -1)
        {
            response.error = response.error.substr(0, report_str_index);
        }
        if(response.error.length > 200){            
            response.error = response.error.replace(/<br\/>/g, "\n");            
            response.error = response.error.substr(0, 200);
        }
        
        if (response.error.indexOf('oken not valid') > -1 || response.error.indexOf('please login') > -1) {                        
            bootbox.alert('Token expired, please login again '+ options.url);            
            handle_authorization();
            return;
        } else if (response.error.indexOf('not allowed to access') > -1) {
            bootbox.alert("Contact admin for permissions" + response.error);
        } else {                                
            if(response.error.indexOf('Unauthorized') > -1)
            {
                handle_authorization(response.error);
                return;
            }
            else if(call_backs.error) {
                try{
                    call_backs.error(response.error);
                }
                catch(er)
                {                    
                    console.log(response.error, er);
                }                        
            }                
        }
        // if(!site_config.trace_request)
        // {
        // console.log(input_data.args);
        if(options.type == 'GET' && url_with_params.length < 1500)
        {
            console.log(url_with_params);
        }
        // }            
    }
    $.ajax(options);
}
$(function(){
    var container = $('#container');
    if(container.length > 0)
    {
        if(self != top)
        {
            container.css('overflow-x', 'hidden');    
        }
    }    
});
window['ajax_request'] = ajax_request;