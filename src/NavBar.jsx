function NavBar() {
  return (
    <nav className="px-16 py-5">
      <div className="flex justify-between">
        <a href="/" className="">
          <span className="font-medium text-2xl">Car Analytics</span>
        </a>
        <div className="">
          <ul className="flex gap-5">
            <li>
              <a href="/" className="hover:underline hover:text-blue-500">
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="/highlight"
                className="hover:underline hover:text-blue-500"
              >
                Highlight
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
