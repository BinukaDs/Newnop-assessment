import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router'
import { useRef } from 'react'
import { signUpUser } from '@/services/auth.service'



export function Register() {
  const navigate = useNavigate();
  const RegisterFormRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(RegisterFormRef.current!);
    const data = Object.fromEntries(formData);
    const signUpResponse = await signUpUser(data as any);
    console.log("Sign Up Response:", signUpResponse);
    if (signUpResponse) {
      navigate("/login", { replace: true });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50/50 p-4">
      <div className="text-center mb-8">
        <img src="logo.avif" alt="logo" className='w-20 h-20 justify-self-center' />
        <h1 className="text-3xl font-bold text-[#005ab4] tracking-tight mb-2">TaskSystem</h1>
        <p className="text-sm text-slate-500 font-medium">Create a new workspace account</p>
      </div>

      <div className="w-full max-w-[400px] bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8">
        <form className="space-y-5" onSubmit={handleSubmit} ref={RegisterFormRef}>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700" htmlFor="name">
              Username
            </label>
            <Input
              id="name"
              type="text"
              required
              name="username"
              placeholder="John Doe"
              className="h-10 border-slate-200 focus-visible:ring-[#005ab4]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700" htmlFor="email">
              Email
            </label>
            <Input
              id="email"
              type="email"
              name="email"
              required
              placeholder="name@example.com"
              className="h-10 border-slate-200 focus-visible:ring-[#005ab4]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700" htmlFor="role">
              Role
            </label>
            <Select name='role' required>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Your Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700" htmlFor="password">
              Password
            </label>
            <Input
              id="password"
              type="password"
              name='password'
              required
              placeholder="Create a password"
              className="h-10 border-slate-200 focus-visible:ring-[#005ab4]"
            />
          </div>

          <Button type="submit" className="w-full mt-2">
            Sign Up
          </Button>
        </form>

        <div className="mt-8 border-t border-slate-100 pt-6 text-center">
          <p className="text-sm text-slate-600">
            Already have an account?
            <Button variant="link"
            >Sign in</Button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
