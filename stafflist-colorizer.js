var apply = function() {
    if (window["$"] == undefined) {
        setTimeout(apply, 50);
        return;
    }
    $(document).ready(function() {
        (function() {
            var ajax = $.ajax;

            $.ajax = function() {
                var req = arguments[0];
                if (req.url == '/_/staff') {
                    var orSuc = req.success;
                    req.success = function(t, n, as) {
                        window["staff_list"] = t.data;
                        orSuc.apply(this, arguments);
                    };
                }
                return ajax.apply(this, arguments);
            }

        })();
    });
}

apply();

$(".button.staff").on('click', function() {
    var start = function() {
        for (var i = 0; i < window.staff_list.length; i++) {
            var staff = window.staff_list[i];
            var userDivs = $(".list.staff .jspPane .user");
            for (var j = 0; j < userDivs.length; j++) {
                if (userDivs[j].innerText == staff.username) {
                    var chatchar = 'icon-chat-subscriber';
                    var color = '#eee';
                    if (staff.gRole == 5) {
                        chatchar = 'icon-chat-admin';
                        color = '#30C7FB';
                    } else if (staff.gRole == 3) {
                        chatchar = 'icon-chat-ambassador';
                        color = '#95CB00';
                    } else if (staff.role == 5 || staff.role == 4) {
                        chatchar = 'icon-chat-host';
                        if (staff.role == 5) {
                            color = '#4D60FF';
                        } else if (staff.role == 4) {
                            color = '#9F68FF';
                        }
                    } else if (staff.role == 3) {
                        color = '#9F68FF';
                        chatchar = 'icon-chat-manager';
                    } else if (staff.role == 2) {
                        chatchar = 'icon-chat-bouncer';
                        color = '#9F68FF';
                    } else if (staff.role == 1) {
                        chatchar = 'icon-chat-dj';
                        color = '#9F68FF';
                    } else {
                        chatchar = 'icon-chat-subscriber';
                        color = '#c59840';
                    }
                    if ($(userDivs[j]).find('.icon').length == 0) {
                        var icon = document.createElement('i');
                        $(icon)
                            .addClass('icon')
                            .addClass(chatchar)
                            .css('top', '7px')
                            .css('left', '17px');
                        $(userDivs[j]).append(icon);
                    } else {
                        var classes = $(userDivs[j]).find('.icon')[0].classList;
                        if (classes[0] == '.icon') {
                            $(userDivs[j]).find('.icon').removeClass(classes[1]);
                        } else {
                            $(userDivs[j]).find('.icon').removeClass(classes[0]);
                        }
                        $(userDivs[j]).find('.icon').addClass(chatchar);
                    }
                    $(userDivs[j]).find('.name').css('color', color);
                }
            }
        }
    };
    
    var check = function() {
        if (window["staff_list"] == undefined) {
            setTimeout(check, 10);
        } else {
            start();
        }
    };
    check();
});