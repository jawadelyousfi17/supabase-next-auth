import NavbarNotAuth from "./NavbarNotAuth";
import NavbarAuth from "./Navbar-user";
import isAuthenticated from "@/utils/auth/isAuth";

const Navbar = async () => {
  const isLoged = await isAuthenticated();

  return (
    <>
      {isLoged && <NavbarAuth></NavbarAuth>}
      {!isLoged && <NavbarNotAuth></NavbarNotAuth>}
    </>
  );
};

export default Navbar;
