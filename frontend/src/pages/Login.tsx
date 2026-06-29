import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router';
import { loginUser } from '@/services/auth.service';
import { useRef, useState, useEffect } from 'react';
import type { ILoginRequest } from '@/types/auth.types';

export function Login() {
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const formEl = formRef.current
    if (!formEl) return

    const formData = new FormData(formEl)
    const data = Object.fromEntries(formData.entries()) as Record<string, string>

    try {

      const loginResponse = await loginUser(data as unknown as ILoginRequest)

      if (loginResponse.token) {
        navigate("/", { replace: true })
      }
    } catch (error) {
      console.error("Login failed:", error)

    } finally {
      setIsLoading(false)
      formEl.reset()
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      navigate("/");
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50/50 p-4">
      <div className="text-center mb-8">
        <img src="logo.avif" alt="logo" className='w-20 h-20 justify-self-center' />
        <h1 className="text-3xl font-bold text-[#005ab4] tracking-tight mb-2">TaskSystem</h1>
        <p className="text-sm text-slate-500 font-medium">Sign in to manage your workspace</p>
      </div>

      <div className="w-full max-w-[400px] bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8">
        <form className="space-y-5" ref={formRef} onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-xs  text-slate-700" htmlFor="email">
              Email
            </label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="name@example.com"
              className="h-10 border-slate-200 focus-visible:ring-[#005ab4]"
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs  text-slate-700" htmlFor="password">
                Password
              </label>
            </div>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="••••••••"
              className="h-10 border-slate-200 focus-visible:ring-[#005ab4]"
              required
            />
          </div>

          <Button type="submit" className="mt-2 w-full">
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="mt-8 border-t border-slate-100 pt-6 text-center">
          <p className="text-sm text-slate-600">
            New Here?
            <Button variant="link" onClick={() => { navigate("/register") }}>
              Register
            </Button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
