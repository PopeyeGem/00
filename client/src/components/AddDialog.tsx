import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus } from "lucide-react";
import { useState } from "react";
import { insertTaskSchema, insertMealSchema } from "@shared/schema";
import { useCreateTask } from "@/hooks/use-tasks";
import { useCreateMeal } from "@/hooks/use-meals";
import { useAuth } from "@/hooks/use-auth";

const createTaskForm = insertTaskSchema.extend({
  userId: z.string().optional(), // Handled by hook/backend
});

export function AddTaskDialog() {
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = useCreateTask();
  const { user } = useAuth();
  
  const form = useForm({
    resolver: zodResolver(createTaskForm),
    defaultValues: {
      title: "",
      category: "work",
      priority: "medium",
      description: "",
      userId: user?.id,
    }
  });

  const onSubmit = (data: any) => {
    mutate({ ...data, userId: user!.id }, {
      onSuccess: () => {
        setOpen(false);
        form.reset();
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 shadow-lg shadow-primary/20 bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="w-4 h-4" /> Add Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Title</label>
            <Input {...form.register("title")} placeholder="What needs to be done?" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select onValueChange={(val) => form.setValue("category", val)} defaultValue="work">
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="work">Work</SelectItem>
                  <SelectItem value="study">Study</SelectItem>
                  <SelectItem value="prayer">Prayer</SelectItem>
                  <SelectItem value="health">Health</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Priority</label>
              <Select onValueChange={(val) => form.setValue("priority", val)} defaultValue="medium">
                <SelectTrigger>
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description (Optional)</label>
            <Input {...form.register("description")} placeholder="Add details..." />
          </div>

          <Button type="submit" className="w-full mt-4" disabled={isPending}>
            {isPending ? "Creating..." : "Create Task"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Meal Dialog
const createMealForm = insertMealSchema.extend({
  userId: z.string().optional(),
  calories: z.coerce.number().min(0),
  protein: z.coerce.number().optional(),
  carbs: z.coerce.number().optional(),
  fats: z.coerce.number().optional(),
});

export function AddMealDialog() {
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = useCreateMeal();
  const { user } = useAuth();
  
  const form = useForm({
    resolver: zodResolver(createMealForm),
    defaultValues: {
      name: "",
      calories: 0,
      type: "breakfast",
      userId: user?.id,
    }
  });

  const onSubmit = (data: any) => {
    mutate({ ...data, userId: user!.id }, {
      onSuccess: () => {
        setOpen(false);
        form.reset();
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 border-dashed">
          <Plus className="w-4 h-4" /> Log Meal
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Log Meal</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Meal Name</label>
            <Input {...form.register("name")} placeholder="e.g. Grilled Chicken Salad" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Calories</label>
              <Input type="number" {...form.register("calories")} placeholder="0" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Type</label>
              <Select onValueChange={(val) => form.setValue("type", val)} defaultValue="breakfast">
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="breakfast">Breakfast</SelectItem>
                  <SelectItem value="lunch">Lunch</SelectItem>
                  <SelectItem value="dinner">Dinner</SelectItem>
                  <SelectItem value="snack">Snack</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button type="submit" className="w-full mt-4" disabled={isPending}>
            {isPending ? "Logging..." : "Log Meal"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
