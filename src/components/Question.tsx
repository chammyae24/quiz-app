import { useState } from "react";
import { SpringValue, animated, useSpring } from "@react-spring/web";
import { quiz } from "../types";
import Timer from "./Timer";
import AnswerBox from "./AnswerBox";

//! 4 Answers Only
const ansBoxAddOns = [
  { option: "A", x: 75, y: -100, choose: false },
  { option: "B", x: -75, y: -100, choose: false },
  { option: "C", x: 75, y: -250, choose: false },
  { option: "D", x: -75, y: -250, choose: false }
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
  const [choices, setChoices] = useState(
    quiz.choices.map((choice, i) => ({ ...choice, ...ansBoxAddOns[i] }))
  );
  const [isShow, setIsShow] = useState(true);

  const spring = useSpring({
    opacity: isShow ? 1 : 0
  });

  return (
    <animated.div
      className="flex max-w-[300px] flex-col items-center justify-center gap-4 text-center text-white"
      style={transition}
    >
      <animated.h2 style={spring} className="text-sm text-q-accent">
        ~ Quiz ~
      </animated.h2>
      <animated.h1 style={spring} className="text-lg font-bold">
        {quiz.question}
      </animated.h1>
      <Timer fade={spring} />

      <div className="flex flex-wrap items-center justify-center gap-8">
        {choices.map(choice => (
          <AnswerBox
            key={choice.id}
            choice={{ ...choice }}
            setChoices={setChoices}
            setIsShow={setIsShow}
          />
        ))}
      </div>
    </animated.div>
  );
};

export default Question;
