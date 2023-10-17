<?php

namespace App\Exports;

use App\Models\Task;
use Maatwebsite\Excel\Concerns\FromCollection;

class TasksExport implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Task::all();
    }

    public function headings(): array
    {
        return [
            'ID',
            'Title',
            'Body',
            'Done',
            'Category ID',
            'Created At',
            'Updated At',
        ];
    }
    public function map($task): array
    {
        return [
            $task->id,
            $task->title,
            $task->body,
            $task->done ? 'yes ' :  'No',
            $task->created_at,
            $task->updated_at,
        ];
    }
}
