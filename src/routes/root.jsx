import NavBar from "../NavBar";
import { Outlet } from "react-router-dom";

function Root() {
  console.log("Hello");
  return (
    <>
      <NavBar />
      {/*Render its child routes*/}
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default Root;
