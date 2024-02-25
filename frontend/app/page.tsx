import { redirect } from "next/navigation";

export default function Home() {
  redirect("./menu");
  return (
    <>
      <div className="hero min-h-screen bg-gradient-to-r from-black to-primary">
        <div className="hero-overlay bg-opacity-70"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-lg">
            <h1 className="mb-5 text-6xl font-bold text-white">Aggie Menus</h1>
            <p className="mb-5 text-white text-lg">Coming soon!</p>
          </div>
        </div>
      </div>
    </>
  );
}
