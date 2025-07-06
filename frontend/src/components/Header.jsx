import { useLocation, useNavigate } from "react-router";
import AddNote from "./AddNote";
import Darkmode from "./DarkMode.jsx";

const Header = ({ notes, setNotes }) => {
  const location = useLocation();
  const isNoteDetails = location.pathname.startsWith("/note/");
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between px-4 sm:px-12 md:px-16 lg:px-24 py-4 md:py-5 bg-[var(--bg)] shadow-md duration-150">
      <h1
        className="text-2xl sm:text-3xl font-extrabold text-[var(--accent)] cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      >
        <span className="text-[var(--text)]">DotNote</span>.
      </h1>
      <div className="flex gap-2 sm:gap-4 items-center">
        {!isNoteDetails && <AddNote setNotes={setNotes} notes={notes} />}
        <Darkmode />
      </div>
    </div>
  );
};

export default Header;
