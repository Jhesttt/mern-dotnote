import { useState } from "react";
import { IconPlus } from "@tabler/icons-react";
import NoteModal from "./NoteModal";

const AddNote = ({ notes, setNotes }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-1 text-[var(--bg)] bg-[var(--accent)] rounded-3xl cursor-pointer hover:bg-[var(--hover)] duration-100 sm:py-2 sm:px-4 py-3 px-3"
      >
        <IconPlus size={20} />
        <span className="hidden sm:block">Add a Note</span>
      </button>

      <NoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        setNotes={setNotes}
        notes={notes}
      />
    </>
  );
};

export default AddNote;
