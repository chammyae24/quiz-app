import { SpringValue, animated } from "@react-spring/web";
import { quiz } from "../types";
import Timer from "./Timer";
import AnswerBox from "./AnswerBox";

//! 4 Answers Only
const ansBoxAddOns = [
  { option: "A", x: 75, y: -100 },
  { option: "B", x: -75, y: -100 },
  { option: "C", x: 75, y: -250 },
  { option: "D", x: -75, y: -250 }
];

type questionProps = {
  quiz: quiz;
  transition: {
    opacity: SpringValue<number>;
    x: SpringValue<number>;
    display: SpringValue<string>;
  };
};

const Question = ({ quiz, transition }: questionProps) => {
  return (
    <animated.div
      className="flex max-w-[300px] flex-col items-center justify-center gap-4 text-center text-white"
      style={transition}
    >
      <h2 className="text-sm text-q-accent">~ Quiz ~</h2>
      <h1 className="text-lg font-bold">{quiz.question}</h1>
      <Timer />

      <div className="flex flex-wrap items-center justify-center gap-8">
        {quiz.choices.map((choice, i) => (
          <AnswerBox
            key={choice.id}
            choice={{ ...choice, ...ansBoxAddOns[i] }}
          />
        ))}
      </div>
    </animated.div>
  );
};

export default Question;
