import { Button } from "@/components/ui/button";
import { ArrowRight, Moon, Zap, Shield, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function Landing() {
  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden relative">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-primary/20 blur-[120px] rounded-full" />
        <div className="absolute top-[30%] -right-[10%] w-[40%] h-[60%] bg-accent/10 blur-[100px] rounded-full" />
        <div className="absolute bottom-[10%] left-[20%] w-[60%] h-[40%] bg-secondary/10 blur-[120px] rounded-full" />
        <div className="absolute inset-0 pattern-grid opacity-30" />
      </div>

      <nav className="relative z-10 container mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2 font-display font-bold text-2xl">
          <Sparkles className="text-primary w-6 h-6" />
          <span>Life Companion</span>
        </div>
        <Button onClick={handleLogin} variant="outline" className="border-primary/20 hover:bg-primary/10 hover:text-primary">
          Sign In
        </Button>
      </nav>

      <main className="relative z-10 container mx-auto px-6 pt-20 pb-32">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-8">
              Balance Faith, Work, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-400 to-red-500">
                & Wellbeing
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Your all-in-one productivity suite tailored for a balanced life. 
              Track prayers, manage tasks, monitor health, and get AI-powered guidance.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button onClick={handleLogin} size="lg" className="h-12 px-8 text-lg rounded-full bg-white text-black hover:bg-gray-200 font-medium">
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mt-32">
            {[
              { icon: Moon, title: "Prayer & Faith", desc: "Precise prayer times, Qibla direction, and spiritual tracking." },
              { icon: Zap, title: "Productivity", desc: "Powerful task management with Kanban boards and priority matrix." },
              { icon: Shield, title: "Health & Mind", desc: "Meal logging, calorie tracking, and mindfulness reminders." },
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + (i * 0.1), duration: 0.5 }}
                className="glass p-8 rounded-3xl text-left"
              >
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6 text-primary">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 bg-background/50 backdrop-blur-lg">
        <div className="container mx-auto px-6 py-8 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Life Companion. Built with excellence.
        </div>
      </footer>
    </div>
  );
}
