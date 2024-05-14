import { useEffect, useState } from "react";

function getGreeting() {
  return [
    "Hi there! It’s",
    new Date().toLocaleString("en", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: "America/New_York",
    }),
    "in New York.",
  ].join(" ");
}

export function useGreeting() {
  const [greeting, setGreeting] = useState<string>(getGreeting);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setGreeting(getGreeting());
    }, 1000 * 60);
    setGreeting(getGreeting());
    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  return greeting;
}
