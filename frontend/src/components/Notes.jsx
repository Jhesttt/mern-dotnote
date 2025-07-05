import { IconPencil, IconTrashFilled } from "@tabler/icons-react";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const Notes = ({ notes, setNotes, loading, setLoading }) => {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState();

  const handleView = (id) => {
    setSelectedId(id);
    navigate(`/note/${id}`);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:5001/api/notes/${id}`);
      toast.success("Note deleted successfully!");
      setNotes((prev) => prev.filter((note) => note._id !== id));
    } catch (error) {
      console.log("Error deleting notes", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 sm:grid sm:gap-5 sm:grid-cols-2 lg:grid-cols-3 px-4 sm:px-12 md:px-16 lg:px-24 py-4 sm:py-6 md:py-8">
      {notes.map((note) => {
        const { title, content, createdAt, _id } = note;

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
          <div
            key={_id}
            className="bg-[var(--bg)] p-4 rounded-2xl shadow-md flex flex-col gap-3 justify-between cursor-pointer hover:scale-103 duration-300"
            onClick={() => {
              handleView(_id);
            }}
          >
            <div>
              <div className="mb-1 flex justify-between items-center">
                <h2 className="text-[var(--text2)] font-bold text-xl line-clamp-1">
                  {title}
                </h2>
                <div className="flex items-center gap-2">
                  {/* <IconPencil
                    color="var(--text)"
                    size={20}
                    className="hover:opacity-50 duration-300 cursor-pointer"
                  /> */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent parent onClick from firing
                      handleDelete(_id);
                    }}
                    disabled={loading}
                  >
                    <IconTrashFilled
                      color="#ef4444"
                      size={20}
                      className="hover:opacity-50 duration-300 cursor-pointer"
                    />
                  </button>
                </div>
              </div>
              <p className="text-[var(--text)] clamp-3 whitespace-pre-wrap">
                {content}
              </p>
            </div>
            <p className="text-[#6b7280]">{created}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Notes;
