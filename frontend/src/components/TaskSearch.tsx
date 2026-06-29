import { Search, Filter, SlidersHorizontal } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import type { ITask } from '@/types/task.types'
import { useEffect, useState } from 'react'
import { searchTasks } from '@/services/task.service'
import { Spinner } from "@/components/ui/spinner"
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

export function TaskSearch({ setTasks }: { tasks: ITask[], setTasks: React.Dispatch<React.SetStateAction<ITask[]>> }) {

  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (query: string) => {
    if(priorityFilter) {
      query += `&priority=${priorityFilter}`;
    }
    if(statusFilter) {
      query += `&status=${statusFilter}`;
    }
    const searchResponse = await searchTasks(query);
    if (searchResponse && searchResponse.tasks.length > 0) {
      setTasks(searchResponse.tasks);
      setIsLoading(false);
    } else if (searchResponse && searchResponse.tasks.length === 0) {
      setTasks([]);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const timer = setTimeout(async () => {
      setIsLoading(true);

      await handleSearch(search);

    }, 1000);
    return () => { clearTimeout(timer); };

  }, [search, priorityFilter, statusFilter]);


  const handleSort = (sortBy: string) => {
    const sortedTasks = [...tasks].sort((a, b) => {
      if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      } else if (sortBy === "status") {
        return a.status.localeCompare(b.status);
      } else if (sortBy === "priority") {
        return a.priority.localeCompare(b.priority);
      } else if (sortBy === "dueDate") {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
      return 0;
    });
    setTasks(sortedTasks);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <Input
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search tasks..."
          className="w-full pl-10 bg-slate-50 border-slate-200 focus-visible:ring-blue-500 rounded-lg h-10 shadow-none text-slate-700"
        />
        {isLoading && <Spinner className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />}
      </div>

      <div className="flex items-center gap-3">
        {/* <Button variant="outline" className="h-10 text-slate-600 border-slate-200 hover:bg-slate-50 gap-2">
          <Filter size={16} />
          <span>Status</span>
        </Button> */}
        <Popover>
          <PopoverTrigger>
            <Button variant="outline" className="h-10 text-slate-600 border-slate-200 hover:bg-slate-50 gap-2">
              <Filter size={16} />
              <span>Priority</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            {/* Priority options go here */}
            <ul>
              <li><Button variant="ghost" onClick={() => setPriorityFilter("high")} className="w-full justify-start">High</Button></li>
              <li><Button variant="ghost" onClick={() => setPriorityFilter("medium")} className="w-full justify-start">Medium</Button></li>
              <li><Button variant="ghost" onClick={() => setPriorityFilter("low")} className="w-full justify-start">Low</Button></li>
            </ul>
          </PopoverContent>
        </Popover>
        <Button variant="outline" className="h-10 text-slate-600 border-slate-200 hover:bg-slate-50 gap-2">
          <SlidersHorizontal size={16} />
          <span>Sort</span>
        </Button>
      </div>
    </div>
  )
}
