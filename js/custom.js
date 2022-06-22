$(document).ready(function(){
    
    var href = window.location.href.split('/');
    
    $(document).on("submit", "#registerForm", function() {
        btc_address = $('#registerForm input[name=btc_address]').val();
        
        $.post("/auth/register",
            {
                "btc_address": btc_address
            },
            function(data) {
                if (data.status == 'success') {
                    window.location.replace(data.base_url);
                } else {
                    if (data.error.btc_address != '') {
                        $('#registerForm input[name=btc_address]').parent().addClass("has-error");
                        $('#registerForm input[name=btc_address]').next().text(data.error.btc_address);
                        $('#registerForm input[name=btc_address]').focus();
                    } else {
                        $('#registerForm input[name=btc_address]').parent().removeClass("has-error");
                        $('#registerForm input[name=btc_address]').next().text('');
                    }
                }
            },
            "json"
        );
        
        return false;
    });
    
    $(document).on("submit", "#contactForm", function () {
        name = $('#contactForm input[name=name]').val();
        email = $('#contactForm input[name=email]').val();
        message = $('#contactForm textarea').val();
        
        $('#contactForm #name_error').text('');
        $('#contactForm #email_error').text('');
        $('#contactForm #message_error').text('');
        
        $.post("/main/send_message",
            {
                "name": name,
                "email": email,
                "message": message
            },
            function (data) {
                if (data.status == 'success') {
                    $('#contactForm input[name=name]').val('');
                    $('#contactForm textarea').val('');
                        
                    $('#contact_form_success').text(data.info);
                    setTimeout(function () {
                        $('#contact_form_success').hide("fast");
                    }, 5000);
                } else {
                    if (data.error.message != '') {
                        $('#contactForm #message_error').text(data.error.message);
                    } else {
                        $('#contactForm #message_error').text('');
                    }
                    
                    if (data.error.email != '') {
                        $('#contactForm #email_error').text(data.error.email);
                        $('#contactForm input[name=email]').focus();
                    } else {
                        $('#contactForm #email_error').text('');
                    }
                    
                    if (data.error.name != '') {
                        $('#contactForm #name_error').text(data.error.name);
                        $('#contactForm input[name=name]').focus();
                    } else {
                        $('#contactForm #name_error').text('');
                    }
                }
            },
            "json"
        );

        return false;
    });
    
});