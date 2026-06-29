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
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const applySort = (tasksList: ITask[], sortVal: string | null) => {
    if (!sortVal) return tasksList;
    return [...tasksList].sort((a, b) => {
      if (sortVal === "title") {
        return a.title.localeCompare(b.title);
      } else if (sortVal === "status") {
        return a.status.localeCompare(b.status);
      } else if (sortVal === "priorityHighLow") {
        const weights: Record<string, number> = { high: 3, medium: 2, low: 1 };
        return (weights[b.priority.toLowerCase()] || 0) - (weights[a.priority.toLowerCase()] || 0);
      } else if (sortVal === "priorityLowHigh") {
        const weights: Record<string, number> = { high: 3, medium: 2, low: 1 };
        return (weights[a.priority.toLowerCase()] || 0) - (weights[b.priority.toLowerCase()] || 0);
      } else if (sortVal === "dueDate") {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
      return 0;
    });
  };

  const handleSearch = async (query: string, activeSort: string | null = sortBy) => {
    const params: { search?: string; priority?: string; status?: string } = {};
    if (query) params.search = query;
    if (priorityFilter) params.priority = priorityFilter;
    if (statusFilter) params.status = statusFilter;
    
    const searchResponse = await searchTasks(params);
    if (searchResponse && searchResponse.tasks) {
      setTasks(applySort(searchResponse.tasks, activeSort));
    } else {
      setTasks([]);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    const timer = setTimeout(async () => {
      setIsLoading(true);

      await handleSearch(search);

    }, 1000);
    return () => { clearTimeout(timer); };

  }, [search, priorityFilter, statusFilter]);


  const handleSort = (sortVal: string | null) => {
    setSortBy(sortVal);
    if (!sortVal) {
      handleSearch(search, null);
    } else {
      setTasks(prev => applySort(prev, sortVal));
    }
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
        {isLoading && <Spinner className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />}
      </div>

      <div className="flex items-center gap-3">
        <Popover>
          <PopoverTrigger>
            <Button variant="outline" className={`h-10 border-slate-200 gap-2 ${statusFilter ? 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100' : 'text-slate-600 hover:bg-slate-50'}`}>
              <Filter size={16} />
              <span>{statusFilter ? `Status: ${statusFilter}` : 'Status'}</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <ul>
              <li><Button variant="ghost" onClick={() => setStatusFilter(null)} className={`w-full justify-start ${!statusFilter ? "bg-slate-100 font-bold" : ""}`}>All</Button></li>
              <li><Button variant="ghost" onClick={() => setStatusFilter(prev => prev === "open" ? null : "open")} className={`w-full justify-start ${statusFilter === "open" ? "bg-slate-100 font-bold" : ""}`}>Open</Button></li>
              <li><Button variant="ghost" onClick={() => setStatusFilter(prev => prev === "in-progress" ? null : "in-progress")} className={`w-full justify-start ${statusFilter === "in-progress" ? "bg-slate-100 font-bold" : ""}`}>In Progress</Button></li>
              <li><Button variant="ghost" onClick={() => setStatusFilter(prev => prev === "testing" ? null : "testing")} className={`w-full justify-start ${statusFilter === "testing" ? "bg-slate-100 font-bold" : ""}`}>Testing</Button></li>
              <li><Button variant="ghost" onClick={() => setStatusFilter(prev => prev === "complete" ? null : "complete")} className={`w-full justify-start ${statusFilter === "complete" ? "bg-slate-100 font-bold" : ""}`}>Complete</Button></li>
            </ul>
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger>
            <Button variant="outline" className={`h-10 border-slate-200 gap-2 ${priorityFilter ? 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100' : 'text-slate-600 hover:bg-slate-50'}`}>
              <Filter size={16} />
              <span>{priorityFilter ? `Priority: ${priorityFilter}` : 'Priority'}</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            {/* Priority options go here */}
            <ul>
              <li><Button variant="ghost" onClick={() => setPriorityFilter(null)} className={`w-full justify-start ${!priorityFilter ? "bg-slate-100 font-bold" : ""}`}>All</Button></li>
              <li><Button variant="ghost" onClick={() => setPriorityFilter(prev => prev === "high" ? null : "high")} className={`w-full justify-start ${priorityFilter === "high" ? "bg-slate-100 font-bold" : ""}`}>High</Button></li>
              <li><Button variant="ghost" onClick={() => setPriorityFilter(prev => prev === "medium" ? null : "medium")} className={`w-full justify-start ${priorityFilter === "medium" ? "bg-slate-100 font-bold" : ""}`}>Medium</Button></li>
              <li><Button variant="ghost" onClick={() => setPriorityFilter(prev => prev === "low" ? null : "low")} className={`w-full justify-start ${priorityFilter === "low" ? "bg-slate-100 font-bold" : ""}`}>Low</Button></li>
            </ul>
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger>
            <Button variant="outline" className={`h-10 border-slate-200 gap-2 ${sortBy ? 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100' : 'text-slate-600 hover:bg-slate-50'}`}>
              <SlidersHorizontal size={16} />
              <span>{sortBy ? `Sort: ${sortBy}` : 'Sort'}</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <ul>
              <li><Button variant="ghost" onClick={() => handleSort(null)} className={`w-full justify-start ${!sortBy ? "bg-slate-100 font-bold" : ""}`}>None</Button></li>
              <li><Button variant="ghost" onClick={() => handleSort("title")} className={`w-full justify-start ${sortBy === "title" ? "bg-slate-100 font-bold" : ""}`}>Title</Button></li>
              <li><Button variant="ghost" onClick={() => handleSort("dueDate")} className={`w-full justify-start ${sortBy === "dueDate" ? "bg-slate-100 font-bold" : ""}`}>Due Date</Button></li>
              <li><Button variant="ghost" onClick={() => handleSort("priorityHighLow")} className={`w-full justify-start ${sortBy === "priorityHighLow" ? "bg-slate-100 font-bold" : ""}`}>Priority (High to Low)</Button></li>
              <li><Button variant="ghost" onClick={() => handleSort("priorityLowHigh")} className={`w-full justify-start ${sortBy === "priorityLowHigh" ? "bg-slate-100 font-bold" : ""}`}>Priority (Low to High)</Button></li>
              <li><Button variant="ghost" onClick={() => handleSort("status")} className={`w-full justify-start ${sortBy === "status" ? "bg-slate-100 font-bold" : ""}`}>Status</Button></li>
            </ul>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
