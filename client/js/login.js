'use strict';

var API_URL = 'http://104.131.0.206:3004/api/'

    var credentials = {
        username: $('#username').val(),
        password: $('#password').val()
    }

    console.log(credentials);

    function login(e) {
        if (e) {
            e.preventDefault()
        }

        console.log(credentials);
        
        $.ajax({
            url: API_URL + 'usuarios/login',
            type: 'post',
            data: {
                    'username': document.getElementById('username').value.toLowerCase(),
                    'password': document.getElementById('password').value 
            },
            success: function(session) {
                console.log(session);
                $.ajax({
                    url: API_URL + 'usuarios/' +
                         session.userId +
                        '?access_token=' + session.id,
                    type: 'get',
                    success: function(user) {
                        window.localStorage.setItem("$p-token",JSON.stringify(session));
                        window.localStorage.setItem("$p-user",JSON.stringify(user));

                        window.location.href = "./admin.html";
                         
                    },
                    error: function(err) {
                        console.log('Error trying to retrieve user', err)
                    }
                })
            },
            error: function(err) {
                console.log('Error trying to login', err)
            }

        })
    }