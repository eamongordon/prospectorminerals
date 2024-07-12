import Hero from '@/components/home/hero';
import Card from '@/components/home/card';
import { getSession } from "@/lib/auth";
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Prospector Minerals | Comprehensive Mineralogy Resource',
  description: 'Minerals, Localities, Articles, Resources, and More. Prospector Minerals offers mineralogy-related photos, information, resources and articles.',
}

export default async function Home() {
  const session = await getSession();
  const cardItemList = [
    {
      title: 'Learn',
      description: 'A starting place for mineralogy research.',
      cta: 'Get Started',
      image: '/Cavansite-45.jpeg',
      blurDataURL: "data:image/png;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAwADIDASIAAhEBAxEB/8QAHAAAAQQDAQAAAAAAAAAAAAAABwABBAYDBQgC/8QAJBAAAQMFAAIBBQAAAAAAAAAAAQACAwQFBhESITGhFCJRcZH/xAAYAQADAQEAAAAAAAAAAAAAAAABAwQCAP/EAB4RAAMBAQABBQAAAAAAAAAAAAABAgMRBBITFCEx/9oADAMBAAIRAxEAPwDlRZoYHSnQCemhdK8ABXvFsedUvbtiDfApdKeLXLzvkqLPTOi9hHd2HtFNvjzr8Kj5DjT43O5Yf4t5r1o6lwHKZbOttz4CdgrWuGjpBrjAMkkkgcXDF7aKiVuxtHDELMyKNhLUH8NqmRyM6IRzxu4ROgaAR6Uu1NFOSTLIaaMxc8hV+72GOoY48Bb9s7SPBCczs1okJMeRU/Q55pgQyvGOA8tZ8IW3S3Pp5XbC6hv8cEsLt6QWzGlia95aAqM9XX6T6ZpA04KSmuYOj+0k8SZLZWup3ggogY/lBhDQX/KFgJHpZ4al8Z8ErNQqDNNHQdFljXMG3r3U5U1rdh6BUF5ljGuinlvcrxropHx0N95hQuuX7aQH/KoV7vX1Jd93tV2atkkPlxUZzi72U6c1IurbJBm8nykoqSYYP//Z",
      link: "#"
    },
    {
      title: 'Minerals',
      description: 'Learn more about Minerals with our resources.',
      cta: 'Learn More',
      image: '/Krohnkite-110_horiz.jpeg',
      blurDataURL: "data:image/png;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAmADIDASIAAhEBAxEB/8QAHAAAAgIDAQEAAAAAAAAAAAAAAAcBBgIDBQQI/8QAJhAAAgECBgEEAwAAAAAAAAAAAAECAwQFBhESMVITISIyQkFxof/EABkBAAMBAQEAAAAAAAAAAAAAAAAEBQMBBv/EAB8RAAICAwACAwAAAAAAAAAAAAABAgMEBREhMRIUQf/aAAwDAQACEQMRAD8A+XKdtKfCNrsKmnDLXgOGqvt9C2wyyp0k1AbrxZTXUTbdhGqXGKKVrUX4MHQqdRqV8r+vwNCyq2/gDxJoFsq3+ixdGa5iYOLXKGXd5UlGDah/CqYthM7dv2tGM6ZQ9jFWXXZ6ZXgNrpPXgDLgz1F8ytfQpyhuGhhmIUJ0UnoICxvZUZLRlkscxTpxS3FTGy1WuMg52udr6hzyr20upnSqW2v1FLHM8u5lHNEl9x370GTJaq3ngbV07WVJ/EXWbaNFqe3Q5ks1S0a3nExTHHcJ6yFcnIhNeBnBwLap9Zyp01uf7A8rutWwJnUei+LPASpyXDADM3J8s+zJ8s+wABziI8s+zIcm+WwADvCNQAAA/9k=",
      link: "/minerals"
    },
    {
      title: 'Localities',
      description: 'Information and resources detailing localities.',
      cta: 'Learn More',
      image: '/Optimized-DeathValley-Floor (1).jpg',
      blurDataURL: "data:image/png;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAmADIDASIAAhEBAxEB/8QAGwAAAgMBAQEAAAAAAAAAAAAAAAQDBQYBAgj/xAAmEAACAQMCBgIDAAAAAAAAAAAAAQIDBREhQgYSFUFRUgQxFDKR/8QAGQEAAwEBAQAAAAAAAAAAAAAAAAECBAMF/8QAGREBAQEBAQEAAAAAAAAAAAAAAAETERQx/9oADAMBAAIRAxEAPwD6H5dBb5EdBN3enj9kL17tB7kaJXGpKsNSBx1FKt0h7IWndIexcqVokjk8YKfqkfJHUukfYr6OrbQCi6ovID4fWQfEUvZ/0inxBN7jISlJfeTyqjz9nnbNeTW9bm9xzq83uMsqmO5LCrnuLejKNNG6Se49u4Sfcz9KQ1F6B6KeMWf50vIFblAP00YwncaCpJ4KOdVxmwAzx1oVZsZoSbaABULSgsjsIaABFUOQAARv/9k=",
      link: "/localities"
    },
    {
      title: 'Articles',
      description: 'In-depth Educational Articles on mineralogy-related topics.',
      cta: 'Read More',
      image: '/NativeCopper-15_horiz.jpeg',
      blurDataURL: "data:image/png;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAmADIDASIAAhEBAxEB/8QAGwAAAQUBAQAAAAAAAAAAAAAAAAIDBAYHBQj/xAAlEAACAQQBAwQDAAAAAAAAAAAAAQIDBAURMRIhIgYTMlEVQUL/xAAZAQACAwEAAAAAAAAAAAAAAAADBAABAgX/xAAbEQACAwEBAQAAAAAAAAAAAAAAAQIDEQQxIf/aAAwDAQACEQMRAD8A8rdL+hUacm+GdixslV12O5aYTr0+kFK1RDQpcvCp07Oc/wCWOfjqn0zR7P08nHvEkTwEYr4gX0rRlcUsMweOnrhkerazp8o1Cthoxi/ErOaso009I1C9SYOzmcFpT+lgS3BbYB9FsO9g6kXKOy+4z2+hN6Mrxtw6cl3LVZ5XogvIVurb8Hua1L00SjcUoLW0OyuaU+NGcVc40/kOW+fe+8hR88vToLqh4XW9nD23wUP1FWjuSRPuM0pU35FVy14qsn3C0VNP6A6boyXw5bmtsCO59wH8OToiE3HgkRuppcgBpopNoRO4nL9hC4mnyAExE1jju565ZHqVZS5ACJIjbYgAAsyf/9k=",
      link: "/articles"
    },
    {
      title: 'Photos',
      description: 'Photos of mineral specimens from worldwide localities.',
      cta: 'View Photos',
      image: '/Amazonite-106_horiz.jpeg',
      blurDataURL: "data:image/png;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAoADIDASIAAhEBAxEB/8QAGwAAAwADAQEAAAAAAAAAAAAAAAYHBAUIAwL/xAAmEAACAgICAQMEAwAAAAAAAAABAgADBREEBiESEyIHMUGRFHGh/8QAGQEAAwEBAQAAAAAAAAAAAAAAAQIDBQAE/8QAGxEAAgIDAQAAAAAAAAAAAAAAAAIBEQMhMQT/2gAMAwEAAhEDEQA/AOWEqdz4EzeNjLbSNKYzYHDDkFfEoGI6snxJSGiLZlXpOsf1e24A+gzM5HULlTYrP6l3wnXqFCgqIwW9Zotq0EEm00UxvD8OR+fg7qCdqZqLaWrOiJ0t2vqCIjsqf5In2jF/xbX+OtTlaykrQnwn0V8mEcUqHUeXWpTZEp/AyFK1Loic+YfINQw8xv4vYCqAeuUWTL9OFmnRZ+JmlVwAY24rJ+6o87nPXC7Bu0fOPvXuxIAu3k8lSP5cbpOyoZiheTxm+O9iQj6g4YhrGCyvUdgpenRcfaIvduZRfW+iJ511JsdggT49g7ePzCMdnt+439mEtZKhHSwr9p7DluPzCEYSok96cg6HfqM3XA7DZTr5GEIJDGjeU9wsVde4f3MDJdmfkKQXJhCChrkXzkmJJ3CEIaBZ/9k=",
      link: "/photos"
    },
    {
      title: 'Members',
      description: session ? 'Manage your Account details and preferences.' : 'Join and gain access to all we have to offer. For Free.',
      cta: session ? 'Go to Settings' : 'Log In or Sign Up',
      image: '/AluminoAdamite-Smithsonite_horiz.jpeg',
      blurDataURL: "data:image/png;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAgADIDASIAAhEBAxEB/8QAGgAAAgMBAQAAAAAAAAAAAAAABQcAAwYECP/EACEQAAEDBQEAAwEAAAAAAAAAAAEAAgMEBQYREjJCcaEi/8QAFgEBAQEAAAAAAAAAAAAAAAAAAgED/8QAGBEAAwEBAAAAAAAAAAAAAAAAAAECERL/2gAMAwEAAhEDEQA/APMEFG6UjQROmssj9fyUcx63tlLdhMG12Nha08hZVYsFpFjshHn8Ukx54+BToZZoms8hUy2mInyEe2FtCSnsMjQTyUHq6J8JOwV6ClsEUkRIaFgMrsbYeiGpzWhVaK/kqIm6l04/aiYjVY9XNi52VvaC+RtY0dBJSmrXRa0UQjvT2jXSDkTY6JMhZz6/VxvyFvXpKV17eR7Kpfd5D8ipwDB1QZJHwQXBZrJ7pHOx2iEu23mQD0VTUXR8o0XKqcCpxnU+VvbvtRBzUHaiYz//2Q==",
      link: "/account/settings"
    },
  ];
  return (
    <main>
      <Hero />
      <div className="pb-20" />
      <div className='max-w-[1024px] mx-auto gap-4 grid grid-cols-1 w-600 md:grid-cols-2 lg:grid-cols-3 justify-items-center' id="explore">
        {
          cardItemList.map((obj, index) => (
            <div key={index}>
              <Card title={obj.title} description={obj.description} cta={obj.cta} image={obj.image} link={obj.link} />
            </div>
          ))
        }
      </div>
      <div className="pb-20" />
    </main>
  )
}
