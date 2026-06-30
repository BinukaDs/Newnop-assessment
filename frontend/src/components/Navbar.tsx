

import { Badge } from '@/components/ui/badge'
import { getInitials, getStatusColor } from '@/lib/formatters.util'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useContext } from 'react'
import { UserContext } from '@/context/user.context'
export function Navbar() {
  const { user, tasks } = useContext(UserContext);
  return (
    <header className="h-16 border-b bg-white flex items-center justify-end px-6">


      <div className="flex items-center gap-6 ml-4">
        <div className="flex items-center gap-3">
          <Badge variant="outline" className={`${getStatusColor("pending")} gap-1.5 px-3 py-1 font-medium`}>
            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
            {tasks.filter(task => task.status === "open").length} Open
          </Badge>
          <Badge variant="outline" className={`${getStatusColor("complete")} gap-1.5 px-3 py-1 font-medium`}>
            <span className="w-1.5 h-1.5 rounded-full bg-green-700"></span>
            {tasks.filter(task => task.status === "complete").length} Completed
          </Badge>
        </div>

        <div className="flex items-center gap-4 border-l pl-6">



          <Avatar className="h-8 w-8 border">

            <AvatarFallback>{user ? getInitials(user.username) : ""}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}