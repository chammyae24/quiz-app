import { useEffect } from "react";

import { useQuizDispatch, useQuizSelector } from "../hooks";
import CountDown from "../components/CountDown";

import { fetchQuiz } from "../app/quizSlice";
import Question from "../components/Question";
import { useTransition } from "@react-spring/web";
import ScoreBoard from "../components/ScoreBoard";

const Quiz = () => {
  const isStarted = useQuizSelector(state => state.quiz.start);
  const quizs = useQuizSelector(state => state.quiz.quizs);
  const step = useQuizSelector(state => state.quiz.step);
  const settings = useQuizSelector(state => state.quiz.settings);

  const dispatch = useQuizDispatch();

  useEffect(() => {
    let isSubscribed = true;

    fetch("/data/config.json")
      .then(result => result.json())
      .then(data => {
        if (isSubscribed) {
          dispatch(fetchQuiz(data));
        }
      })
      .catch(err => {
        console.error(err);
      });

    return () => {
      isSubscribed = false;
    };
  }, [dispatch]);

  const transition = useTransition([step], {
    from: { opacity: 0, x: 300, display: "none" },
    enter: () => async next => {
      await next({ opacity: 1 });
      await next({ x: 0, display: "flex" });
    },
    leave: () => async next => {
      await next({ opacity: 0, x: -300 });
      await next({ display: "none" });
    },
    config: { duration: 500 }
  });

  return (
    <section className="flex h-full items-center justify-center">
      {isStarted ? (
        transition((style, item) =>
          item <= settings.questions_count - 1 ? (
            <Question transition={style} quiz={quizs[item]} />
          ) : (
            <ScoreBoard transition={style} />
          )
        )
      ) : (
        <CountDown />
      )}
    </section>
  );
};

export default Quiz;
