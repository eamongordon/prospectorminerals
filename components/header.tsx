import HeaderContent from './header-content';
import { getSession } from "@/lib/auth";
import { ModalProvider } from './modal/provider';

export default async function Header() {
  const session = await getSession();
  const { name, image, email } = session?.user || {};

  return (
    <ModalProvider>
      <HeaderContent
        loggedIn={!!session}
        userData={session ? { name, image, email } : undefined}
      />
    </ModalProvider>
  );
}