import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Dumbbell, Activity, Zap } from "lucide-react";

const LoadingScreen = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
    >
      <div className="text-center">
        {/* Animated Icons */}
        <div className="relative mb-8 flex justify-center items-center gap-8">
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Dumbbell className="w-12 h-12 text-primary drop-shadow-glow" />
          </motion.div>

          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, -180, -360],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.3,
            }}
          >
            <Activity className="w-12 h-12 text-primary drop-shadow-glow" />
          </motion.div>

          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, -180, -360],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.6,
            }}
          >
            <Zap className="w-12 h-12 text-primary drop-shadow-glow" />
          </motion.div>
        </div>

        {/* Animated Text */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-2"
        >
          <motion.h1
            className="text-5xl md:text-6xl font-bold text-primary"
            animate={{
              textShadow: [
                "0 0 20px rgba(244, 180, 0, 0.5)",
                "0 0 40px rgba(244, 180, 0, 0.8)",
                "0 0 20px rgba(244, 180, 0, 0.5)",
              ],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            365 FITNESS
          </motion.h1>
          <motion.p
            className="text-2xl font-semibold text-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            GYM
          </motion.p>
        </motion.div>

        {/* Loading Bar */}
        <motion.div
          className="mt-8 mx-auto w-64 h-1 bg-secondary rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="h-full bg-primary shadow-glow"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: 2,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
