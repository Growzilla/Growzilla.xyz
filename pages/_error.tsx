import { NextPageContext } from 'next';

interface ErrorProps {
  statusCode: number | undefined;
}

function ErrorPage({ statusCode }: ErrorProps) {
  return (
    <div className="min-h-screen bg-zilla-black flex items-center justify-center px-4">
      <div className="fixed inset-0 pointer-events-none z-0 opacity-40 bg-grid-zilla" />
      <div className="fixed inset-0 pointer-events-none z-0 bg-zilla-radial" />

      <div className="relative z-10 text-center max-w-md">
        <div className="mb-6">
          <span className="font-display text-7xl font-bold text-zilla-neon">
            {statusCode || '???'}
          </span>
        </div>
        <h1 className="font-display text-2xl font-bold text-white mb-3">
          {statusCode === 404
            ? 'Page not found'
            : 'Something went wrong'}
        </h1>
        <p className="text-gray-400 mb-8">
          {statusCode === 404
            ? "The page you're looking for doesn't exist or has been moved."
            : 'An unexpected error occurred. Please try again.'}
        </p>
        <a
          href="/"
          className="btn-zilla inline-flex items-center gap-2 px-6 py-3 text-sm font-medium"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPage;
