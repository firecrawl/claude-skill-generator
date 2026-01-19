import { useEffect } from "react";

interface UseDropdownCloseProps {
  isOpen: boolean;
  onClose: () => void;
  dropdownClassName?: string;
}

export const useDropdownClose = ({
  isOpen,
  onClose,
  dropdownClassName = ".dropdown-content",
}: UseDropdownCloseProps) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (e.target instanceof Element) {
        const dropdown = e.target.closest(dropdownClassName);
        if (!dropdown) {
          onClose();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, dropdownClassName]);
};
