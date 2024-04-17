"use client";

import React, { FC, useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import { ArrowUp } from "lucide-react";
import { Button } from "./ui/button";

const ScrollToTopButton: FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = 200;

      setVisible(scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  });

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Button
      onClick={handleScrollTop}
      variant="outline"
      className={cn(
        visible ? "block" : "hidden",
        "fixed bottom-10 right-10 z-50 rounded-full",
      )}
      size="lg"
    >
      <ArrowUp />
    </Button>
  );
};

export default ScrollToTopButton;
