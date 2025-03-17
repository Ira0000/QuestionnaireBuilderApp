import { PropsWithChildren, useRef, useEffect } from "react";
import { Modal as ResponsiveModal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import css from "./mainModalStyles.module.css";
import Icon from "@/utils/icon";

interface ModalProps extends PropsWithChildren {
  isOpen: boolean;
  onClose: () => void;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose(); // Close the modal if click is outside
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <ResponsiveModal
      open={isOpen}
      onClose={onClose}
      focusTrapped={false}
      center
      closeIcon={
        <Icon id="icon-x" w={24} h={24} className={css.closeModalIcon} />
      }
      classNames={{
        overlay: css.mainModalOverlay,
        modal: css.mainModalContent,
        closeButton: css.closeMainModalButton,
      }}
    >
      <div ref={modalRef}>{children}</div>{" "}
      {/* Attach the ref to detect outside clicks */}
    </ResponsiveModal>
  );
};

export default Modal;
