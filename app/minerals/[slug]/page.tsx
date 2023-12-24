
import Header from '@/components/header';
import Footer from '@/components/footer';
import LoginModalButton from '@/components/registration/login-modal-button';
import LoginModal from '@/components/modal/login';
//import LoginForm from '@/components/registration/login-form';
//import Modal from "@/components/next-ui-modal";

export default function Page({ params }: { params: { slug: string } }) {
    return (
        <main>
            <Header />
            <div>My Post: {params.slug}</div>
            <LoginModalButton>
                <LoginModal />
            </LoginModalButton>
            <Footer />
        </main>
    )
}