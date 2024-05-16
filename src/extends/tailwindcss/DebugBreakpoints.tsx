"use client";

import { useEffect, useState } from "react";

const DebugBreakpoints: React.FC<unknown> = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (localStorage.breakpoints === "1") {
      setIsVisible(true);
    }
  }, []);

  return (
    isVisible && (
      <div
        className={`pointer-events-none fixed left-0 top-0 z-50 p-1 font-bold text-red-500 opacity-80 before:content-["2xs"] xs:before:content-["xs"] sm:before:content-["sm"] md:before:content-["md"] lg:before:content-["lg"] xl:before:content-["xl"]`}
      />
    )
  );
};

export default DebugBreakpoints;
