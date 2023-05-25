import { useSpring, animated } from "@react-spring/web";
import { useEffect, useState } from "react";

const time = 10;
const Timer = () => {
  const [timer, setTimer] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(t => (t === 0 ? 0 : t - 1));
    }, 1000);

    if (timer === 0) {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [timer]);

  const spring = useSpring({
    from: { num: 471, num2: time },
    to: { num: 160, num2: 0 },
    num: 471,
    num2: time,
    config: { duration: time * 1000 }
  });

  return (
    <div className="relative flex items-center justify-center">
      <svg width="150" height="150">
        <path
          d="M 75 25 A 50 50 272 1 1 73 25"
          fill="none"
          stroke="white"
          strokeWidth="2"
        />
        <animated.path
          d="M 75 25 A 50 50 272 1 1 73 25"
          fill="none"
          stroke="#efbc5a"
          strokeWidth="10"
          strokeDasharray="471"
          strokeDashoffset={spring.num}
          strokeLinecap="round"
        />
      </svg>
      <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-q-accent">
        {timer}
      </p>
    </div>
  );
};

export default Timer;
