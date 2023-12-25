
import Header from '@/components/header';
import Footer from '@/components/footer';
import LoginModalButton from '@/components/registration/login-modal-button';
import LoginModal from '@/components/modal/login';
import { LoginModalProvider } from "@/components/modal/registration/provider";
//import LoginForm from '@/components/registration/login-form';
//import Modal from "@/components/next-ui-modal";
import RegModal from "@/components/next-ui-modal";

export default function Page({ params }: { params: { slug: string } }) {
    return (
        <main>
            <LoginModalProvider>
            <Header />
            <div>My Post: {params.slug}</div>
            <RegModal/>
            <Footer />
            </LoginModalProvider>
        </main>
    )
}