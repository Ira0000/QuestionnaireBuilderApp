import { PropsWithChildren } from "react";
import { Modal as ResponsiveModal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import css from "../Modal/mainModalStyles.module.css";
import Loader from "@/components/ui/Loader/Loader";

interface ModalLoaderProps extends PropsWithChildren {
  isOpen: boolean;
  isShowCloseIcon?: boolean;
}

const ModalLoader = ({ isOpen }: ModalLoaderProps) => {
  return (
    <ResponsiveModal
      open={isOpen}
      onClose={() => {}}
      focusTrapped={false}
      center
      closeIcon={null}
      showCloseIcon={false}
      classNames={{
        overlay: css.mainModalOverlay,
        modal: css.mainModalContent,
      }}
    >
      <Loader />
    </ResponsiveModal>
  );
};

export default ModalLoader;
