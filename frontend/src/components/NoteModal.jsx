import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const NoteModal = ({ isOpen, onClose, notes, setNotes }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Prevent background scroll
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5001/api/notes", {
        title,
        content,
      });
      toast.success("Note created successfully!");
      console.log(res);

      setNotes((prev) => [res.data, ...prev]);
      onClose();
      setTitle("");
      setContent("");
      navigate("/");
    } catch (error) {
      console.log("Error creating note", error);
      toast.error("Error creating note");
    } finally {
      setLoading(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-xs"
        onClick={onClose}
      ></div>

      {/* Modal content */}
      <div className="relative z-50 w-[90%] max-w-2xl bg-[var(--bg)] p-6 rounded-2xl shadow-lg animate-fadeIn animate-fadeOut">
        <form onSubmit={handleSubmit}>
          <input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            type="text"
            placeholder="Title"
            className="w-full mb-3 rounded border-0 focus:outline-none text-xl font-semibold text-[var(--text)]"
          />
          <textarea
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
            placeholder="Description"
            className="custom-scroll w-full max-h-[60vh] min-h-[20vh] border-0 focus:outline-none text-[var(--text)] resize-none"
          ></textarea>

          <div className="flex justify-end mt-4">
            <button
              onClick={onClose}
              className="mr-2 px-4 py-2 bg-[var(--secondary)] hover:bg-[var(--hover2)] text-[var(--text)] rounded-3xl cursor-pointer duration-150"
            >
              Cancel
            </button>
            <button className="px-4 py-2 bg-[var(--accent)] hover:bg-[var(--hover)] text-[var(--bg)] rounded-3xl cursor-pointer duration-150">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteModal;
