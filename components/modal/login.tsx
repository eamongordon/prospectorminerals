"use client";

//import { createContact } from "@/lib/functions/contacts/contacts";
import { useModal } from "@/components/modal/registration/provider";
import LoginForm from "@/components/registration/login-form";
import { useRouter } from "next/navigation";

export default function LoginModal() {
  const router = useRouter();
  const modal = useModal();

  /*
  useEffect(() => {
    setData((prev) => ({
      ...prev
    }));
  }, [data.name]);
*/
  return (
    <LoginForm isModal={true} onCloseAction={modal?.hide} />
  );
}