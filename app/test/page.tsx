/*
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
                <div className="h-screen w-screen flex gap-y-5 items-center justify-center">
                    <div className="flex-col items-center justify-center">
                        <h2 className="mb-3 mx-auto">Oops! Something went wrong.</h2>
                        <div className="flex gap-3 items-center justify-center">
                            <button className="bg-gray-100 py-3 px-5 dark:hover:bg-gray-700 hover:bg-gray-300 dark:bg-gray-600 rounded-xl">Try Again</button>
                            <button className="bg-gray-100 py-3 px-5 dark:hover:bg-gray-700 dark:bg-gray-600 hover:bg-gray-300 rounded-xl">Go Home</button>
                        </div>
                    </div>
                </div>
            </body>
        </html>
    )
}
*/