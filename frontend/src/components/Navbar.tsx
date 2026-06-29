import { Search, Bell } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export function Navbar() {
  return (
    <header className="h-16 border-b bg-white flex items-center justify-end px-6">
     

      <div className="flex items-center gap-6 ml-4">
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="text-slate-600 border-slate-200 bg-slate-50 gap-1.5 px-3 py-1 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
            12 Pending
          </Badge>
          <Badge variant="outline" className="text-slate-600 border-slate-200 bg-slate-50 gap-1.5 px-3 py-1 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            5 Completed
          </Badge>
        </div>

        <div className="flex items-center gap-4 border-l pl-6">
          
          
          
          <Avatar className="h-8 w-8 border">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}