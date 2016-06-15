<?php

namespace App\Http\Controllers;

use App\Task;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Repositories\TaskRepository;
use Response;

class TaskController extends Controller
{

    protected $tasks;

    public function __construct(TaskRepository $tasks)
    {
        $this->middleware('auth');

        $this->tasks = $tasks;
    }

    public function index(Request $request)
    {
        return view('tasks.index', [
            'tasks' => $this->tasks->forUser($request->user()),
        ]);
    }

    public function show(Request $request)
    {
        if($request->ajax()) {
            $userTasks = $this->tasks->forUser($request->user());
            $i = 0;
            foreach ($userTasks as $task) {
                $dateTask[$i] = $task->created_at;
                $i++;
            }

            return Response::json($dateTask);
        }

        return abort(404);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|max:255',
        ]);

        $request->user()->tasks()->create([
            'name' => $request->name,
        ]);

        return redirect('/task');
    }

    public function destroy(Request $request, Task $task)
    {
        $this->authorize('destroy', $task);

        $task->delete();

        return redirect('/task');
    }
}
