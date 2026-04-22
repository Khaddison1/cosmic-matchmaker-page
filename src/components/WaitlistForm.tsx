import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Sparkles, Check } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const WaitlistForm = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim().toLowerCase();
    if (!trimmed.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) || trimmed.length > 255) {
      toast.error("Please enter a valid email", {
        description: "The cosmos requires a real address ✨",
      });
      return;
    }
    setLoading(true);
    const { error } = await supabase
      .from("waitlist_signups")
      .insert({ email: trimmed, source: "landing" });
    setLoading(false);

    if (error) {
      if (error.code === "23505") {
        // Already on list — treat as success
        setSubmitted(true);
        toast.success("You're already on the list", {
          description: "The stars remember you ✨",
        });
        return;
      }
      toast.error("Something went wrong", {
        description: "Please try again in a moment.",
      });
      return;
    }

    setSubmitted(true);
    toast.success("You're on the list", {
      description: "The stars have aligned. Check your inbox ✨",
    });

    // Send branded welcome email (fire-and-forget)
    supabase.functions
      .invoke("send-transactional-email", {
        body: {
          templateName: "welcome-waitlist",
          recipientEmail: trimmed,
          idempotencyKey: `waitlist-welcome-${trimmed}`,
        },
      })
      .catch((err) => console.error("Welcome email failed", err));
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel rounded-2xl px-6 py-5 flex items-center gap-4"
      >
        <div className="h-10 w-10 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold">
          <Check className="h-5 w-5 text-background" strokeWidth={3} />
        </div>
        <div className="text-left">
          <p className="font-serif-display text-xl text-gold-gradient">Welcome, traveler.</p>
          <p className="text-sm text-muted-foreground">Your cosmic invitation will arrive soon.</p>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="glass-panel rounded-2xl p-2 flex flex-col sm:flex-row gap-2 group focus-within:shadow-gold transition-shadow duration-500">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          aria-label="Email address"
          className="flex-1 bg-transparent px-5 py-4 text-base text-foreground placeholder:text-muted-foreground/70 focus:outline-none rounded-xl"
        />
        <button
          type="submit"
          disabled={loading}
          className="relative overflow-hidden group/btn bg-gradient-gold text-background font-semibold px-7 py-4 rounded-xl shadow-gold hover:shadow-gold-strong transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-wait flex items-center justify-center gap-2 whitespace-nowrap"
        >
          <span
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"
            aria-hidden="true"
          />
          <Sparkles className="h-4 w-4 relative" />
          <span className="relative">{loading ? "Aligning stars..." : "Join the Waitlist"}</span>
        </button>
      </div>
      <p className="text-xs text-muted-foreground/70 mt-3 text-center">
        Early access · No spam · Unsubscribe anytime
      </p>
    </form>
  );
};

export default WaitlistForm;
