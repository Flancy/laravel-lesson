@extends('layouts.app')

@section('content')
<div class="container profile">
    <div class="row">
        <div class="col-md-10 col-md-offset-1">
            <div class="panel panel-primary">
                <div class="panel-heading">Чат</div>
                <div class="panel-body">
                    <ul class="list-group" id="chat">
                        @foreach($messages as $message)
                            <li class="clearfix">
                                <span class="chat-img">
                                    <img src="/images/uploads/avatars/{{ $message->user->avatar }}" alt="User Avatar">
                                </span>
                                <div class="chat-body clearfix">
                                    <div class="header">
                                        <strong class="primary-font">{{ $message->author }}</strong>
                                        <small class="text-muted"><i class="fa fa-clock-o"></i> 12 mins ago</small>
                                    </div>
                                    <p>
                                        {{ $message->message }}
                                    </p>
                                </div>
                            </li>
                        @endforeach
                    </ul>
                </div>
            </div>

            <div class="panel panel-primary">
                <div class="panel-heading">Введите сообщение</div>

                <div class="panel-body">
                    <form action="{{ url('chat/message') }}" method="POST" class="form-horizontal" id="formChat">
                        <div class="form-group">
                            <label for="message" class="col-sm-3 control-label">Сообщение</label>
                            <div class="col-sm-6">
                                <textarea name="message" class="form-control"></textarea>
                            </div>
                        </div>
                        {{ csrf_field() }}
                        <div class="form-group">
                            <div class="col-sm-offset-3 col-sm-6">
                                <button type="submit" class="btn btn-success" id="submitChat">
                                    <i class="fa fa-envelope"></i> Отправить сообщение
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
