import { NavLink, Link } from "react-router-dom";

function NavBar() {
  const links = ["", "highlight"];
  return (
    <nav className="px-16 py-5">
      <div className="flex justify-between">
        <Link href="" className="">
          <span className="font-medium text-2xl">Car Analytics</span>
        </Link>
        <div className="navbar">
          <ul className="flex gap-5">
            {links.map((link) => (
              <NavLink
                key={link}
                to={`/${link}`}
                className={({ isActive, isPending }) =>
                  isActive ? "active" : isPending ? "pending" : ""
                }
              >
                <li>
                  <Link
                    to={`/${link}`}
                    className="hover:underline hover:text-blue-500"
                  >
                    {link === "" ? "Dashboard" : "Highlight"}
                  </Link>
                </li>
              </NavLink>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
