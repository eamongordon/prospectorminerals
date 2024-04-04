import HeaderContent from './header-content'
import { getSession } from "@/lib/auth";
import { LoginModalProvider } from './modal/registration/provider';
import { SearchModalProvider } from './modal/search/provider';

export default async function Header() {
  const session = await getSession();
  const { name, image, email } = session?.user || {};
  return (
    <SearchModalProvider>
      {session ? (
        <HeaderContent
          loggedIn={true}
          userData={
            {
              name: name,
              image: image,
              email: email
            }
          }
        />) : (
        <LoginModalProvider>
          <HeaderContent
            loggedIn={false}
          />
        </LoginModalProvider>
      )}
    </SearchModalProvider>
  );
}