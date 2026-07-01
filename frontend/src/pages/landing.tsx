import { Link } from "react-router";
import { Button } from "antd";

export default function Landing() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <nav className="flex items-center justify-between px-6 py-4 sm:px-10">
        <span className="text-lg font-semibold text-white">VidForge AI</span>
        <div className="flex items-center gap-3">
          <Link to="/login">
            <Button type="text" className="text-white!">
              Login
            </Button>
          </Link>
          <Link to="/register">
            <Button type="primary">Sign up</Button>
          </Link>
        </div>
      </nav>

      <div className="flex flex-1 flex-col items-center justify-center">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          VidForge AI
        </h1>
        <p className="text-2xl text-white">Welcome to VidForge AI</p>
      </div>
    </div>
  );
}
