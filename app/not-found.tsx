import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold">🚫 404 - Page Not Found</h1>
      <p className="text-lg text-gray-500 mt-2">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link
        href="/"
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Go Back Home
      </Link>
    </div>
  );
}
