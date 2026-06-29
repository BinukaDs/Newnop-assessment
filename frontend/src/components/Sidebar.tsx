import { LayoutDashboard, BarChart2, Settings, HelpCircle, LogOut } from 'lucide-react'

export function Sidebar() {
  return (
    <div className="w-64 h-screen bg-slate-50 border-r flex flex-col justify-between py-6">
      <div>
        <div className="px-6 mb-8 flex items-center gap-2">
          <img src="logo.avif" alt="Logo" className='w-10 h-10'/>
          <div>
            <h1 className="font-bold text-lg leading-tight">Newnop</h1>
            <p className="text-xs text-slate-500">Task Management</p>
          </div>
        </div>

        <nav className="space-y-1 px-4">
          <a href="#" className="flex items-center gap-3 px-4 py-3 bg-blue-600 text-white rounded-lg">
            <LayoutDashboard size={18} />
            <span className="font-medium text-sm">Dashboard</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-100 rounded-lg">
            <BarChart2 size={18} />
            <span className="font-medium text-sm">Analytics</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-100 rounded-lg">
            <Settings size={18} />
            <span className="font-medium text-sm">Settings</span>
          </a>
        </nav>
      </div>

      <div className="px-4 space-y-1 border-t pt-4">
        <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-100 rounded-lg">
          <HelpCircle size={18} />
          <span className="font-medium text-sm">Help</span>
        </a>
        <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-100 rounded-lg">
          <LogOut size={18} />
          <span className="font-medium text-sm">Logout</span>
        </a>
      </div>
    </div>
  )
}
