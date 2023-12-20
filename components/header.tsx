import HeaderContent from './header-content'
import { getSession } from "@/lib/auth";

export default async function HeaderWrapper() {
  const session = await getSession();
  return (
    <HeaderContent loggedIn={session ? true : false} />
  )
}