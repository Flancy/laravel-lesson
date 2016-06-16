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

var dataTwo = {
    labels: ["Воскресенье", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Понедельник"],
    datasets: [
        {
            label: "Добавленные задачи",
            backgroundColor: "rgba(255,99,132,0.2)",
            borderColor: "rgba(255,99,132,1)",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
            data: [65, 59, 80, 81, 56, 55, 40],
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

$(document).ready(function () {
    var dataTask;
    var arrayTaskDays = [];
    var ctxTwo = document.getElementById("myChartTwo");

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


});
