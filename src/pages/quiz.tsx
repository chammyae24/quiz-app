import { useEffect, useState } from "react";
import { useTransition } from "@react-spring/web";
import { useQuizDispatch, useQuizSelector } from "../hooks";
import CountDown from "../components/CountDown";
import { Link } from "react-router-dom";
import { quizEnd } from "../app/quizSlice";

const Quiz = () => {
  const isStarted = useQuizSelector(state => state.quiz.start);

  const dispatch = useQuizDispatch();

  //   const transition = useTransition([step], {
  //     from: { opacity: 0, x: 300, display: "none" },
  //     enter: () => async next => {
  //       await next({ opacity: 1 });
  //       await next({ x: 0, display: "flex" });
  //     },
  //     leave: () => async next => {
  //       await next({ opacity: 0, x: -300 });
  //       await next({ display: "none" });
  //     },
  //     config: { duration: 500 }
  //   });

  return (
    <section className="h-full">
      {isStarted ? "Start" : <CountDown />}

      <Link
        to="/"
        className="fixed bottom-0 right-0 bg-white"
        onClick={() => {
          dispatch(quizEnd());
        }}
      >
        Back
      </Link>
    </section>
  );
};

export default Quiz;
