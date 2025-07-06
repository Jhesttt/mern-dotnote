import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import NoteDetails from "./pages/NoteDetails";
import { useEffect, useState } from "react";
import axios from "axios";
import SiteLoading from "./pages/siteLoading";

const checkRender = async () => {
  try {
    const res = await axios.get("https://mern-dotnote.onrender.com/api/notes");
    return true;
  } catch (error) {
    return false;
  }
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [backendUp, setBackendUp] = useState(false);

  useEffect(() => {
    const backendStatus = async () => {
      while (!backendUp) {
        const isUp = await checkRender();
        if (isUp) {
          setBackendUp(true);
          setIsLoading(false);
          break;
        }
        await new Promise((resolve) => setTimeout(resolve, 3000)); // Retry every 5 seconds
      }
    };

    backendStatus();
  }, [backendUp]);

  return (
    <div>
      <SiteLoading loading={isLoading} />
      {!isLoading && (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/note/:id" element={<NoteDetails />} />
        </Routes>
      )}
    </div>
  );
};

export default App;
