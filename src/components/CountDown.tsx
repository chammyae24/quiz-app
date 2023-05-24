import { useEffect } from "react";
import { useTransition, animated } from "@react-spring/web";
import { useQuizDispatch, useQuizSelector } from "../hooks";
import { countDown, quizStart } from "../app/quizSlice";

const CountDown = () => {
  const count = useQuizSelector(state => state.quiz.count);
  const dispatch = useQuizDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(countDown());
    }, 1000);

    if (count === -1) {
      clearInterval(interval);
      dispatch(quizStart());
    }

    return () => {
      clearInterval(interval);
    };
  }, [dispatch, count]);

  const countTransition = useTransition([count], {
    from: { opacity: 0, display: "none" },
    enter: { opacity: 1, display: "block" },
    leave: { opacity: 0, display: "none" }
  });

  return (
    <div className="flex h-full items-center justify-center">
      {countTransition((style, item) => (
        <animated.h1
          style={style}
          className="text-7xl font-bold text-white drop-shadow-md"
        >
          {item === 0 ? "GO" : item}
        </animated.h1>
      ))}
    </div>
  );
};

export default CountDown;
