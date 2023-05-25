import { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { resetTimer, setPointer, stepping } from "../app/quizSlice";
import { useQuizDispatch, useQuizSelector } from "../hooks";

type ansBoxProps = {
  choice: {
    id: string;
    value: string;
    option: string;
    x: number;
    y: number;
    choose: boolean;
  };
  setChoices: React.Dispatch<
    React.SetStateAction<
      {
        option: string;
        x: number;
        y: number;
        choose: boolean;
        id: string;
        value: string;
      }[]
    >
  >;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
};

const AnswerBox = ({ choice, setChoices, setIsShow }: ansBoxProps) => {
  const [ansBoxPosition, setAnsPosition] = useState(false);
  const [flipped, setFlipped] = useState(false);

  const settings = useQuizSelector(state => state.quiz.settings);
  const step = useQuizSelector(state => state.quiz.step);
  const pointerEvents = useQuizSelector(state => state.quiz.pointerEvent);
  const dispatch = useQuizDispatch();

  const spring = useSpring({
    x: ansBoxPosition ? choice.x : 0,
    y: ansBoxPosition ? choice.y : 0,
    opacity: choice.choose ? 0 : 1,
    s: ansBoxPosition ? 1.3 : 1
  });

  const clickHandler = () => {
    dispatch(setPointer("none"));
    // pause timer
    // check correct ans
    setChoices(choices =>
      choices.map(c =>
        c.id !== choice.id && !c.choose
          ? { ...c, choose: true }
          : { ...c, choose: false }
      )
    );
    setAnsPosition(p => !p);
    setIsShow(b => !b);
    setTimeout(() => {
      setFlipped(f => !f);
    }, 500);
    setTimeout(() => {
      dispatch(stepping());
      dispatch(setPointer("auto"));
      dispatch(resetTimer());
    }, 1600);
  };

  return (
    <animated.div
      className={`relative h-[120px] w-[120px] cursor-pointer text-black ${
        flipped && "flip"
      }`}
      onClick={clickHandler}
      style={{
        ...spring,
        pointerEvents,
        transform: spring.s?.to(s => `scale(${s})`)
      }}
    >
      <div className="card front flex-col gap-2 bg-white">
        <div className="grid h-8 w-8 place-content-center justify-self-start rounded-full bg-q-secondary font-bold text-white">
          {choice.option}
        </div>
        <div className="mx-2 text-sm">{choice.value}</div>
      </div>
      <div className="card back bg-[#eee]">Quiz</div>
    </animated.div>
  );
};

export default AnswerBox;
