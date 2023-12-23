"use client";

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import LoginForm from '@/components/registration/login-form';

export default function ModalNext() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    return (
        <>
            <Button onPress={onOpen}>Open Modal</Button>
            <Modal
                backdrop="opaque"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                classNames={{
                    backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
                }}
                hideCloseButton={true}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                        <LoginForm isModal={true} onCloseAction={onClose}/>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}