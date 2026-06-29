import { Card, CardContent } from "@/components/ui/card"

export function TaskCardSkeleton() {
  return (
    <Card className="shadow-sm transition-all ease-in-out border-slate-200 rounded-xl overflow-hidden animate-pulse">
      <CardContent className="px-5 py-5 space-y-4">
        {/* Header badges & options */}
        <div className="flex w-full justify-between items-center">
          <div className="flex gap-2">
            <div className="h-6 w-20 bg-slate-200 rounded-full" />
            <div className="h-6 w-16 bg-slate-200 rounded-full" />
          </div>
          <div className="h-8 w-8 bg-slate-200 rounded-md" />
        </div>

        {/* Title */}
        <div className="h-6 w-3/4 bg-slate-200 rounded-md mt-2" />

        {/* Description lines */}
        <div className="space-y-2 mt-4">
          <div className="h-4 w-full bg-slate-200 rounded-md" />
          <div className="h-4 w-full bg-slate-200 rounded-md" />
          <div className="h-4 w-2/3 bg-slate-200 rounded-md" />
        </div>

        {/* Footer: Assignee & Date */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-6">
          <div className="h-8 w-8 bg-slate-200 rounded-full" />
          <div className="h-4 w-24 bg-slate-200 rounded-md" />
        </div>

        {/* Bottom Button */}
        <div className="w-full flex mt-4 justify-end">
          <div className="h-9 w-12 bg-slate-200 rounded-md" />
        </div>
      </CardContent>
    </Card>
  )
}
