import { useEffect, useMemo } from "react";

import { useQuizDispatch, useQuizSelector } from "../hooks";
import CountDown from "../components/CountDown";
import { Link } from "react-router-dom";
import { fetchQuiz, quizEnd } from "../app/quizSlice";
import Question from "../components/Question";
import { useTransition } from "@react-spring/web";
import ScoreBoard from "../components/ScoreBoard";
import { shuffle } from "../utils";

// console.log(
//   shuffle([{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }, { a: 5 }, { a: 6 }])
// );
// console.log(
//   shuffle([
//     {
//       id: "Q1",
//       question: 'Which planet is known as the "Red Planet"?',
//       choices: [
//         {
//           id: "Q1_C1",
//           value: "Mercury"
//         },
//         {
//           id: "Q1_C2",
//           value: "Venus"
//         },
//         {
//           id: "Q1_C3",
//           value: "Mars"
//         },
//         {
//           id: "Q1_C4",
//           value: "Jupiter"
//         }
//       ],
//       correct_answer: "Q1_C3"
//     },
//     {
//       id: "Q2",
//       question: "What is the chemical symbol for the element gold?",
//       choices: [
//         {
//           id: "Q2_C1",
//           value: "Go"
//         },
//         {
//           id: "Q2_C2",
//           value: "Gd"
//         },
//         {
//           id: "Q2_C3",
//           value: "Au"
//         },
//         {
//           id: "Q2_C4",
//           value: "Ag"
//         }
//       ],
//       correct_answer: "Q2_C3"
//     },
//     {
//       id: "Q3",
//       question: "Who is the author of the Harry Potter book series?",
//       choices: [
//         {
//           id: "Q3_C1",
//           value: "J.R.R. Tolkien"
//         },
//         {
//           id: "Q3_C2",
//           value: "J.K. Rowling"
//         },
//         {
//           id: "Q3_C3",
//           value: "George R.R. Martin"
//         },
//         {
//           id: "Q3_C4",
//           value: "Stephen King"
//         }
//       ],
//       correct_answer: "Q3_C2"
//     },
//     {
//       id: "Q4",
//       question: "In which city is the Eiffel Tower located?",
//       choices: [
//         {
//           id: "Q4_C1",
//           value: "Paris"
//         },
//         {
//           id: "Q4_C2",
//           value: "London"
//         },
//         {
//           id: "Q4_C3",
//           value: "Rome"
//         },
//         {
//           id: "Q4_C4",
//           value: "New York City"
//         }
//       ],
//       correct_answer: "Q4_C1"
//     },
//     {
//       id: "Q5",
//       question: "What is the capital city of Australia?",
//       choices: [
//         {
//           id: "Q5_C1",
//           value: "Sydney"
//         },
//         {
//           id: "Q5_C2",
//           value: "Melbourne"
//         },
//         {
//           id: "Q5_C3",
//           value: "Canberra"
//         },
//         {
//           id: "Q5_C4",
//           value: "Brisbane"
//         }
//       ],
//       correct_answer: "Q5_C3"
//     },
//     {
//       id: "Q6",
//       question: "Who painted the Mona Lisa?",
//       choices: [
//         {
//           id: "Q6_C1",
//           value: "Vincent van Gogh"
//         },
//         {
//           id: "Q6_C2",
//           value: "Pablo Picasso"
//         },
//         {
//           id: "Q6_C3",
//           value: "Leonardo da Vinci"
//         },
//         {
//           id: "Q6_C4",
//           value: "Michelangelo"
//         }
//       ],
//       correct_answer: "Q6_C3"
//     },
//     {
//       id: "Q7",
//       question: 'Which animal is known as the "King of the Jungle"?',
//       choices: [
//         {
//           id: "Q7_C1",
//           value: "Tiger"
//         },
//         {
//           id: "Q7_C2",
//           value: "Lion"
//         },
//         {
//           id: "Q7_C3",
//           value: "Elephant"
//         },
//         {
//           id: "Q7_C4",
//           value: "Gorilla"
//         }
//       ],
//       correct_answer: "Q7_C2"
//     },
//     {
//       id: "Q8",
//       question: "What is the largest ocean in the world?",
//       choices: [
//         {
//           id: "Q8_C1",
//           value: "Atlantic Ocean"
//         },
//         {
//           id: "Q8_C2",
//           value: "Indian Ocean"
//         },
//         {
//           id: "Q8_C3",
//           value: "Pacific Ocean"
//         },
//         {
//           id: "Q8_C4",
//           value: "Arctic Ocean"
//         }
//       ],
//       correct_answer: "Q8_C3"
//     },
//     {
//       id: "Q9",
//       question: "Who was the first person to set foot on the moon?",
//       choices: [
//         {
//           id: "Q9_C1",
//           value: "Neil Armstrong"
//         },
//         {
//           id: "Q9_C2",
//           value: "Buzz Aldrin"
//         },
//         {
//           id: "Q9_C3",
//           value: "Yuri Gagarin"
//         },
//         {
//           id: "Q9_C4",
//           value: "John F. Kennedy"
//         }
//       ],
//       correct_answer: "Q9_C1"
//     },
//     {
//       id: "Q10",
//       question: "What is the main language spoken in Brazil?",
//       choices: [
//         {
//           id: "Q10_C1",
//           value: "Spanish"
//         },
//         {
//           id: "Q10_C2",
//           value: "Portuguese"
//         },
//         {
//           id: "Q10_C3",
//           value: "French"
//         },
//         {
//           id: "Q10_C4",
//           value: "Italian"
//         }
//       ],
//       correct_answer: "Q10_C2"
//     }
//   ])
// );

const Quiz = () => {
  const isStarted = useQuizSelector(state => state.quiz.start);
  const quizs = useQuizSelector(state => state.quiz.quizs);
  const step = useQuizSelector(state => state.quiz.step);
  const settings = useQuizSelector(state => state.quiz.settings);

  // const questions = useMemo(() => shuffle(quizs), [quizs]);

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
