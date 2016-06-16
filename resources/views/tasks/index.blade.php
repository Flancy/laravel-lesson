@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-10 col-md-offset-1">
            <div class="panel panel-success">
                <div class="panel-heading">Панель задач</div>

                <div class="panel-body">
                    @include('common.errors')

                    <form action="{{ url('task') }}" method="POST" class="form-horizontal">
                        {!! csrf_field() !!}
                        <div class="form-group">
                            <label for="task" class="col-sm-3 control-label">Задача</label>

                            <div class="col-sm-6">
                                <input type="text" name="name" id="task-name" class="form-control">
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-sm-offset-3 col-sm-6">
                                <button type="submit" class="btn btn-primary">
                                    <i class="fa fa-plus"></i> Добавить задачу
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            @if (count($tasks) > 0)
                <div class="panel panel-primary">
                    <div class="panel-heading">
                        Активные задачи
                    </div>

                    <div class="panel-body">
                        <table class="table table-striped table-hover table-tasks">
                            <tbody>
                                @foreach ($tasks as $task)
                                    <tr class="info">
                                        <td>
                                            <p>{{ $task->name }}</p>
                                        </td>

                                        <td>
                                            <form action="{{ url('task/'.$task->id) }}" method="POST">
                                                {!! csrf_field() !!}
                                                {!! method_field('DELETE') !!}

                                                <button type="submit" class="btn btn-danger pull-right">
                                                    <i class="fa fa-trash"></i> Удалить
                                                </button>
                                            </form>
                                        </td>
                                    </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                </div>
            @endif
        </div>
    </div>
</div>
@endsection
