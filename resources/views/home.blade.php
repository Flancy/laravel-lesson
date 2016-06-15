@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-10 col-md-offset-1">
            <div class="panel panel-primary">
                <div class="panel-heading">Панель управления</div>

                <div class="panel-body">
                    Вы успешно вошли!
                </div>
            </div>
        </div>

        <div class="col-md-5 col-md-offset-1">
            <div class="panel panel-primary">
                <div class="panel-heading">Количество задач</div>

                <div class="panel-body">
                    <canvas id="myChart" width="400" height="400"></canvas>
                </div>
            </div>
        </div>
        <div class="col-md-5">
            <div class="panel panel-primary">
                <div class="panel-heading">Добавленные задачи</div>

                <div class="panel-body">
                    <canvas id="myChartTwo" width="400" height="400"></canvas>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
