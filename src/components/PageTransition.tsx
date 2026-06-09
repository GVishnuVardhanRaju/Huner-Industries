import { AnimatePresence, motion } from "framer-motion";
import { useRouterState, Outlet } from "@tanstack/react-router";
import { useHydrated } from "@tanstack/react-router";

export function PageTransition() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const hydrated = useHydrated();

  // During SSR / first paint, render Outlet directly to avoid hydration mismatches.
  if (!hydrated) {
    return <Outlet />;
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <Outlet />
      </motion.div>
    </AnimatePresence>
  );
}
