import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import NoteDetails from "./pages/NoteDetails";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/note/:id" element={<NoteDetails />} />
      </Routes>
    </div>
  );
};

export default App;
