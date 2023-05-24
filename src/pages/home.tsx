import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="flex h-full items-center justify-center">
      <Link
        to="/quiz"
        className="rounded bg-white px-10 py-3 font-bold text-q-secondary shadow-md"
      >
        Start
      </Link>
    </section>
  );
};

export default Home;
