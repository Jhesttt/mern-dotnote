import { useParams } from "react-router";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { IconPencil } from "@tabler/icons-react";
import { FaPen } from "react-icons/fa";
import EditNote from "../components/EditNote";

const NoteDetails = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [createdAt, setCreatedAt] = useState(null);
  const [currentID, setCurrentID] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/notes/${id}`);
        setCurrentID(res.data.note._id);
        setTitle(res.data.note.title);
        setContent(res.data.note.content);
        setCreatedAt(res.data.note.createdAt);
      } catch (error) {
        console.log(`Error fetching note: ${id}`, error);
      }
    };

    fetchNote();
  }, []);

  const date = new Date(createdAt);
  const formatted = date.toLocaleString("en-US", {
    timeZone: "Asia/Manila",
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  const created = formatted.replace(/, (\d{4}),/, ", $1 |");

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header />

        <div className="flex-grow overflow-auto px-4 sm:px-12 md:px-16 lg:px-24 py-4 sm:py-9 duration-150">
          <div className="flex justify-between gap-9 items-center mb-1">
            <h1 className="text-[var(--text2)] font-bold text-xl sm:text-2xl">
              {title}
            </h1>
            <button
              className="cursor-pointer"
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              <FaPen className="text-[var(--text)] hover:text-[var(--accent)] duration-300" />
            </button>
          </div>
          <p className="text-[#6b7280] mb-4 text-sm sm:text-[16px]">
            Created at {created}
          </p>
          <p className="text-[var(--text)] text-md sm:text-lg whitespace-pre-line text-justify">
            {content}
          </p>
        </div>
      </div>
      <EditNote
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        title={title}
        content={content}
        id={currentID}
      />
    </>
  );
};

export default NoteDetails;
