import { Link } from "react-router-dom";
import { Button } from "./components/ui/button";
import CarouselHero from "./custom/CarouselHero";

function Hero() {
  return (
    <div className="mt-5 bg-white text-gray-800 text-center py-20 px-5">
      <h1 className="text-5xl font-bold mb-4 text-gray-900">
        Welcome to <span className="text-blue-600 font-bold">भ्रमण</span><span className="text-blue-600">Planner</span>
      </h1>
      <p className="text-2xl max-w-xl mx-auto mb-6 leading-relaxed text-gray-600 font-semibold">
        Plan smarter, travel better—let AI be your personal trip guide!
      </p>

      <Link to="/create-ai-trip">
        <Button className="bg-blue-600 text-white px-6 py-4 text-lg font-medium rounded transition duration-300 hover:bg-blue-800">
          Start Planning
        </Button>
      </Link>

      <div className="mt-5">
        <CarouselHero />
      </div>
    </div>
  );
}

export default Hero;
