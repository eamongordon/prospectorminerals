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

export default function Modal({
  children,
  showModal,
  setShowModal,
}: {
  children: React.ReactNode;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}) {
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
  return (
    <AnimatePresence>
      {showModal && (
        <>
          {isMobile && <Leaflet setShow={setShowModal}>{children}</Leaflet>}
          {isDesktop && (
            <>
              <motion.div
                ref={desktopModalRef}
                key="desktop-modal"
                className="fixed inset-0 z-50 hidden min-h-screen items-top justify-center md:flex"
                initial={{ y: '-100vh' }} // Start above the screen
                animate={{ y: 0 }} // Slide to original position
                exit={{ y: '-100vh' }} // Slide out to above the screen
                transition={{ ease: "easeInOut" }} // Adjusted for smoother transition
                onMouseDown={(e) => {
                  if (desktopModalRef.current === e.target) {
                    setShowModal(false);
                  }
                }}
              >
                <div className="flex w-full h-[96px] bg-white flex items-center justify-center">
                  {children}
                </div>
              </motion.div>
              <motion.div
                key="desktop-backdrop"
                className="fixed inset-0 z-40 bg-gray-100 bg-opacity-10 backdrop-blur"
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
