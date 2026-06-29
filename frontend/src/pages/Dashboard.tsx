import { useState, useEffect, useContext, useRef } from 'react'
import { Plus, User } from 'lucide-react'
import { Sidebar } from '@/components/Sidebar'
import { Navbar } from '@/components/Navbar'
import { TaskSearch } from '@/components/TaskSearch'
import { TaskCard } from '@/components/TaskCard'
import { createTask, getTasks } from '@/services/task.service'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectTrigger, SelectContent, SelectItem, SelectGroup, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { UserContext } from '@/context/user.context'
import { Dialog, DialogContent, DialogClose, DialogTrigger, DialogTitle, DialogDescription, DialogHeader, DialogFooter } from '@/components/ui/dialog'
import { getUsers } from '@/services/user.service'
import type { IUser } from '@/types/auth.types'
import { TaskCardSkeleton } from '@/components/skeletons/TaskCardSkeleton'


function Dashboard() {
    const { user, tasks, setTasks, users, setUsers } = useContext(UserContext);
    const isAdmin = user.role === "admin";
    const [isLoading, setIsLoading] = useState(false);




    const getTasksData = async () => {
        try {
            setIsLoading(true);
            const data = await getTasks();
            if (!data) {
                return;
            }
            setTasks(data.tasks);

        } catch (error) {
            console.error("Error fetching tasks:", error);
        } finally {
            setIsLoading(false);
        }
    }



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

    useEffect(() => {
        const run = async () => {
            await getTasksData();
              if (isAdmin) await getUsersData();
        }
        run();
    }, []);

    return (
        <div className="flex h-screen overflow-hidden bg-slate-50/50">
            <Sidebar />
            <div className="flex-1 flex flex-col h-full overflow-hidden relative">
                <Navbar />

                <main className="flex-1 flex flex-col h-full overflow-hidden p-8">

                    <div className="max-w-6xl mx-auto w-full flex-none">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{isAdmin ? "Total" : "My"} Tasks</h2>
                                <p className="text-slate-500 mt-1">Manage and track your active projects.</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <CreateTaskModal getTasksData={getTasksData} users={users} />
                            </div>
                        </div>

                        <TaskSearch tasks={tasks} setTasks={setTasks} />
                    </div>

                    <div className="max-w-6xl mx-auto w-full flex-1 overflow-y-auto pb-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {isLoading ? (
                                Array.from({ length: 6 }).map((_, index) => (
                                    <TaskCardSkeleton key={index} />
                                ))
                            ) : tasks.length > 0 ? tasks.map((task, index) => (
                                <TaskCard
                                    key={index}
                                    task={task}
                                    getTasks={getTasksData}
                                />
                            )) : (
                                <p>No tasks found.</p>
                            )}
                        </div>
                    </div>

                </main>
            </div>
        </div>
    )
}

function CreateTaskModal({ users, getTasksData }: { users: IUser[], getTasksData: () => Promise<void> }) {

    const CreateTaskFormRef = useRef<HTMLFormElement>(null);
    const { user } = useContext(UserContext);
    const isAdmin = user.role === "admin";
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);


    const handleCreateTask = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        const formEl = CreateTaskFormRef.current
        if (!formEl) return

        const formData = new FormData(formEl)
        const data = Object.fromEntries(formData.entries()) as Record<string, string>

        try {
            await createTask(data);
            await getTasksData();
        } catch (error) {
            console.error("Task creation failed:", error)
        } finally {
            setIsLoading(false)
            setIsOpen(false);
            formEl.reset()
        }
    }



    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg h-10 px-4 flex items-center gap-2">
                    <Plus size={18} />
                    Create Task
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create a New Task</DialogTitle>
                    <DialogDescription>Fill in the details below to create a new task.</DialogDescription>
                </DialogHeader>
                <form ref={CreateTaskFormRef} onSubmit={(e) => { e.preventDefault(); handleCreateTask(e) }}>
                    <div>
                        <label htmlFor="task-title" className='text-xs'>Title</label>
                        <Input id="title" name='title' placeholder="Title" />
                    </div>
                    <div className='mt-4'>
                        <label htmlFor="task-description" className='text-xs'>Description</label>
                        <Textarea id="description" name='description' placeholder="Description" />
                    </div>
                    <div className='mt-4'>
                        <label htmlFor="task-dueDate" className='text-xs'>Due Date</label>
                        <Input type='date' id="duDate" name='dueDate' placeholder="Due Date" />
                    </div>
                    <div className='grid grid-cols-2 gap-2'>
                        <div className='mt-4'>
                            <label htmlFor="status" className='text-xs'>Status</label>
                            <Select name='status'>
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
                            <Select name='priority'>
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
                            <Button disabled={isLoading} className='w-full'>Create Task</Button>
                            <DialogClose>
                                <Button className='w-full' variant="outline">Cancel</Button>
                            </DialogClose>
                        </div>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog >
    )
}






export default Dashboard
