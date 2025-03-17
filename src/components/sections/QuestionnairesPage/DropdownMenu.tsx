import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

interface DropdownMenuProps {
  questionnaireId: string;
  onDelete: () => void;
}

const DropdownMenu = ({ questionnaireId, onDelete }: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null); // Ref for the button

  const handleEdit = () => {
    navigate(`/catalog/${questionnaireId}/edit`);
  };

  const handleRun = () => {
    navigate(`/catalog/${questionnaireId}/run`);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen((prev) => !prev)}
        className="origin-center rotate-90 transform rounded-md p-1 text-2xl hover:bg-gray-300"
      >
        ...
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 rounded-md border bg-white shadow-lg">
          <button
            onClick={handleEdit}
            className="block w-full px-4 py-2 text-left hover:bg-gray-100"
          >
            ✏️ Edit
          </button>
          <button
            onClick={handleRun}
            className="block w-full px-4 py-2 text-left hover:bg-gray-100"
          >
            ▶️ Run
          </button>
          <button
            onClick={onDelete}
            className="block w-full px-4 py-2 text-left text-red-500 hover:bg-gray-100"
          >
            ❌ Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
