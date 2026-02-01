import { usePrayers, usePrayerSettings, useUpdatePrayerSettings } from "@/hooks/use-prayers";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { MapPin, Moon } from "lucide-react";

export default function PrayersPage() {
  const { data: prayers, isLoading } = usePrayers();
  const { data: settings } = usePrayerSettings();
  const updateSettings = useUpdatePrayerSettings();
  
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    if (settings) {
      setCity(settings.city || "");
      setCountry(settings.country || "");
    }
  }, [settings]);

  const handleSaveSettings = () => {
    updateSettings.mutate({ city, country });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-primary">Prayer Times</h1>
        <p className="text-muted-foreground">Stay connected with your spiritual obligations.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Settings Card */}
        <div className="glass p-6 rounded-2xl space-y-6 h-fit">
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="text-primary w-5 h-5" />
            <h3 className="font-bold text-lg">Location Settings</h3>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">City</label>
              <Input value={city} onChange={e => setCity(e.target.value)} placeholder="Cairo" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Country</label>
              <Input value={country} onChange={e => setCountry(e.target.value)} placeholder="Egypt" />
            </div>
            <Button 
              onClick={handleSaveSettings} 
              disabled={updateSettings.isPending}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {updateSettings.isPending ? "Updating..." : "Update Location"}
            </Button>
          </div>
        </div>

        {/* Times List */}
        <div className="space-y-4">
          {isLoading ? (
             <Skeleton className="h-[400px] w-full rounded-2xl" />
          ) : (
            <div className="bg-card/40 border border-white/5 rounded-2xl overflow-hidden">
               <div className="p-6 bg-primary/10 border-b border-white/5">
                 <h2 className="text-2xl font-bold font-display">{prayers?.date.hijri.day} {prayers?.date.hijri.month.en}</h2>
                 <p className="text-muted-foreground">{prayers?.date.readable}</p>
               </div>
               <div className="divide-y divide-white/5">
                 {Object.entries(prayers?.timings || {}).map(([name, time]) => (
                   <div key={name} className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors">
                     <div className="flex items-center gap-3">
                       <Moon className="w-4 h-4 text-primary opacity-50" />
                       <span className="font-medium">{name}</span>
                     </div>
                     <span className="font-mono text-lg bg-background/50 px-3 py-1 rounded-md border border-white/5">
                       {String(time)}
                     </span>
                   </div>
                 ))}
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
