import { ArrowLeft, CheckCircle2, Calendar, CalendarCheck, Pencil, TrashIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useNavigate, useParams } from 'react-router'
import { Sidebar } from '@/components/Sidebar'
import { Navbar } from '@/components/Navbar'
import { useContext, useEffect } from 'react'
import { UserContext } from '@/context/user.context'
import { getTaskById, markAsComplete, updateTask, deleteTask } from '@/services/task.service'
import type { ITask } from '@/types/task.types'
import { useState, useRef } from 'react'
import { formatDate, getStatusColor, getPriorityColor, getCardColor, getInitials } from '@/lib/formatters.util'
import { Dialog, DialogContent, DialogClose, DialogTrigger, DialogTitle, DialogDescription, DialogHeader, DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectTrigger, SelectContent, SelectItem, SelectGroup, SelectValue } from '@/components/ui/select'
import type { IUser } from '@/types/auth.types'
import { getUsers } from '@/services/user.service'
import { TaskDetailSkeleton } from '@/components/skeletons/TaskDetailSkeleton'



export function TaskDetail() {
  const navigate = useNavigate();
  const { user, tasks } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const { taskId } = useParams();
  const [task, setTask] = useState<ITask | null>(null);
  const isAdmin = user.role === "admin";
  const [isLoading, setIsLoading] = useState(false);



  const getUsersData = async () => {

    try {
      setIsLoading(true);
      const data = await getUsers();
      if (!data) {
        return;
      }
      setUsers(data.users);

    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleMarkAsComplete = async () => {
    if (task?.status !== "complete") {
      const updateResponse = await markAsComplete(task._id);
      if (updateResponse) {

        setTask(updateResponse.task);
      }
    }
  }

  

  

  const handleDeleteTask = async () => {
    if (task) {
      const deleteResponse = await deleteTask(task._id);
      if (deleteResponse) {
        navigate(-1);
      }
    }
  };

  useEffect(() => {
    const run = async () => {
      setIsLoading(true);
      if (tasks.length === 0) {
        await getTaskById(taskId)
          .then(response => {
            if (response) {
              setTask(response.task);
            }
          });
      } else {
        setTask(tasks.find(t => t._id === taskId) || null);
      }
      if (isAdmin) { await getUsersData(); }
      setIsLoading(false);
    }
    run();
  }, [])
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50/50">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <Navbar />

        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-5xl mx-auto w-full animate-in fade-in zoom-in-95 duration-200">

            {isLoading ? (
              <TaskDetailSkeleton />
            ) : task ? (
              <div>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                  <div className="flex items-center gap-3">
                    <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="text-slate-500 hover:text-slate-900 rounded-full h-8 w-8">
                      <ArrowLeft size={20} />
                    </Button>
                    <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{task.title}</h2>
                  </div>
                  <div className="flex items-center gap-3 pl-11 md:pl-0">
                    {task.status !== "complete" && <Button onClick={handleMarkAsComplete}>
                      <CheckCircle2 size={16} />
                      <span>Mark as Complete</span>
                    </Button>}
                    <EditTaskModal task={task} users={users} onUpdate={setTask} isAdmin={isAdmin} />
                    <DeleteTaskModal taskId={task._id} onDelete={handleDeleteTask} />
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                  <div className="lg:col-span-2">
                    <Card className="shadow-sm border-slate-200 rounded-xl overflow-hidden h-full">
                      <CardContent className="p-6">
                        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Description</h3>

                        <div className="text-slate-700 space-y-4 leading-relaxed whitespace-pre-wrap">
                          {task.description}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="space-y-6">
                    <Card className={`shadow-sm  rounded-xl overflow-hidden ${getCardColor(task.status)}`}>
                      <CardContent className="p-6">
                        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-5">Details</h3>

                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-slate-600 text-sm">Status</span>
                            <Badge variant="secondary" className={`${getStatusColor(task.status)} border-transparent rounded-full font-medium px-2.5 py-0.5 gap-1.5 flex items-center`}>
                              {task.status}
                            </Badge>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-slate-600 text-sm">Priority Level</span>
                            <Badge variant="secondary" className={`${getPriorityColor(task.priority)} border-transparent rounded-full font-medium px-2.5 py-0.5 gap-1.5 flex items-center`}>

                              {task.priority}
                            </Badge>
                          </div>

                          <div className="border-t border-slate-100 pt-4 mt-2 space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 text-slate-600 text-sm">
                                <Calendar size={16} className="text-slate-400" />
                                <span>Created Date</span>
                              </div>
                              <span className="text-sm font-medium text-slate-800">{formatDate(task.createdAt)}</span>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 text-slate-600 text-sm">
                                <CalendarCheck size={16} className="text-slate-400" />
                                <span>Due Date</span>
                              </div>
                              <span className="text-sm font-bold text-[#005ab4]">{formatDate(task.dueDate)}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="shadow-sm border-slate-200 rounded-xl overflow-hidden">
                      <CardContent className="p-6">
                        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Assigned To</h3>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10 border border-slate-200">
                            <AvatarFallback className="bg-slate-200 text-slate-600">{getInitials(task.assignedTo.username)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-bold text-slate-900">{task.assignedTo.username}</p>
                          </div>
                        </div>

                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>) : (<div className="text-center py-20">
                <p className="text-slate-500 text-sm">Task not found.</p>
              </div>)}
          </div>
        </main>
      </div>
    </div>
  )
}


const DeleteTaskModal = ({ taskId, onDelete }: { taskId: string, onDelete: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    await deleteTask(taskId)
      .then(response => {
        if (response && response.success) {
          onDelete();
        }
      })
      .finally(() => {
        setIsLoading(false);
        setIsOpen(false);
      });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="text-red-600 hover:text-red-700">
          <TrashIcon /> Delete Task
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogDescription>Are you sure you want to delete this task? This action cannot be undone.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete} disabled={isLoading}>
              {isLoading ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};


const EditTaskModal = ({ task,users, onUpdate, isAdmin }: { task: ITask,users: IUser[], onUpdate: (updatedTask: ITask) => void, isAdmin: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [changedFields, setChangedFields] = useState<Record<string, FormData>>({});
  const [hasChanged, setHasChanged] = useState(false);
  const EditTaskFormRef = useRef<HTMLFormElement>(null);


  const handleEditTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (Object.keys(changedFields).length === 0) {
      return;
    }

    await updateTask(task._id, changedFields)
      .then(response => {
        if (response) {
          setChangedFields({});
          onUpdate(response.task);
          EditTaskFormRef.current?.reset();
          setIsOpen(false);
        }
      }).finally(() => {
        setIsLoading(false);
        setIsOpen(false);
      });
  };

  const handleChange = (e: React.FormEvent<HTMLFormElement>) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    const name = target.name;
    const value = target.value;
    const original =
      task[name as keyof typeof task];

    setChangedFields(prev => {
      const next = { ...prev };

      if (value === original) {
        delete next[name];
        setHasChanged(false);
      } else {
        next[name] = value;
        setHasChanged(true);
      }

      return next;
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" className="flex items-center gap-2">
          <Pencil size={18} />
          Edit Task
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogDescription>Update the details below to edit the task.</DialogDescription>
        </DialogHeader>
        <form ref={EditTaskFormRef}
          onChange={handleChange}
          onSubmit={(e) => { e.preventDefault(); handleEditTask(e) }}>
          <div>
            <label htmlFor="task-title" className='text-xs'>Title</label>
            <Input defaultValue={task.title} id="title" name='title' placeholder="Title" />
          </div>
          <div className='mt-4'>
            <label htmlFor="task-description" className='text-xs'>Description</label>
            <Textarea defaultValue={task.description} id="description" name='description' placeholder="Description" />
          </div>
          <div className='mt-4'>
            <label htmlFor="task-dueDate" className='text-xs'>Due Date</label>
            <Input defaultValue={new Date(task.dueDate).toLocaleDateString('sv-SE')} type='date' id="duDate" name='dueDate' placeholder="Due Date" />
          </div>
          <div className='grid grid-cols-2 gap-2'>
            <div className='mt-4'>
              <label htmlFor="status" className='text-xs'>Status</label>
              <Select defaultValue={task.status} name='status'>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder="Select Priority"></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="open">open</SelectItem>
                    <SelectItem value="in-progress">In-Progress</SelectItem>
                    <SelectItem value="testing">Testing</SelectItem>
                    <SelectItem value="complete">Complete</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className='mt-4'>
              <label htmlFor="priority" className='text-xs'>Priority</label>
              <Select defaultValue={task.priority} name='priority'>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder="Select Priority"></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>

                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

          </div>
          {isAdmin &&
            <div className='mt-4'>
              <label htmlFor="assignedTo" className='text-xs'>Assign To</label>
              <Select name='assignedTo'>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder="Select Assignee"></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {users.length > 0 ? users.map((user: IUser) => (
                      <SelectItem key={user._id} value={user._id}>
                        {user.username}
                      </SelectItem>
                    )) : "no users found."}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>}
          <DialogFooter>
            <div className='flex flex-col w-full gap-2 mt-3'>
              <Button disabled={!hasChanged || isLoading} className='w-full'>Update Task</Button>
              <DialogClose asChild>
                <Button className='w-full' variant="outline">Cancel</Button>
              </DialogClose>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog >
  )
};




