import HeaderContent from './header-content'
import { getSession } from "@/lib/auth";

export default async function HeaderWrapper() {
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
    <HeaderContent
      loggedIn={false}
    />
  )
}