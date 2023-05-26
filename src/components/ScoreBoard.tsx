import { SpringValue, animated } from "@react-spring/web";
import { Link } from "react-router-dom";
import { useQuizDispatch, useQuizSelector } from "../hooks";
import { quizEnd } from "../app/quizSlice";
import replay from "../assets/rotate-right-solid.svg";
import share from "../assets/share-nodes-solid.svg";
import download from "../assets/download-solid.svg";

type Props = {
  transition: {
    opacity: SpringValue<number>;
    x: SpringValue<number>;
    display: SpringValue<string>;
  };
};

const ScoreBoard = ({ transition }: Props) => {
  const points = useQuizSelector(state => state.quiz.points);
  const scores = useQuizSelector(state => state.quiz.scores);
  const dispatch = useQuizDispatch();

  const win = scores >= 30;

  return (
    <animated.div className="flex-col gap-4" style={transition}>
      <div className="relative flex flex-col gap-4 rounded bg-white px-12 py-4 text-center text-black shadow-lg">
        <div className="absolute left-1/2 top-0 h-16  w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border-8 border-white bg-q-primary p-3 text-xl">
          {win ? "🏆" : "😭"}
        </div>
        <h1 className="mt-4 text-2xl font-bold text-q-secondary">
          {win ? "Congratulations" : "Sorry"}
        </h1>
        <p>You're correct {points} out 5 times.</p>
        <div className="flex flex-col items-center gap-1">
          <p>{scores}</p>
          <p className="w-fit rounded-full bg-q-primary px-2 py-1 text-xs text-white">
            CURRENT SCORE
          </p>
          <p>50</p>
          <p className="w-fit rounded-full bg-q-secondary px-2 py-1 text-xs text-white">
            BEST SCORE
          </p>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-center gap-8">
        <Link to="/" onClick={() => dispatch(quizEnd())}>
          <img src={replay} alt="home-icon" width={30} height={30} />
        </Link>
        <button>
          <img src={download} alt="download-icon" width={30} height={30} />
        </button>
        <button>
          <img src={share} alt="share-icon" width={30} height={30} />
        </button>
      </div>
    </animated.div>
  );
};

export default ScoreBoard;
