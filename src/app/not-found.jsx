export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-cyan-500">404</h1>
        <h2 className="text-2xl mt-4">Page Not Found</h2>
        <a href="/" className="mt-6 inline-block px-6 py-3 bg-cyan-500 text-white rounded-lg">
          Go Home
        </a>
      </div>
    </div>
  );
}