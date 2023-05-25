type ansBoxProps = {
  choice: {
    id: string;
    value: string;
    option: string;
    x: number;
    y: number;
  };
};

const AnswerBox = ({ choice }: ansBoxProps) => {
  return (
    <div className="relative h-[120px] w-[120px] cursor-pointer text-black">
      <div className="card front flex-col gap-2 bg-white">
        <div className="grid h-8 w-8 place-content-center justify-self-start rounded-full bg-q-secondary font-bold text-white">
          {choice.option}
        </div>
        <div className="mx-2 text-sm">{choice.value}</div>
      </div>
      <div className="card back bg-[#eee]">Quiz</div>
    </div>
  );
};

export default AnswerBox;
