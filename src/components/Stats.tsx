import { motion } from "framer-motion";

const stats = [
  { value: "12", label: "Zodiac Signs" },
  { value: "144", label: "Compatibility Pairs" },
  { value: "98%", label: "Match Accuracy" },
];

const Stats = () => {
  return (
    <section className="relative py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-serif-display text-2xl md:text-3xl lg:text-4xl text-center mb-12 leading-relaxed"
        >
          Discover your <span className="text-gold-gradient italic">moon and rising sign</span>
          <br className="hidden sm:block" />
          <span className="text-muted-foreground"> & see your entire </span>
          <span className="text-gold-gradient italic">birth chart</span>
        </motion.p>
        <div className="glass-panel rounded-3xl p-10 md:p-14">
          <div className="grid grid-cols-3 gap-8 md:gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="font-serif-display text-5xl md:text-6xl text-gold-gradient mb-2">
                  {s.value}
                </div>
                <div className="text-xs md:text-sm tracking-[0.2em] uppercase text-muted-foreground">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
