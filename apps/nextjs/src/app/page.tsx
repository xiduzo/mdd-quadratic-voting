import Link from "next/link";

export const runtime = "edge";

const HomePage = () => {
  return (
    <main className="flex h-screen flex-col items-center">
      <Link href="/create">Create event</Link>
      <Link href="/join">Join event</Link>
    </main>
  );
};

export default HomePage;
