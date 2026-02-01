import { useTasks } from "@/hooks/use-tasks";
import { usePrayers } from "@/hooks/use-prayers";
import { useMeals } from "@/hooks/use-meals";
import { TaskCard } from "@/components/Cards";
import { AddTaskDialog } from "@/components/AddDialog";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Flame, CheckCircle, Clock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
  const { data: tasks, isLoading: tasksLoading } = useTasks();
  const { data: prayers, isLoading: prayersLoading } = usePrayers();
  const { data: meals, isLoading: mealsLoading } = useMeals();

  // Simple stats
  const completedTasks = tasks?.filter(t => t.completed).length || 0;
  const totalTasks = tasks?.length || 0;
  const totalCalories = meals?.reduce((acc, m) => acc + m.calories, 0) || 0;
  
  // Find next prayer (very basic logic for demo - assumes today's times available)
  const nextPrayer = prayers ? Object.entries(prayers.timings).find(([name, time]) => {
    // In a real app, parse time properly vs current time
    // This is just a placeholder visual
    return name === "Maghrib"; 
  }) : ["Loading...", "00:00"];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold">Good Morning</h1>
          <p className="text-muted-foreground">Here's your overview for {format(new Date(), "EEEE, MMMM do")}.</p>
        </div>
        <div className="flex gap-2">
          <AddTaskDialog />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="glass p-6 rounded-2xl relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Clock className="w-24 h-24 text-primary" />
          </div>
          <div className="relative z-10">
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Next Prayer</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-display font-bold text-primary">{nextPrayer?.[1]}</span>
              <span className="text-lg text-foreground/80">{nextPrayer?.[0]}</span>
            </div>
            {prayers?.date?.hijri && (
              <p className="text-xs text-muted-foreground mt-2">
                {prayers.date.hijri.day} {prayers.date.hijri.month.en} {prayers.date.hijri.year}
              </p>
            )}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="glass p-6 rounded-2xl relative overflow-hidden group"
        >
           <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <CheckCircle className="w-24 h-24 text-secondary" />
          </div>
          <h3 className="text-sm font-medium text-muted-foreground mb-1">Tasks Progress</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-display font-bold text-secondary">{completedTasks}</span>
            <span className="text-lg text-muted-foreground">/ {totalTasks}</span>
          </div>
          <div className="h-2 w-full bg-secondary/10 rounded-full mt-4 overflow-hidden">
            <div 
              className="h-full bg-secondary transition-all duration-500" 
              style={{ width: `${totalTasks ? (completedTasks / totalTasks) * 100 : 0}%` }} 
            />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="glass p-6 rounded-2xl relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Flame className="w-24 h-24 text-accent" />
          </div>
          <h3 className="text-sm font-medium text-muted-foreground mb-1">Calories Consumed</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-display font-bold text-accent">{totalCalories}</span>
            <span className="text-lg text-muted-foreground">kcal</span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Target: 2000 kcal
          </p>
        </motion.div>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Tasks List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Today's Focus</h2>
            <AddTaskDialog />
          </div>
          
          {tasksLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-20 w-full rounded-xl" />
              <Skeleton className="h-20 w-full rounded-xl" />
              <Skeleton className="h-20 w-full rounded-xl" />
            </div>
          ) : tasks?.length === 0 ? (
            <div className="text-center p-8 border border-dashed border-white/10 rounded-xl">
              <p className="text-muted-foreground">No tasks yet. Enjoy your day!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {tasks?.slice(0, 5).map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          )}
        </div>

        {/* Sidebar Info - Quote or something */}
        <div className="space-y-6">
           <div className="glass p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
             <h3 className="font-display font-bold text-lg mb-2 text-primary">Daily Wisdom</h3>
             <blockquote className="italic text-muted-foreground">
               "Productivity is never an accident. It is always the result of a commitment to excellence, intelligent planning, and focused effort."
             </blockquote>
           </div>

           <div className="glass p-6 rounded-2xl">
             <h3 className="font-display font-bold text-lg mb-4">Prayer Times</h3>
             {prayersLoading ? (
               <Skeleton className="h-40 w-full" />
             ) : (
                <div className="space-y-3">
                  {Object.entries(prayers?.timings || {}).slice(0, 6).map(([name, time]) => (
                    <div key={name} className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">{name}</span>
                      <span className="font-medium font-mono bg-white/5 px-2 py-1 rounded">{String(time)}</span>
                    </div>
                  ))}
                </div>
             )}
           </div>
        </div>
      </div>
    </div>
  );
}
