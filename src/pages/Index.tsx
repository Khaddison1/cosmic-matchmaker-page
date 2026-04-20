import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Star } from "lucide-react";
import StarField from "@/components/StarField";
import FloatingParticles from "@/components/FloatingParticles";
import ZodiacWheel from "@/components/ZodiacWheel";
import Stats from "@/components/Stats";

import Footer from "@/components/Footer";

export default function Home() {
  // ——— Original logic preserved exactly ———
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const joinWaitlist = async () => {
    const res = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (data.success) {
      setMessage("You're on the waitlist!");
      setEmail("");
    } else {
      setMessage("Error. Try again.");
    }
  };