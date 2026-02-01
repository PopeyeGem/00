import { useMeals } from "@/hooks/use-meals";
import { AddMealDialog } from "@/components/AddDialog";
import { MealCard } from "@/components/Cards";
import { Skeleton } from "@/components/ui/skeleton";
import { Flame } from "lucide-react";

export default function MealsPage() {
  const { data: meals, isLoading } = useMeals();

  const totalCalories = meals?.reduce((acc, m) => acc + m.calories, 0) || 0;
  const goal = 2000;
  const percentage = Math.min((totalCalories / goal) * 100, 100);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold">Nutrition</h1>
          <p className="text-muted-foreground">Track your intake and stay healthy.</p>
        </div>
        <AddMealDialog />
      </div>

      <div className="glass p-8 rounded-3xl flex flex-col md:flex-row items-center gap-8 bg-gradient-to-br from-accent/5 to-transparent border-accent/20">
        <div className="relative w-40 h-40 flex items-center justify-center">
           <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-muted/20"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              />
              <path
                className="text-accent transition-all duration-1000 ease-out"
                strokeDasharray={`${percentage}, 100`}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <Flame className="w-6 h-6 text-accent mb-1" />
              <span className="text-2xl font-bold font-display">{totalCalories}</span>
              <span className="text-xs text-muted-foreground">/ {goal}</span>
            </div>
        </div>
        
        <div className="flex-1 space-y-2">
           <h3 className="text-xl font-bold">Daily Goal Progress</h3>
           <p className="text-muted-foreground">
             You have consumed {totalCalories} calories today. 
             {totalCalories < goal 
               ? ` You have ${goal - totalCalories} calories remaining.` 
               : " You have reached your daily target."}
           </p>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-bold border-b border-white/5 pb-4">Today's Meals</h2>
        {isLoading ? (
          <div className="space-y-4">
             <Skeleton className="h-20 w-full" />
             <Skeleton className="h-20 w-full" />
          </div>
        ) : (
          <div className="space-y-3">
             {meals?.map(meal => <MealCard key={meal.id} meal={meal} />)}
             {meals?.length === 0 && (
               <p className="text-muted-foreground">No meals logged yet today.</p>
             )}
          </div>
        )}
      </div>
    </div>
  );
}
