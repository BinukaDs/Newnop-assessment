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
import { useNavigate } from "react-router"
import { formatDate, getStatusColor, getPriorityColor, getCardColor, getDueDateColor } from '@/lib/formatters.util'

export function TaskCard({ task, getTasks }: { task: ITask, getTasks: () => Promise<void> }) {
  const navigate = useNavigate();


  const handleDeleteTask = async (taskId: string) => {
    console.log(taskId)
    const deleteTaskResponse = await deleteTask(taskId);
    if (deleteTaskResponse && deleteTaskResponse.success) {
      getTasks();
    }
  }

  return (
    <Card
      className={`animate-in fade-in zoom-in-95 duration-200 shadow-sm transition-all ease-in-out  border-slate-200 rounded-xl ${getCardColor(task.status)} overflow-hidden hover:shadow-lg`}
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
        <p className="text-slate-500  text-sm mb-6 line-clamp-3 leading-relaxed">
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
            {formatDate(task.dueDate)}
          </div>
        </div>
        <div className="w-full flex mt-2 justify-end">
          <Button onClick={() => navigate(`/tasks/${task._id}`)}>
            <ArrowRight size={14} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

