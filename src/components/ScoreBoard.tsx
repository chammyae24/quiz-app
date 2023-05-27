import { useEffect, useRef, useState } from "react";
import { SpringValue, animated } from "@react-spring/web";
import { Link } from "react-router-dom";
import * as htmlToImage from "html-to-image";
import Cookies from "js-cookie";
import { useQuizDispatch, useQuizSelector } from "../hooks";
import { quizEnd, setBestScores } from "../app/quizSlice";
import replay from "../assets/rotate-right-solid.svg";
import download from "../assets/download-solid.svg";
import share from "../assets/share-nodes-solid.svg";

type Props = {
  transition: {
    opacity: SpringValue<number>;
    x: SpringValue<number>;
    display: SpringValue<string>;
  };
};

const ScoreBoard = ({ transition }: Props) => {
  const scoreRef = useRef(null);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const [href, setHref] = useState("");

  const points = useQuizSelector(state => state.quiz.points);
  const scores = useQuizSelector(state => state.quiz.scores);
  const bestScores = useQuizSelector(state => state.quiz.bestScores);
  const { minumum_scores, questions_count } = useQuizSelector(
    state => state.quiz.settings
  );
  const dispatch = useQuizDispatch();

  const win = scores >= minumum_scores;

  const generateImage = async () => {
    try {
      const element = scoreRef.current;

      if (!element) return;

      const image = await htmlToImage.toPng(element);
      setHref(image);

      if (linkRef.current) {
        linkRef.current.href = image;
        linkRef.current.click();
      }
    } catch (error) {
      console.error("Error generating or sharing image:", error);
    }
  };

  const handleSystemShare = async () => {
    try {
      const element = scoreRef.current;

      if (!element) return;

      const image = await htmlToImage.toCanvas(element);

      image.toBlob(async blob => {
        if (navigator.share) {
          await navigator
            .share({
              title: "Share Image",
              files: [new File([blob!], "scores.png", { type: "image/png" })]
            })
            .then(() => console.log("Image shared successfully."))
            .catch(error => {
              console.error("Error sharing image:", error);
            });
        } else {
          console.warn("Web Share API is not supported in this browser.");
        }
      });
    } catch (error) {
      console.error("Error generating or sharing image:", error);
    }
  };

  useEffect(() => {
    const cookies = Cookies.get("best-scores");
    if (cookies) {
      if (scores >= parseInt(cookies)) {
        dispatch(setBestScores(scores));
        Cookies.set("best-scores", scores.toString());
      } else {
        dispatch(setBestScores(parseInt(cookies)));
      }
    } else {
      dispatch(setBestScores(scores));
      Cookies.set("best-scores", scores.toString());
    }
  }, [scores, dispatch]);

  return (
    <animated.div className="flex-col gap-4" style={transition}>
      <div ref={scoreRef} className="pt-9">
        <div className="relative flex flex-col gap-4 rounded bg-white px-12 py-4 text-center text-black shadow-lg">
          <div className="absolute left-1/2 top-0 box-content flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-q-accent  bg-q-primary text-xl outline outline-8 outline-white">
            {win ? "🏆" : "😭"}
          </div>
          <h1 className="mt-4 text-2xl font-bold text-q-secondary">
            {win ? "Congratulations" : "Sorry"}
          </h1>
          <p>
            You're correct {points} out {questions_count} times.
          </p>
          <div className="flex flex-col items-center gap-1">
            <p>{scores}</p>
            <p className="w-fit rounded-full bg-q-primary px-2 py-1 text-xs text-white">
              CURRENT SCORE
            </p>
            <p>{bestScores}</p>
            <p className="w-fit rounded-full bg-q-secondary px-2 py-1 text-xs text-white">
              BEST SCORE
            </p>
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-center gap-8">
        <Link to="/" onClick={() => dispatch(quizEnd())}>
          <img src={replay} alt="home-icon" width={30} height={30} />
        </Link>
        <button onClick={generateImage}>
          <img src={download} alt="download-icon" width={30} height={30} />
        </button>
        <button onClick={handleSystemShare}>
          <img src={share} alt="share-icon" width={30} height={30} />
        </button>
        <a href={href} className="hidden" ref={linkRef} download="scores.png">
          link
        </a>
      </div>
    </animated.div>
  );
};

export default ScoreBoard;
