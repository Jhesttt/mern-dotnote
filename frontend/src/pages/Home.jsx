import Header from "../components/Header.jsx";
import Notes from "../components/Notes.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get(
          "https://mern-dotnote.onrender.com/api/notes"
        );
        setNotes(res.data);
      } catch (error) {
        console.log("Error fetching notes", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div>
      <Header setNotes={setNotes} notes={notes} />
      <Notes
        setNotes={setNotes}
        notes={notes}
        loading={loading}
        setLoading={setLoading}
      />
    </div>
  );
};

export default Home;
