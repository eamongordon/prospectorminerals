import HeaderContent from './header-content'
import { getSession } from "@/lib/auth";
import { LoginModalProvider } from './modal/registration/provider';
//
export default async function Header() {
  const session = await getSession();
  const { name, image, email } = session?.user || {};
  return session ? (
    <HeaderContent
      loggedIn={true}
      userData={
        {
          name: name,
          image: image,
          email: email
        }
      }
    />
  ) : (
    <LoginModalProvider>
      <HeaderContent
        loggedIn={false}
      />
    </LoginModalProvider>
  )
}