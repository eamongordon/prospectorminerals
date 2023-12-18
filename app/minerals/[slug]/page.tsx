import Header from '@/components/header';
import Footer from '@/components/footer';

export default function Page({ params }: { params: { slug: string } }) {
    return (
        <main>
            <Header />
            <div>My Post: {params.slug}</div>
            <Footer />
        </main>
    )
}