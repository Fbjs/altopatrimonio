
"use client";

import React, { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import Image from "next/image";

export function LoadingScreen({ onFinished }: { onFinished: () => void }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setVisible(false);
            setTimeout(onFinished, 500); // Wait for fade out animation
          }, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 20); // Adjust interval for smoother or faster loading

    return () => clearInterval(interval);
  }, [onFinished]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background transition-opacity duration-500",
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      <div className="flex flex-col items-center gap-6">
        <Image src="/logo.png" alt="AltoPatrimonio Logo" width={80} height={80} className="h-20 w-auto animate-pulse" />
        <div className="w-64">
          <Progress value={progress} className="h-2" />
          <p className="mt-2 text-center text-sm font-medium text-muted-foreground">
            Cargando {progress}%
          </p>
        </div>
      </div>
    </div>
  );
}
