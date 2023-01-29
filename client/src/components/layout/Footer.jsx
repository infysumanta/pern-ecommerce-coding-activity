import React from "react";

export default function Footer() {
  return (
    <footer className="h-[2rem] bg-white shadow-md flex items-center justify-center absolute w-full bottom-0 p-2 bg-gray-100">
      <div className="text-sm">
        &copy; - {new Date().getFullYear()} - All Right Reserved
      </div>
    </footer>
  );
}
