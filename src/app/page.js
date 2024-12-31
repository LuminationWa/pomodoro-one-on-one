import Clock from "@/components/Clock";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col">
        <a href="/signup">Register</a>
        <a href="/login">Login</a>
      </div>
      <Clock />
    </main>
  );
}
