"use client";

import { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

type ScrollWrapperProps = {
  children: ReactNode;
};

export default function ScrollWrapper({ children }: ScrollWrapperProps) {
  const smootherRef = useRef<ScrollSmoother | null>(null);

  useEffect(() => {
    smootherRef.current = ScrollSmoother.create({
      wrapper: "#wrapper",
      content: "#content",
      smooth: 1.2,
      effects: true,
    });

    return () => smootherRef.current?.kill();
  }, []);

  return (
    <div id="wrapper">
      <div id="content">{children}</div>
    </div>
  );
}
