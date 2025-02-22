import Actions from "./actions";
import Logo from "./logo";
import Search from "./search";

const Navbar = () => {
  return (
    <nav className="fixed flex top-0 w-full h-20 z-[49] bg-[#252731] px-2 lg:px-4 justify-between items-center shadow-sm">
      <Logo />
      <Search />
      <Actions />
    </nav>
  );
};

export default Navbar;
