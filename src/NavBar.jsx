import { Link } from "react-router-dom";

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
              <Link to="/" className="hover:underline hover:text-blue-500">
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/highlight"
                className="hover:underline hover:text-blue-500"
              >
                Highlight
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
