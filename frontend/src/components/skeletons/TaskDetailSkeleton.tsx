import { Card, CardContent } from "@/components/ui/card"

export function TaskDetailSkeleton() {
  return (
    <div className="max-w-5xl mx-auto w-full animate-pulse mt-8">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 bg-slate-200 rounded-full" />
          <div className="h-8 w-64 bg-slate-200 rounded-md" />
        </div>
        <div className="flex items-center gap-3 pl-11 md:pl-0">
          <div className="h-9 w-32 bg-slate-200 rounded-md" />
          <div className="h-9 w-24 bg-slate-200 rounded-md" />
          <div className="h-9 w-28 bg-slate-200 rounded-md" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Description */}
        <div className="lg:col-span-2">
          <Card className="shadow-sm border-slate-200 rounded-xl overflow-hidden h-full">
            <CardContent className="p-6">
              <div className="h-4 w-32 bg-slate-200 rounded-md mb-6" />
              <div className="space-y-4">
                <div className="h-4 w-full bg-slate-200 rounded-md" />
                <div className="h-4 w-full bg-slate-200 rounded-md" />
                <div className="h-4 w-11/12 bg-slate-200 rounded-md" />
                <div className="h-4 w-full bg-slate-200 rounded-md" />
                <div className="h-4 w-4/5 bg-slate-200 rounded-md" />
                <div className="h-4 w-full bg-slate-200 rounded-md" />
                <div className="h-4 w-3/4 bg-slate-200 rounded-md" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Details & Assignees */}
        <div className="space-y-6">
          <Card className="shadow-sm border-slate-200 rounded-xl overflow-hidden">
            <CardContent className="p-6">
              <div className="h-4 w-24 bg-slate-200 rounded-md mb-6" />
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="h-4 w-16 bg-slate-200 rounded-md" />
                  <div className="h-5 w-20 bg-slate-200 rounded-full" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="h-4 w-20 bg-slate-200 rounded-md" />
                  <div className="h-5 w-16 bg-slate-200 rounded-full" />
                </div>
                <div className="border-t border-slate-100 pt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="h-4 w-24 bg-slate-200 rounded-md" />
                    <div className="h-4 w-24 bg-slate-200 rounded-md" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="h-4 w-20 bg-slate-200 rounded-md" />
                    <div className="h-4 w-24 bg-slate-200 rounded-md" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-slate-200 rounded-xl overflow-hidden">
            <CardContent className="p-6">
              <div className="h-4 w-28 bg-slate-200 rounded-md mb-6" />
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-slate-200 rounded-full" />
                <div className="h-4 w-24 bg-slate-200 rounded-md" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
