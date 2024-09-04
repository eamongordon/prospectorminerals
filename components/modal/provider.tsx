"use client";

import Modal from ".";
import { ReactNode, createContext, useContext, useState, useEffect } from "react";

interface ModalContextProps {
  show: (content: ReactNode, type?: ModalType) => void;
  hide: () => void;
  modalType: ModalType;
  setModalType: (type: ModalType) => void;
}

type ModalType = "search" | "registration";

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<ModalType>("search");

  // Prevent Scrolling when modal is open
  useEffect(() => {
    if (showModal) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [showModal]);

  const show = (content: ReactNode, type: ModalType = "search") => {
    setModalContent(content);
    setModalType(type);
    setShowModal(true);
  };

  const hide = () => {
    setShowModal(false);
    setTimeout(() => {
      setModalContent(null);
    }, 300); // Timeout adjusts transition duration
  };

  return (
    <ModalContext.Provider value={{ show, hide, modalType, setModalType }}>
      {children}
      {showModal && (
        <Modal showModal={showModal} setShowModal={setShowModal} modalType={modalType}>
          {modalContent}
        </Modal>
      )}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}