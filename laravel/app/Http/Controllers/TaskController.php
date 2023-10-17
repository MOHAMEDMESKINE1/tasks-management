<?php

namespace App\Http\Controllers;

use Exception;
use Carbon\Carbon;
use App\Models\Task;
use App\Models\Category;
use Illuminate\Support\Str;
use App\Exports\TasksExport;
use Illuminate\Http\Request;
use App\Http\Requests\TaskRequest;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\UpdateRequest;
use Illuminate\Support\Facades\File;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\Storage;

class TaskController extends Controller
{
    public function index(){
        try {
            $tasks =  Task::with('category')->paginate(5);
            return response()->json($tasks);

        } catch (Exception $ex) {
            return response()->json( [
                 "ERROR TaskController.index : ".$ex->getMessage()
                
                ]);

        }
    }
    public function all(){
  

   try {
       return Task::all();
   } catch (Exception $ex) {

    return response()->json( [
         "ERROR TaskController.exportExcel : ".$ex->getMessage()
        
        ]);

    }
}

    public function tasksChart(){
        try {

            $today = Carbon::now();
            $startDate = Carbon::create(date('Y'), 1, 1); // Start from January 1st of the current year
        
            $tasks =Task::select(DB::raw("COUNT(*) as count"), DB::raw("DATE(created_at) as date"))
                ->whereBetween('created_at', [$startDate, $today])
                ->groupBy('date')
                ->pluck('count', 'date');
            
            // $tasks = Task::select("title","id","created_at")->get();
            return response()->json( $tasks);

        } catch (Exception $ex) {

            return response()->json( [
                 "ERROR TaskController.tasksChart : ".$ex->getMessage()
                
                ]);

        }
      
    
    }
    public function CompletedTasksByDate()
    {
       
       try {
       
        $tasks = Task::select(
            DB::raw('DATE(created_at) as completion_date'),
            DB::raw('COUNT(CASE WHEN done = 1 THEN 1 END) as completed_count'),
            DB::raw('COUNT(CASE WHEN done = 0 THEN 1 END) as not_completed_count')
        )
        ->groupBy('completion_date')
        ->get();
    
        return response()->json($tasks);
       } catch (Exception $ex) {

        return response()->json( [
            "ERROR TaskController.CompletedTasksByDate : ".$ex->getMessage()
           
           ]);
       }
    }
    public function store(TaskRequest $request){
        try{
            $photoName = Str::random().'.'.$request->photo->getClientOriginalExtension();
            Storage::disk('public')->putFileAs('tasks/photos', $request->photo,$photoName);
    
            $task = Task::create([
                'title'=> $request->title,
                'body'=> $request->body,
                'category_id'=> $request->category_id,
                'photo' =>  $photoName ?? null,
                'done'=> $request->done ,
            ]);
    
            return response()->json($task);
        }catch(Exception $ex){

            return response()->json( [
                "ERROR TaskController.store : ".$ex->getMessage()
               
               ]);
        }
    }
    public function getTaskByTerm ($term){
        
        $tasks= Task::with('category')
        ->where('title','like','%'.$term.'%')
        ->orWhere('body','like','%'.$term.'%')
        ->orWhere('id','like','%'.$term.'%')
        ->paginate(10);

        return response()->json($tasks);
    }
    public function show ($id){

       try {
            
            $taskExists = Task::where('id', $id)->exists();

            if ($taskExists) {

                $task =Task::with('category')->findOrFail($id);;

               return  response()->json($task);
            } 
       } catch (Exception $ex) {
            return response()->json( [
            "ERROR TaskController.show : ".$ex->getMessage()
           
           ]);
       }        

    }
    public function getTaskByCatgeory ($id){

        $category = Category::where('id', $id)->first();
        return $category->tasks()->with("category")->paginate(5);
        
}

    public function getTaskOrderBy($column,$direction){

        $task = Task::with('category')->orderBy($column,$direction)->paginate(5);
        return $task;
        
    }
    public function update(UpdateRequest $request, $id)
    {
        try {
            $task = Task::find($id);
    
         
            if ($request->hasFile('photo')) {
                // remove old photo
                if ($task->photo) {
                    $exists = Storage::disk('public')->exists("tasks/photos/{$task->photo}");
                    if ($exists) {
                        Storage::disk('public')->delete("tasks/photos/{$task->photo}");
                    }
                }
    
                $photoName = Str::random() . '.' . $request->photo->getClientOriginalExtension();
                Storage::disk('public')->putFileAs('tasks/photos', $request->photo, $photoName);
    
               
                $task->photo = $photoName;
            
            }
           
            $task->update([
                'title' => $request->title,
                'body' => $request->body,
                'category_id' => $request->category_id,
                'done' => $request->done ?? 0,
            ]);
    
            return response()->json($task);
        } catch (Exception $ex) {
            return response()->json([
                'error' => $ex->getMessage(),
            ]);
        }
    }
  
    
    public function destroy (Task $task){
        try {

          
            if($task->photo){
                $exists = Storage::disk('public')->exists("tasks/photos/{$task->photo}");
                if($exists){
                    Storage::disk('public')->delete("tasks/photos/{$task->photo}");
                }
            }

            $task->delete();

            return response()->json([
                'message'=>'photo Deleted Successfully!!'
            ]);

        } catch (Exception $ex) {

                return response()->json( [
                "ERROR TaskController.destroy : ".$ex->getMessage()
            
            ]);
        
        }
    }
}
