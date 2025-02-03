"use client";

import Leaflet from "@/components/modal/leaflet";
import useWindowSize from "@/lib/hooks/use-window-size";
import FocusTrap from "focus-trap-react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
} from "react";

export type ModalType = "search" | "registration";

interface ModalProps {
  children: React.ReactNode;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  modalType: ModalType;
}

export default function Modal({
  children,
  showModal,
  setShowModal,
  modalType,
}: ModalProps) {
  const desktopModalRef = useRef(null);
  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowModal(false);
      }
    },
    [setShowModal],
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  const { isMobile, isDesktop } = useWindowSize();

  const modalClasses =
    modalType === "search"
      ? "fixed inset-0 z-50 hidden min-h-screen items-top justify-center md:flex"
      : "fixed inset-0 z-50 hidden min-h-screen items-center justify-center md:flex";

  const animationProps =
    modalType === "search"
      ? {
        initial: { y: '-100vh' }, // Start above the screen
        animate: { y: 0 }, // Slide to original position
        exit: { y: '-100vh' }, // Slide out to above the screen
        transition: { ease: "easeInOut" }, // Adjusted for smoother transition
      } : {
        initial: { scale: 0.95 },
        animate: { scale: 1 },
        exit: { scale: 0.95 }
      };

  const wrapperClasses =
    modalType === "search"
      ? "flex w-full h-[96px] bg-white dark:bg-black items-center justify-center"
      : "sm:mx-auto w-full sm:max-w-md overflow-auto max-h-[calc(100%_-_7.5rem)] rounded-xl";

  const backdropClasses =
    modalType === "search"
      ? "fixed inset-0 z-40 bg-gray-100 bg-opacity-10 backdrop-blur"
      : "fixed inset-0 z-40 bg-black bg-opacity-50 bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-blur-[3px]";

  return (
    <AnimatePresence>
      {showModal && (
        <>
          {isMobile && <Leaflet setShow={setShowModal}>{children}</Leaflet>}
          {isDesktop && (
            <>
              <FocusTrap focusTrapOptions={{ initialFocus: false }}>
                <motion.div
                  ref={desktopModalRef}
                  key="desktop-modal"
                  className={modalClasses}
                  {...animationProps}
                  onMouseDown={(e) => {
                    if (desktopModalRef.current === e.target) {
                      setShowModal(false);
                    }
                  }}
                >
                  <div className={wrapperClasses}>
                    {children}
                  </div>
                </motion.div>
              </FocusTrap>
              <motion.div
                key="desktop-backdrop"
                className={backdropClasses}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowModal(false)}
              />
            </>
          )}
        </>
      )}
    </AnimatePresence>
  );
}