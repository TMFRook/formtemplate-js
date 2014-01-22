require.config({
    paths: {
        'jquery': 'vendor/jquery-2.0.3.min',
        'uritemplate': 'vendor/uritemplate-0.3.4.min',
    }
});

require(['jquery', 'uritemplate'], function ($, uritemplate) {
    function toParams(form) {
        var params = {};
        
        for (var i = 0; i < form.elements.length; i++) {
            var input = form.elements[i];
            if (input.name !== undefined) {
                params[input.name] = input.value;
            }
        }
        
        return params;
    }
    
    function disableTemplateInputs(form, template) {
        var inputs = [];

        for(var i=0; i<template.expressions.length; i++) {
            var expr = template.expressions[i];

            if ('templateText' in expr) {
                var input = form.find('input[name="' + expr.templateText + '"]');
                if (input)
                {
                    input.attr("disabled", "disabled");
                    inputs.push(input);
                }
            }
        }

        // in cases where the form submission does not lead to a new page,
        // such as when downloading a file, re-enable the inputs after a tick.
        window.setTimeout(function() {
            for (var i=0; i<inputs.length; i++)
            {
                inputs[i].removeAttr("disabled");
            }
        }, 1000);
    }

    function submitForm(e) {
        var form = $(this);

        $('.formtemplate').remove();

        var action = form.attr("action");

        var template = uritemplate.parse(action);

        var params = toParams(this);

        var expand = template.expand(params);

        var method = form.attr("method") || "GET";

        console.log(method, action, '=>', expand);

        if (method !== "GET" && method !== "POST") {
            $.ajax(expand, {
                data: params,
                type: method,
                success: function(content, status, request) {
                    var text = request.status + ' ' + request.statusText;
                    if (content) {
                        text += ': ' + content;
                    }

                    form.append('<div class="formtemplate">' + text + '</div>');
                },
                error: function(request, status, error) {
                    form.append('<div class="formtemplate error">' + request.status + ' ' + error + '</div>');
                }
            });

            e.preventDefault();
            return false;
        }

        form.attr("action", expand);

        disableTemplateInputs(form, template)
    }
    
    $(document).ready(function() {
        $('form').submit(submitForm);
    });
});