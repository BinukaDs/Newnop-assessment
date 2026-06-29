import { Search, Filter, SlidersHorizontal } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function TaskSearch() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <Input 
          type="text" 
          placeholder="Search tasks..." 
          className="w-full pl-10 bg-slate-50 border-slate-200 focus-visible:ring-blue-500 rounded-lg h-10 shadow-none text-slate-700"
        />
      </div>
      
      <div className="flex items-center gap-3">
        <Button variant="outline" className="h-10 text-slate-600 border-slate-200 hover:bg-slate-50 gap-2">
          <Filter size={16} />
          <span>Status</span>
        </Button>
        <Button variant="outline" className="h-10 text-slate-600 border-slate-200 hover:bg-slate-50 gap-2">
          <Filter size={16} />
          <span>Priority</span>
        </Button>
        <Button variant="outline" className="h-10 text-slate-600 border-slate-200 hover:bg-slate-50 gap-2">
          <SlidersHorizontal size={16} />
          <span>Sort</span>
        </Button>
      </div>
    </div>
  )
}
