import type { ITask } from "@/types/task.types";

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return date.toLocaleDateString(undefined, options);
}

export function formatFieldDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };
  return date.toLocaleDateString(undefined, options);
}

export function getStatusColor(status: ITask["status"]) {
  switch (status.toLowerCase()) {
    case "in progress":
      return "bg-sky-100 text-sky-700";
    case "open":
      return "bg-slate-100 text-slate-700";
    case "testing":
      return "bg-orange-100 text-orange-700";
    case "complete":
      return "bg-green-100 text-green-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

export function getPriorityColor(priority: ITask["priority"]) {
  switch (priority.toLowerCase()) {
    case "high":
      return "bg-red-50 text-red-700";
    case "medium":
      return "bg-amber-50 text-amber-700";
    case "low":
      return "bg-sky-100 text-sky-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

export function getInitials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export function getCardColor(status: ITask["status"]) {
  switch (status.toLowerCase()) {
    case "in progress":
      return "bg-blue-50 text-blue-700 hover:bg-blue-100";
    case "open":
      return "bg-gray-50 text-gray-700 hover:bg-gray-100";
    case "testing":
      return "bg-orange-50 text-orange-700 hover:bg-orange-100";
    case "complete":
      return "bg-teal-50 text-teal-700 hover:bg-green-100";
    default:
      return "bg-slate-50 text-slate-700 hover:bg-slate-100";
  }
}

export function getDueDateColor(dueDate: ITask["dueDate"]) {
  const dueTime = new Date(dueDate).getTime();
  const currentTime = new Date().getTime();
  const diff = dueTime - currentTime;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days <= 3) {
    return "text-red-50";
  } else if (days <= 7) {
    return "text-orange-50";
  } else {
    return "text-green-50";
  }
};
