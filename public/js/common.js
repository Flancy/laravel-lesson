function getDataTask (handleData) {
    $.ajax({
        type: 'POST',
        url: '/task/show',
        dataType: 'JSON',
        data: {
            _token: $('meta[name="_token"]').attr('content')
        },
        success:function(data) {
          handleData(data);
        }
    });
}

function countTaskInDat (arrayDays) {
    var countTask = [0, 0, 0, 0, 0, 0, 0], i = 0;

    for (i; i < arrayDays.length; ++i) {
        switch (arrayDays[i]) {
            case 0:
                countTask[0]++;
                break;
            case 1:
                countTask[1]++;
                break;
            case 2:
                countTask[2]++;
                break;
            case 3:
                countTask[3]++;
                break;
            case 4:
                countTask[4]++;
                break;
            case 5:
                countTask[5]++;
                break;
            case 6:
                countTask[6]++;
                break;
            default:
                'Такого значения нет';
        }
    }

    return countTask;
}

function selectFile(element) {
    if (element.lastIndexOf('\\')){
        var i = element.lastIndexOf('\\')+1;
    }
    else{
        var i = element.lastIndexOf('/')+1;
    }
    var filename = element.slice(i);
    var uploaded = document.getElementById("changeAvatar");
    uploaded.innerHTML = filename;
}

function appendMessage(data) {
    $('#chat').append(
        '<li class="clearfix"><span class="chat-img"><img src="/images/uploads/avatars/'+data.user.avatar+'" alt="User Avatar"></span><div class="chat-body clearfix"><div class="header"><strong class="primary-font">'+data.author+'</strong><small class="text-muted"><i class="fa fa-clock-o"></i> 12 mins ago</small></div><p>'+data.message+'</p></div></li>'
    );
    $(function(){
        var chat = $('#chat');
        chat.scrollTop(chat.prop('scrollHeight'));
    });
}

$(document).ready(function () {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content'),
            'X-Requested-With': 'XMLHttpRequest'
        }
    });

    var pathname = window.location.pathname;

    if (pathname == '/home') {
        var dataTask;
        var arrayTaskDays = [];
        var ctxTwo = document.getElementById("myChartTwo");
        var ctx = document.getElementById("myChart");

        var data = {
            labels: ["9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00","16:00","17:00","18:00","19:00"],
            datasets: [
                {
                    label: "Добавленные задачи",
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: "rgba(75,192,192,0.4)",
                    borderColor: "rgba(75,192,192,1)",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "rgba(75,192,192,1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(75,192,192,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [1, 5, 12, 23, 23, 45, 47, 50, 50, 72, 23],
                }
            ]
        };

        var myLineChart = Chart.Line(ctx, {
            data: data,
            options: {
                scales: {
                    xAxes: [{
                        display: true
                    }]
                }
            }
        });

        getDataTask(function (output) {
            //dataTask = JSON.stringify (output, ["date"]);
            for (var i in output) {
                var date = new Date(output[i].date);
                arrayTaskDays[i] = date.getDay();
            }
            arrayTaskDays = countTaskInDat (arrayTaskDays);

            var dataTwo = {
                labels: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
                datasets: [
                    {
                        label: "Добавленные задачи",
                        backgroundColor: "rgba(255,99,132,0.2)",
                        borderColor: "rgba(255,99,132,1)",
                        borderWidth: 1,
                        hoverBackgroundColor: "rgba(255,99,132,0.4)",
                        hoverBorderColor: "rgba(255,99,132,1)",
                        data: arrayTaskDays,
                    }
                ]
            };

            var myBarChart = new Chart(ctxTwo, {
                type: 'bar',
                data: dataTwo,
                options: {
                    yAsix: false
                }
            });
        });
    }

    else if (pathname == '/profile') {
        // Profile
        var formAvatar = $("#formAvatar");
        var avatarProgress = $("#formAvatar .progress");
        var avatarProgressBar = $("#formAvatar .progress-bar");
        var dropdownAvatar = $(".dropdown .dropdown-avatar .avatar");
        var profileAvatar = $(".profile .avatar");
        var changeAvatar = $("#changeAvatar");

        $(formAvatar).submit(function (event) {
            event.preventDefault();
            var form = $(this);
            var formData = new FormData($('#formAvatar')[0]);
            avatarProgress.show();

            $.ajax({
                type: form.attr('method'),
                url: form.attr('action'),
                data: formData,
                processData: false,
                contentType: false,
                cache: false,
                xhr: function(){
                    var xhr = $.ajaxSettings.xhr();
                    xhr.upload.addEventListener('progress', function(evt){
                        if(evt.lengthComputable) {
                            var percentComplete = Math.ceil(evt.loaded / evt.total * 100);
                            avatarProgressBar.css('width', percentComplete+'%');
                        }
                    }, false);
                    return xhr;
                },
                success: function (data) {
                    dropdownAvatar.attr('src', '/images/uploads/avatars/'+data[0].avatar);
                    profileAvatar.attr('src', '/images/uploads/avatars/'+data[0].avatar);
                    avatarProgress.hide();
                    avatarProgressBar.css('width', '0%');
                }
            });
        });
    }

    else if (pathname == '/task') {
        var formTask = $('#formTask');
        var submitTask = $('#submitTask');
        var tableTasks = $('#tableTasks');

        $(formTask).submit(function (event) {
            event.preventDefault();
            var form = $(this);

            $.ajax({
                type: form.attr('method'),
                url: form.attr('action'),
                data: form.serialize(),
                beforeSend: function () {
                    $(submitTask).html('<i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i><span class="sr-only">Loading...</span> Добавление задачи');
                },
                success: function (data) {
                    $(submitTask).html('<i class="fa fa-plus"></i> Добавить задачу');
                    $(tableTasks).append('<tr class="info"><td><p>'+data.name+'</p></td><td><form action="/task/'+data.id+'" method="POST" class="formDeleteTask"><input type="hidden" name="_method" value="DELETE"><button type="submit" class="btn btn-danger pull-right submitDeleteTask"><i class="fa fa-trash"></i> Удалить</button></form></td></tr>');
                },
                error: function () {
                    $(submitTask).html('<i class="fa fa-plus"></i> Добавить задачу');
                }
            });
        });
        $(document).on('submit','.formDeleteTask', function (event) {
            event.preventDefault();
            var form = $(this);

            $.ajax({
                type: form.attr('method'),
                url: form.attr('action'),
                data: form.serialize(),
                beforeSend: function () {
                    $(form).find('.submitDeleteTask').html('<i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i><span class="sr-only">Loading...</span> Удаление');
                },
                error: function () {
                    $(form).find('.submitDeleteTask').html('<i class="fa fa-trash"></i> Удалить');
                }
            });
        });
    }

    else if (pathname == '/chat') {
        var socket = io(':6001'),
            channel = 'chat:message';

        socket.on('connect', function() {
            socket.emit('subscribe', channel);
        });

        socket.on('error', function(error) {
            console.warn('Error', error);
        });

        socket.on('message', function(message) {
            console.info(message);
        });

        $(function(){
            var chat = $('#chat');
            chat.scrollTop(chat.prop('scrollHeight'));
        });

        $(document).on('submit', '#formChat', function (event) {
            event.preventDefault();
            var form = $(this);

            $.ajax({
                type: form.attr('method'),
                url: form.attr('action'),
                data: form.serialize(),
                beforeSend: function () {
                    $(form).find('#submitChat').html('<i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i><span class="sr-only">Loading...</span> Отправка сообщения');
                },
                success: function (data) {
                    $(form).find('#submitChat').html('<i class="fa fa-envelope"></i> Отправить сообщение');
                    $(form)[0].reset();
                },
                error: function () {
                    $(form).find('#submitChat').html('<i class="fa fa-envelope"></i> Отправить сообщение');
                }
            });
        });

        socket.on('chat:message', function(data) {
            appendMessage(JSON.parse(data));
        });
    }

});
