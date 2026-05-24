// import logo1 from "../img/logo1.png"
import "../App.css"
import { NavLink } from "react-router-dom";
import { useState } from "react";
export default function Nav() {
const [isOpen, setIsOpen] = useState(false);

  return (

    <nav className="flex items-center justify-between px-10 py-4 bg-white shadow-md relative top-full" >
 
      {/* LEFT: Logo */}
      <div className="flex items-center gap-3">

        {/* Icon Box */}
        <div className="w-10 h-10 flex items-center justify-center bg-[#1a4a3a] text-white rounded-lg">
          ⏱
        </div>

        {/* Text */}
        <div>
          <h1 className="text-xl font-bold text-emerald-700">BillByTime</h1>
          <p className="text-xs text-gray-500">TIME · TRACK · INVOICE</p>
        </div>

      </div>

      {/* CENTER: Links */}
     <ul className="flex items-center gap-8 hidden md:flex">
        <li><a href="#" className="text-gray-700 hover:text-green-600">How It Works</a></li>
        <li><a href="#" className="text-gray-700 hover:text-green-600">Features</a></li>
        <li><a href="#" className="text-gray-700 hover:text-green-600">Pricing</a></li>
        <li><a href="#" className="text-gray-700 hover:text-green-600">Reviews</a></li>
      </ul>

      {/* RIGHT: Buttons */}
      <div className="flex items-center gap-4 hidden md:flex">
        <NavLink to="/login">
          <button className="px-4 py-2 border border-gray-400 rounded-md text-gray-700 hover:bg-gray-100 transition">
            Log In
          </button>
        </NavLink >
        <NavLink to="/signup">
          <button className="px-5 py-2 bg-[#1a4a3a] text-white rounded-md hover:bg-green-700 transition">
            Signup
          </button>
        </NavLink >

      </div>

      {/* Mobile Hamburger */}
  <button
    className="md:hidden"
    onClick={() => setIsOpen(!isOpen)}
  >
    ☰
  </button>

<div
  className={`md:hidden fixed inset-0 z-50 transition-all duration-300 ${
    isOpen ? "visible opacity-100" : "invisible opacity-0"
  }`}
>
  {/* BACKDROP */}
  <div
    className="absolute bg-black/40 backdrop-blur-sm"
    onClick={() => setIsOpen(false)}
  />

  {/* SIDEBAR */}
  <div
    className={`absolute top-0 right-0 h-full w-[300px] bg-white/95 backdrop-blur-lg shadow-2xl border-l border-gray-200
    transform transition-all duration-300 ease-out
    ${isOpen ? "translate-x-0" : "translate-x-full"}`}
  >
    <div className="flex flex-col h-full p-6">

      {/* HEADER (LOGO + CLOSE) */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-[#1a4a3a] text-white flex items-center justify-center rounded-lg">
            ⏱
          </div>
          <span className="font-bold text-emerald-700 text-lg">
            BillByTime
          </span>
        </div>

        <button
          onClick={() => setIsOpen(false)}
          className="p-2 rounded-full hover:bg-gray-100 transition"
        >
          ✕
        </button>
      </div>

      {/* NAV LINKS */}
      <nav className="flex flex-col gap-4 text-gray-700 font-medium">
        {["How It Works", "Features", "Pricing", "Reviews"].map((item) => (
          <a
            key={item}
            href="#"
            onClick={() => setIsOpen(false)}
            className="px-3 py-2 rounded-lg hover:bg-indigo-50 hover:text-green-600 transition-all duration-300"
          >
            {item}
          </a>
        ))}
      </nav>

      {/* FOOTER BUTTONS */}
      <div className="mt-auto flex flex-col gap-3 pt-6">

        <NavLink to="/login" onClick={() => setIsOpen(false)}>
          <button className="w-full py-3 rounded-lg border border-gray-300 font-semibold hover:bg-gray-50 transition">
            Log In
          </button>
        </NavLink>

        <NavLink to="/signup" onClick={() => setIsOpen(false)}>
          <button className="w-full py-3 rounded-lg bg-[#1a4a3a] text-white font-semibold shadow-md hover:bg-indigo-700 transition">
            Signup
          </button>
        </NavLink>

      </div>

    </div>
  </div>
</div>
  
    </nav>

  )
}


