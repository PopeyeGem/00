import { useTasks } from "@/hooks/use-tasks";
import { AddTaskDialog } from "@/components/AddDialog";
import { TaskCard } from "@/components/Cards";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Task } from "@shared/schema";

export default function TasksPage() {
  const { data: tasks, isLoading } = useTasks();
  const [filter, setFilter] = useState("all");

  const filterTasks = (taskList: Task[] | undefined) => {
    if (!taskList) return [];
    if (filter === "all") return taskList;
    if (filter === "completed") return taskList.filter(t => t.completed);
    if (filter === "active") return taskList.filter(t => !t.completed);
    return taskList;
  };

  const filtered = filterTasks(tasks);

  return (
    <div className="space-y-8 h-full flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold">Tasks</h1>
          <p className="text-muted-foreground">Manage your priorities and track progress.</p>
        </div>
        <AddTaskDialog />
      </div>

      <Tabs defaultValue="all" onValueChange={setFilter} className="w-full">
        <TabsList className="bg-card border border-white/5 p-1">
          <TabsTrigger value="all">All Tasks</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
      </Tabs>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1,2,3,4,5,6].map(i => <Skeleton key={i} className="h-32 rounded-xl" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full py-12 text-center text-muted-foreground border border-dashed border-white/10 rounded-xl">
              No tasks found in this view.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
