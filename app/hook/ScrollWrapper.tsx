"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function ScrollWrapper({ children }) {
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
