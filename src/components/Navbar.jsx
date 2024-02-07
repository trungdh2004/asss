import Logo from "./navbar/Logo";
import Search from "./navbar/Search";

const Navbar = () => {
  return (
    <div className="w-full h-[56px] border-b px-4 flex items-center justify-between bg-white ">
      <Logo />
      <Search />
    </div>
  );
};

export default Navbar;
