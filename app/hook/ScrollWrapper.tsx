"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);


type ScrollWrapperProps = {
  children: React.ReactNode;
};

export default function ScrollWrapper({ children }: ScrollWrapperProps) {
  const smootherRef = useRef<ScrollSmoother | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    smootherRef.current?.kill();

    smootherRef.current = ScrollSmoother.create({
      wrapper: "#wrapper",
      content: "#content",
      smooth: 1.2,
      effects: true,
      smoothTouch: 0.1, // important for mobile
    });

    // Fix mobile Safari layout issues
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      smootherRef.current?.kill();
    };
  }, [pathname]);

  return (
    <div id="wrapper">
      <div id="content">{children}</div>
    </div>
  );
}
