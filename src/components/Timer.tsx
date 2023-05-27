import { useEffect } from "react";
import { useSpring, animated, SpringValue } from "@react-spring/web";
import { useQuizDispatch, useQuizSelector } from "../hooks";
import { resetTimer, setPointer, stepping, timerStart } from "../app/quizSlice";

const Timer = ({
  fade
}: {
  fade: {
    opacity: SpringValue<number>;
  };
}) => {
  const timer = useQuizSelector(state => state.quiz.timer);
  const timerPause = useQuizSelector(state => state.quiz.timerPause);
  const { time_duration } = useQuizSelector(state => state.quiz.settings);
  const dispatch = useQuizDispatch();

  useEffect(() => {
    if (timer === 0) {
      dispatch(stepping());
      dispatch(setPointer("auto"));
      dispatch(resetTimer());
    }
  }, [dispatch, timer, timerPause]);

  useEffect(() => {
    let interval: NodeJS.Timer | null = null;

    if (!timerPause) {
      interval = setInterval(() => {
        dispatch(timerStart());
      }, 1000);
    }

    if (timer === 0 && interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [dispatch, timer, timerPause]);

  const spring = useSpring({
    from: { num: 471 },
    to: { num: 160 },
    num: 471,
    config: { duration: time_duration * 1000 }
  });

  return (
    <animated.div
      style={fade}
      className="relative flex items-center justify-center"
    >
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
    </animated.div>
  );
};

export default Timer;
