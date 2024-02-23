"use client";

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import LoginForm from '@/components/registration/login-form';

export default function ModalNext({ isMobile }: { isMobile?: boolean }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    return (
        <>
            <Button onPress={onOpen} color="default" variant="flat" className={`${isMobile ? "px-4 mx-auto": "hidden sm:flex"}`}>Log In</Button>
            <Modal
                backdrop="opaque"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                classNames={{
                    backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
                }}
                radius="none"
                hideCloseButton={true}
                {...(isMobile ? {scrollBehavior:"outside"} : {})}
            >
                <ModalContent className="overflow-y-scroll bg-inherit shadow-none">
                    {(onClose) => (
                        <>
                            <LoginForm isModal={true} onCloseAction={onClose} />
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}