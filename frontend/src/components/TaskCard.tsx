import { ArrowRight, Calendar, EllipsisVertical, TrashIcon, CircleCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";
import type { ITask } from "@/types/task.types";
import { deleteTask } from "@/services/task.service";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function TaskCard({ task, getTasks }: { task: ITask, getTasks: () => Promise<void> }) {
  const getStatusColor = (status: ITask["status"]) => {
    switch (status.toLowerCase()) {
      case "in progress":
        return "bg-sky-100 text-sky-700";
      case "open":
        return "bg-slate-100 text-slate-700";
      case "testing":
        return "bg-orange-100 text-orange-700";
      case "complete":
        return "bg-green-100 text-green-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const getPriorityColor = (priority: ITask["priority"]) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-50 text-red-700";
      case "medium":
        return "bg-amber-50 text-amber-700";
      case "low":
        return "bg-sky-100 text-sky-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const getCardColor = (status: ITask["status"]) => {
    switch (status.toLowerCase()) {
      case "in progress":
        return "bg-blue-50 text-blue-700 hover:bg-blue-100";
      case "open":
        return "bg-gray-50 text-gray-700 hover:bg-gray-100";
      case "testing":
        return "bg-orange-50 text-orange-700 hover:bg-orange-100";
      case "complete":
        return "bg-teal-50 text-teal-700 hover:bg-green-100";
      default:
        return "bg-slate-50 text-slate-700 hover:bg-slate-100";
    }
  };

  const getDueDateColor = (dueDate: ITask["dueDate"]) => {
    const dueTime = new Date(dueDate).getTime();
    const currentTime = new Date().getTime();
    const diff = dueTime - currentTime;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days <= 3) {
      return "text-red-50";
    } else if (days <= 7) {
      return "text-orange-50";
    } else {
      return "text-green-50";
    }
  };

   const handleDeleteTask = async (taskId: string) => {
    console.log(taskId)
    const deleteTaskResponse = await deleteTask(taskId);
    if (deleteTaskResponse && deleteTaskResponse.success) {
      getTasks();
    } 
  }

  return (
    <Card
      className={`shadow-sm transition-all duration-200 ease-in-out  border-slate-200 rounded-xl ${getCardColor(task.status)} overflow-hidden hover:shadow-lg`}
    >
      <CardContent className="px-5 py-1">
        <div className="flex w-full justify-between">
          <div className="flex items-center gap-2 mb-4">
            <Badge
              variant="secondary"
              className={`${getStatusColor(task.status)} border-transparent  text-xs px-2 py-0.5`}
            >
              Status: {task.status}
            </Badge>
            <Badge
              variant="secondary"
              className={`${getPriorityColor(task.priority)} border-transparent  text-xs px-2 py-0.5`}
            >
              Priority: {task.priority}
            </Badge>
          </div>
          {/* <Button variant="ghost">
            <EllipsisVertical size={18} />

          </Button> */}
          {/* <TaskOptions taskId={task.id} /> */}
           <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost">
          <EllipsisVertical />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <ul>
          <li>
            <Button onClick={() => handleDeleteTask(task._id)} variant="ghost" className="w-full rounded-lg justify-start">
              <TrashIcon className="text-red-500"></TrashIcon>Delete
            </Button>
          </li>
          <li>
            {task.status !== "complete" && (
              <Button variant="ghost" className="w-full rounded-lg justify-start">
                <CircleCheck className="text-green-700" />Mark as Complete
              </Button>
            )}
          </li>
        </ul>
      </PopoverContent>
    </Popover>
        </div>

        <h3 className="font-bold text-lg mb-2 text-slate-900">{task.title}</h3>
        <p className="text-slate-500 text-sm mb-6 line-clamp-3 leading-relaxed">
          {task.description}
        </p>

        {/* seperator line */}
        <div className="border-t border-slate-200 my-4"></div>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex -space-x-2">
            {task.assignedTo.username}
          </div>

          <div
            className={`flex  items-center text-slate-400 text-xs font-medium gap-1.5 ${getDueDateColor(task.dueDate)}`}
          >
            <Calendar size={14} />
            {task.dueDate}
          </div>
        </div>
        <div className="w-full flex mt-2 justify-end">
          <Button>
            <ArrowRight size={14} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// function TaskOptions(taskId: string) {
//  

//   return (
   
//   )
// }