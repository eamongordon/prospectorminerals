'use client'

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <html>
            <body>
                <div className="h-screen flex items-center justify-center">
                    <h2>Something went wrong!</h2>
                    <button onClick={() => reset()}>Try again</button>
                </div>
            </body>
        </html>
    )
}