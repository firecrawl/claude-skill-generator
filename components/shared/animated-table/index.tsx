"use client";

import { useEffect, useRef, useState } from "react";

import { motion, useInView, AnimatePresence } from "framer-motion";

import ScrambleText from "@/components/ui/motion/scramble-text";
import { cn } from "@/lib/utils";

export interface TableRow {
  id: number;
  [key: string]: any;
}

export interface TableColumn {
  key: string;
  label: string;
}

interface AnimatedTableProps {
  columns: TableColumn[];
  data: TableRow[];
  className?: string;
  idKey?: string;
}

export function AnimatedTable({
  columns,
  data,
  className,
  idKey = "id",
}: AnimatedTableProps) {
  const tableRef = useRef(null);
  const isInView = useInView(tableRef, {
    once: true,
    margin: "-20% 0px -20% 0px",
    amount: 0.4,
  });
  const [isScanning, setIsScanning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (isInView && !hasStarted) {
      setHasStarted(true);
      const timer = setTimeout(() => {
        setIsScanning(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isInView, hasStarted]);

  return (
    <motion.div
      ref={tableRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "w-full overflow-hidden border-[.75px] rounded-[1rem] bg-white relative",
        className,
      )}
    >
      <AnimatePresence>
        {isScanning && (
          <>
            <motion.div
              initial={{ top: "-2px" }}
              animate={{ top: "100%" }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 2.5,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-400/40 to-transparent z-10"
            />
            <motion.div
              initial={{ top: "-100px" }}
              animate={{ top: "100%" }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 2.5,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="absolute left-0 w-full h-[100px] bg-gradient-to-b from-blue-400/[0.02] to-transparent pointer-events-none"
            />
          </>
        )}
      </AnimatePresence>

      <div className="w-full [mask-image:linear-gradient(to_right,black_80%,transparent_100%)]">
        <table className="w-full border-collapse text-sm @md:text-base whitespace-nowrap">
          <thead>
            <motion.tr
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="border-b border-[#E5E3E2]"
            >
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="py-2 @md:py-4 px-3 @md:px-6 text-left  text-[#605A57]"
                >
                  {column.label}
                </th>
              ))}
            </motion.tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <motion.tr
                key={row[idKey]}
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.4,
                  delay: rowIndex * 0.1 + 0.4,
                  ease: "easeOut",
                }}
                className="border-b last:border-b-0 border-[#E5E3E2] hover:bg-[#FBFAF9] transition-colors"
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={cn(
                      "py-2 @md:py-4 px-3 @md:px-6",
                      column.key === idKey || column.key === "name"
                        ? "text-[#36322F]"
                        : "text-[#605A57]",
                    )}
                  >
                    {column.key === idKey ? (
                      String(row[column.key])
                    ) : (
                      <ScrambleText
                        text={String(row[column.key])}
                        delay={rowIndex * 0.1 + 0.6}
                        duration={0.8}
                        isInView={isInView}
                      />
                    )}
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
