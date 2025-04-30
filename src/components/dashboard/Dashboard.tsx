import { useEffect, useState } from "react";
import "../../styles/dashboard.css";
import NearMeIcon from "@mui/icons-material/NearMe";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Footer } from "../footer/Footer";

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentConcept, setCurrentConcept] = useState(0);

  const concepts = [
    {
      className: "concept concept-two flex",
      content: ["F", "O", "R", "E", "S", "T"],
      type: "hover",
    },
    {
      className: "concept concept-five",
      content: ["M", "O", "U", "N", "T", "A", "I", "N", "S"],
      type: "char",
    },
    {
      className: "concept concept-six",
      content: ["O", "C", "E", "A", "N"],
      type: "char",
    },
    {
      className: "concept concept-eight",
      content: ["F", "A", "L", "L", "S"],
      type: "char-div",
    },
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentConcept((prev: any) => (prev + 1) % concepts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
        <div className="main-content">
          {concepts.map((concept, index) => (
            <div
              key={index}
              className={`${concept.className} ${
                currentConcept === index ? "active" : "inactive"
              }`}
            >
              <div>
                <h1 className="word mb-4 image-text">
                  {concept.content.map((val, i) =>
                    concept.type === "char-div" ? (
                      <div key={i} className="char" data-content={val}>
                        {val}
                      </div>
                    ) : concept.type === "char" ? (
                      <span key={i} className="char">
                        {val}
                      </span>
                    ) : (
                      <div key={i} className="hover">
                        <h1 className="image-text">{val}</h1>
                      </div>
                    )
                  )}
                </h1>
                <Button
                  className="bg-[#174891] text-white font-bold w-[120px] py-2 px-4 rounded-full cursor-pointer group"
                  variant="contained"
                  onClick={() => navigate("./chat.ai")}
                  endIcon={
                    <NearMeIcon
                      style={{ transform: "rotate(50deg)" }}
                      className="transform transition-transform duration-300 group-hover:rotate-[-20deg]"
                    />
                  }
                >
                  Send
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-10 p-8 my-10">
          <div className="max-w-md">
            <h2 className="text-xl font-bold mb-4">
              Craft tailored itineraries with AI
            </h2>
            <p className="text-gray-700 mb-4">
                Going on a quick business trip or dreaming up the perfect gap
                year abroad? No need to spend hours crafting your ideal
                itinerary with Grava. Organize your trip with the AI planner.
            </p>
            <button
              className="bg-[#174891] text-white px-4 py-2 rounded-md font-semibold hover:bg-[#174891] transition cursor-pointer"
              onClick={() => navigate("./chat.ai")}
            >
              Try Here
            </button>
          </div>

          <div className="bg-blue-200 p-4 rounded-md shadow-lg">
            <div className="overflow-hidden">
              <img
                src="https://cms.inspirato.com/ImageGen.ashx?image=%2Fmedia%2F5682412%2FLondon_Dest_125855814.jpg&width=1081.5"
                alt="Venice"
                className="rounded-md w-[400px] h-auto object-cover transition duration-300 ease-in-out hover:scale-110"
              />
            </div>
          </div>
        </div>

        <h1 className="flex justify-start font-bold text-2xl text-[#174891] px-7 mb-10">
          Use AI to plan a trip to a traveller-loved spot
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-10 place-items-center">
          <div className="relative max-w-[280px]">
            <img
              className="rounded-lg shadow-lg object-cover w-full h-[280px] transition duration-300 ease-in-out hover:scale-110"
              src="https://thetourguy.com/wp-content/uploads/2021/11/London-Tower-Bridge-with-the-Shard-in-Background-700-x-425.jpg"
              alt="London"
            />
            <div className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 bg-red-500 text-white w-[60px] h-[60px] rounded-full flex flex-col items-center justify-center text-sm font-semibold shadow-md">
              <p>3</p>
              <p>Days</p>
            </div>
          </div>

          <div className="relative max-w-[280px]">
            <img
              className="rounded-lg shadow-lg object-cover w-full h-[280px] transition duration-300 ease-in-out hover:scale-110"
              src="https://c4.wallpaperflare.com/wallpaper/313/933/99/sunset-the-city-france-paris-wallpaper-preview.jpg"
              alt="Paris"
            />
            <div className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 bg-orange-500 text-white w-[60px] h-[60px] rounded-full flex flex-col items-center justify-center text-sm font-semibold shadow-md">
              <p>8-9</p>
              <p>Days</p>
            </div>
          </div>

          <div className="relative max-w-[280px]">
            <img
              className="rounded-lg shadow-lg object-cover w-full h-[280px] transition duration-300 ease-in-out hover:scale-110"
              src="https://static.barcelo.com/content/dam/bpt/posts/2024/10/stopover-in-dubai_dubai-by-night.jpg"
              alt="Dubai"
            />
            <div className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 bg-green-500 text-white w-[60px] h-[60px] rounded-full flex flex-col items-center justify-center text-sm font-semibold shadow-md">
              <p>3-5</p>
              <p>Days</p>
            </div>
          </div>
          <div className="relative max-w-[280px]">
            <img
              className="rounded-lg shadow-lg object-cover w-full h-[280px] transition duration-300 ease-in-out hover:scale-110"
              src="https://thumbs.dreamstime.com/b/idyllic-summer-landscape-clear-mountain-lake-alps-45054687.jpg"
              alt="Dubai"
            />
            <div className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 bg-pink-400 text-white w-[60px] h-[60px] rounded-full flex flex-col items-center justify-center text-sm font-semibold shadow-md">
              <p>3-5</p>
              <p>Days</p>
            </div>
          </div>
        </div>

      <Footer></Footer>
    </>
  );
};

export default Dashboard;
