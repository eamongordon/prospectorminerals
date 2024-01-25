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
                <div className="h-screen flex-col gap-y-5 items-center justify-center">
                    <h2>Something went wrong!</h2>
                    <div className="flex-row gap-x-3 items-center justify-center">
                        <button className="bg-gray-100 p-3 hover:bg-gray-300 dark:bg-gray-600 rounded-xl">Try Again</button>
                        <button className="bg-gray-100 p-3 dark:bg-gray-600 hover:bg-gray-300 rounded-xl">Go Home</button>
                    </div>
                </div>
            </body>
        </html>
    )
}