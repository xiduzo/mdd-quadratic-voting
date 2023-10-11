import Link from "next/link";

import { AuthShowcase } from "./_components/auth-showcase";

export const runtime = "edge";

const HomePage = () => {
  return (
    <main className="flex h-screen flex-col items-center">
      <AuthShowcase />
      <Link href="/create">Create event</Link>
      <Link href="/join">Join event</Link>
    </main>
  );
};

export default HomePage;
