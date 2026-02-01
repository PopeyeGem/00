import { Task, Meal } from "@shared/schema";
import { format } from "date-fns";
import { Check, Clock, Flame, MoreVertical, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useUpdateTask, useDeleteTask } from "@/hooks/use-tasks";
import { useDeleteMeal } from "@/hooks/use-meals";
import { Badge } from "./ui/badge";

const priorityColors = {
  high: "bg-red-500/10 text-red-500 border-red-500/20",
  medium: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  low: "bg-blue-500/10 text-blue-500 border-blue-500/20",
};

export function TaskCard({ task }: { task: Task }) {
  const updateMutation = useUpdateTask();
  const deleteMutation = useDeleteTask();

  const toggleComplete = () => {
    updateMutation.mutate({ id: task.id, completed: !task.completed });
  };

  return (
    <div className={`
      group relative p-4 rounded-xl border transition-all duration-200
      ${task.completed 
        ? "bg-card/30 border-white/5 opacity-60" 
        : "bg-card border-white/10 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"}
    `}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <button
            onClick={toggleComplete}
            className={`
              mt-1 w-5 h-5 rounded-md border flex items-center justify-center transition-colors
              ${task.completed 
                ? "bg-primary border-primary text-primary-foreground" 
                : "border-muted-foreground/30 hover:border-primary"}
            `}
          >
            {task.completed && <Check className="w-3.5 h-3.5" />}
          </button>
          
          <div>
            <h3 className={`font-medium ${task.completed ? "line-through text-muted-foreground" : "text-foreground"}`}>
              {task.title}
            </h3>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <Badge variant="outline" className={`text-xs capitalize ${priorityColors[task.priority as keyof typeof priorityColors] || ""}`}>
                {task.priority}
              </Badge>
              <Badge variant="secondary" className="text-xs bg-muted/50 text-muted-foreground capitalize">
                {task.category}
              </Badge>
            </div>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem 
              className="text-destructive focus:text-destructive"
              onClick={() => deleteMutation.mutate(task.id)}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export function MealCard({ meal }: { meal: Meal }) {
  const deleteMutation = useDeleteMeal();

  return (
    <div className="flex items-center justify-between p-4 rounded-xl bg-card/40 border border-white/5 hover:bg-card/60 transition-colors">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
          <UtensilIcon type={meal.type} />
        </div>
        <div>
          <h4 className="font-medium text-foreground">{meal.name}</h4>
          <p className="text-sm text-muted-foreground capitalize flex items-center gap-2">
            {meal.type} • <span className="text-accent flex items-center gap-1"><Flame className="w-3 h-3" /> {meal.calories} kcal</span>
          </p>
        </div>
      </div>
      <Button 
        variant="ghost" 
        size="icon" 
        className="text-muted-foreground hover:text-destructive"
        onClick={() => deleteMutation.mutate(meal.id)}
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
}

function UtensilIcon({ type }: { type: string }) {
  // Simple mapping, could be more elaborate
  return <Clock className="w-5 h-5" />;
}
