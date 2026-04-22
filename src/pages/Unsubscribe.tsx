import { useEffect, useState } from "react";
import { Sparkles, Check, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import StarField from "@/components/StarField";
import FloatingParticles from "@/components/FloatingParticles";

type State =
  | { status: "loading" }
  | { status: "valid" }
  | { status: "already" }
  | { status: "invalid" }
  | { status: "confirming" }
  | { status: "done" }
  | { status: "error"; message: string };

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const Unsubscribe = () => {
  const [state, setState] = useState<State>({ status: "loading" });
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  useEffect(() => {
    document.title = "Unsubscribe · Cosmic Match";
    if (!token) {
      setState({ status: "invalid" });
      return;
    }
    (async () => {
      try {
        const res = await fetch(
          `${SUPABASE_URL}/functions/v1/handle-email-unsubscribe?token=${encodeURIComponent(token)}`,
          { headers: { apikey: SUPABASE_ANON_KEY } },
        );
        const data = await res.json();
        if (!res.ok) {
          setState({ status: "invalid" });
          return;
        }
        if (data.valid === false && data.reason === "already_unsubscribed") {
          setState({ status: "already" });
          return;
        }
        if (data.valid === true) {
          setState({ status: "valid" });
          return;
        }
        setState({ status: "invalid" });
      } catch {
        setState({ status: "error", message: "Could not reach the cosmos." });
      }
    })();
  }, [token]);

  const handleConfirm = async () => {
    if (!token) return;
    setState({ status: "confirming" });
    try {
      const { data, error } = await supabase.functions.invoke(
        "handle-email-unsubscribe",
        { body: { token } },
      );
      if (error) throw error;
      if (data?.success || data?.reason === "already_unsubscribed") {
        setState({ status: "done" });
      } else {
        setState({ status: "error", message: "Unsubscribe could not be processed." });
      }
    } catch (e: any) {
      setState({ status: "error", message: e?.message ?? "Something went wrong." });
    }
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      <StarField />
      <FloatingParticles />
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-panel rounded-3xl p-10 max-w-md w-full text-center relative z-10"
      >
        <div className="text-cosmic-gold text-sm tracking-[0.4em] mb-4">✦ ✦ ✦</div>
        <h1 className="font-serif-display text-4xl text-gold-gradient mb-3">
          {state.status === "done" ? "Farewell, traveler" : "Unsubscribe"}
        </h1>

        {state.status === "loading" && (
          <p className="text-muted-foreground">Consulting the stars...</p>
        )}

        {state.status === "valid" && (
          <>
            <p className="text-muted-foreground mb-8">
              Are you sure you wish to part ways with Cosmic Match? You'll no longer
              receive cosmic dispatches from us.
            </p>
            <button
              onClick={handleConfirm}
              className="bg-gradient-gold text-background font-semibold px-7 py-4 rounded-xl shadow-gold hover:shadow-gold-strong transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] inline-flex items-center gap-2"
            >
              <Sparkles className="h-4 w-4" />
              Confirm Unsubscribe
            </button>
          </>
        )}

        {state.status === "confirming" && (
          <p className="text-muted-foreground">Aligning the stars...</p>
        )}

        {state.status === "already" && (
          <p className="text-muted-foreground">
            You've already been unsubscribed. The stars remember.
          </p>
        )}

        {state.status === "done" && (
          <div className="flex flex-col items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold">
              <Check className="h-6 w-6 text-background" strokeWidth={3} />
            </div>
            <p className="text-muted-foreground">
              You've been removed from our list. May the cosmos still smile upon you ✨
            </p>
          </div>
        )}

        {state.status === "invalid" && (
          <div className="flex flex-col items-center gap-4">
            <AlertCircle className="h-10 w-10 text-destructive" />
            <p className="text-muted-foreground">
              This unsubscribe link is invalid or has expired.
            </p>
          </div>
        )}

        {state.status === "error" && (
          <div className="flex flex-col items-center gap-4">
            <AlertCircle className="h-10 w-10 text-destructive" />
            <p className="text-muted-foreground">{state.message}</p>
          </div>
        )}

        <a
          href="/"
          className="inline-block mt-8 text-sm text-cosmic-gold-soft hover:text-cosmic-gold transition-colors"
        >
          ← Return to Cosmic Match
        </a>
      </motion.div>
    </main>
  );
};

export default Unsubscribe;
