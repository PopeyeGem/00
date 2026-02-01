import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { type InsertPrayerSettings } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export function usePrayerSettings() {
  return useQuery({
    queryKey: [api.prayerSettings.get.path],
    queryFn: async () => {
      const res = await fetch(api.prayerSettings.get.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch settings");
      return api.prayerSettings.get.responses[200].parse(await res.json());
    },
  });
}

export function useUpdatePrayerSettings() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: Partial<InsertPrayerSettings>) => {
      const res = await fetch(api.prayerSettings.update.path, {
        method: api.prayerSettings.update.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to update settings");
      return api.prayerSettings.update.responses[200].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.prayerSettings.get.path] });
      queryClient.invalidateQueries({ queryKey: [api.prayers.get.path] });
      toast({ title: "Settings updated", description: "Prayer times will be recalculated." });
    },
  });
}

export function usePrayers() {
  const { data: settings } = usePrayerSettings();
  
  return useQuery({
    queryKey: [api.prayers.get.path, settings?.city, settings?.country],
    enabled: !!settings,
    queryFn: async () => {
      // The backend should handle fetching based on user settings stored in DB session or table
      // But we can also pass params if needed. For now, relying on backend looking up user settings.
      const res = await fetch(api.prayers.get.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch prayer times");
      return api.prayers.get.responses[200].parse(await res.json());
    },
  });
}
