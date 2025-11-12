export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-4">
          Finance Blog
        </h1>
        <p className="text-center text-muted-foreground">
          Professional architecture and scalable infrastructure
        </p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">Monorepo</h3>
            <p className="text-sm text-muted-foreground">
              Organized with Turborepo and pnpm workspaces
            </p>
          </div>
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">Scalable</h3>
            <p className="text-sm text-muted-foreground">
              Built for horizontal scaling and high performance
            </p>
          </div>
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">Modern Stack</h3>
            <p className="text-sm text-muted-foreground">
              Next.js 14, TypeScript, and best practices
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
