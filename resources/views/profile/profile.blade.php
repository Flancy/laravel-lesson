@extends('layouts.app')

@section('content')
<div class="container profile">
    <div class="row">
        <div class="col-md-10 col-md-offset-1">
            <div class="panel panel-primary">
                <div class="panel-heading">Мой профиль!</div>

                <div class="panel-body clearfix">
                    <img src="/images/uploads/avatars/{{ $user->avatar }}" alt="{{ $user->name }}" class="avatar" />
                    <h3>{{ $user->name }}</h3>
                    <form action="/profile" method="post" enctype="multipart/form-data" class="form-avatar" id="formAvatar">
                        <div class="form-group">
                            <label for="avatar" class="control-label">
                                Обновить изображение профиля
                            </label>
                        </div>
                        <div class="form-group">
                            <label class="btn btn-success btn-file">
                                Выберите файл... <input name="avatar" type="file" onchange="selectFile(this.value);">
                            </label>
                            <span id="changeAvatar">Файл не выбран</span>
                        </div>
                        <div class="form-group">
                            <div class="progress progress-striped active">
                                <div class="progress-bar progress-bar-success"></div>
                            </div>
                            <input type="submit" name="submit" value="Отправить" class="btn btn-sm btn-primary" id="submitAvatar">
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
