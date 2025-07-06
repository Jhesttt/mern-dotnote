import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const EditNote = ({ isOpen, onClose, title, content, id }) => {
  const [editTitle, setEditTitle] = useState(title);
  const [editContent, setEditContent] = useState(content);

  useEffect(() => {
    if (isOpen) {
      setEditTitle(title);
      setEditContent(content);
      document.body.style.overflow = "hidden"; // Prevent background scroll
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    try {
      const res = await axios.put(`http://localhost:5001/api/notes/${id}`, {
        title: editTitle,
        content: editContent,
      });
      console.log(res.data);
      onClose();
    } catch (error) {
      console.log("Error updating notes.", error);
      toast.error("Failed to update notes");
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
        <form
          onSubmit={() => {
            handleSubmit();
          }}
        >
          <input
            value={editTitle}
            onChange={(e) => {
              setEditTitle(e.target.value);
            }}
            type="text"
            placeholder="Title"
            className="w-full mb-3 rounded border-0 focus:outline-none text-xl font-semibold text-[var(--text)]"
          />
          <textarea
            value={editContent}
            onChange={(e) => {
              setEditContent(e.target.value);
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

export default EditNote;
