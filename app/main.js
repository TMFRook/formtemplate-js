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
        for(var i=0; i<template.expressions.length; i++) {
            var expr = template.expressions[i];

            if ('templateText' in expr) {
                form.find('input[name="' + expr.templateText + '"]').attr("disabled", "disabled");
            }
        }
    }

    function submitForm(e) {
        var form = $(this);
        var action = form.attr("action");

        var template = uritemplate.parse(action);

        var params = toParams(this);

        var expand = template.expand(params);

        console.log(action, '=>', expand);

        form.attr("action", expand);

        disableTemplateInputs(form, template)
    }
    
    $(document).ready(function() {
        $('form').submit(submitForm);
    });
});