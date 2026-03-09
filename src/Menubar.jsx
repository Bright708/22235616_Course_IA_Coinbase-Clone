import PublicIcon from "@mui/icons-material/Public";
import { Link } from "react-router-dom";
import Menubarlist from "./Components/Menubarlist";
import Coinbaselogo from "./assets/Coinbase - Buy and Sell Bitcoin, Ethereum, and more with trust/imgi_1_coinbaseLogoNavigation-4.svg";
import Closebutton from "./assets/close.png";
import Humburger from "./assets/menu.png";
import SearchIcon from "./assets/search-interface-symbol.png";
const Menubar = ({ subMenu, setSubmenu, handleActiveMenu, loggedIn }) => {
  return (
    <header className=" md:w-full min-h-17.25 text-[1.2rem] font-medium bg-white shadow-sm">
      <div className="md:w-full flex md:flex items-center gap-x-4 md:gap-x-32 justify-between px-4 md:px-8 py-4">
        <div className="flex md:flex items-center gap-2 md:gap-8">
          <img src={Coinbaselogo} alt="" className="w-8 h-8" />
          <Menubarlist
            Menuname={"Cryptocurrencies"}
            subMenu={subMenu}
            setSubmenu={setSubmenu}
            handleActiveMenu={handleActiveMenu}
          />
          <Menubarlist
            Menuname={"Individual"}
            subMenu={subMenu}
            setSubmenu={setSubmenu}
            handleActiveMenu={handleActiveMenu}
          ></Menubarlist>

          <Menubarlist
            Menuname={"Businesses"}
            subMenu={subMenu}
            setSubmenu={setSubmenu}
            handleActiveMenu={handleActiveMenu}
          />
          <Menubarlist
            Menuname={"Institutions"}
            subMenu={subMenu}
            setSubmenu={setSubmenu}
            handleActiveMenu={handleActiveMenu}
          />
          <Menubarlist
            Menuname={"Developers"}
            subMenu={subMenu}
            setSubmenu={setSubmenu}
            handleActiveMenu={handleActiveMenu}
          />
          <Menubarlist
            Menuname={"Company"}
            subMenu={subMenu}
            setSubmenu={setSubmenu}
            handleActiveMenu={handleActiveMenu}
          />
        </div>
        <div className="flex gap-2.25">
          <img
            src={SearchIcon}
            alt="searchicon"
            className=" w-7.5 h-7.5 mt-1 bg-[#eef0f4] p-1 rounded-full hover:bg-white sm:inline-block"
          />
          <button className="hidden hover:bg-white sm:inline-flex items-center gap-2 bg-[#eef0f4] px-3 py-1 rounded-full text-sm">
            <PublicIcon fontSize="small" />
          </button>
          <button className=" hover:bg-white sm:inline-flex items-center gap-2 bg-[#eef0f4] px-3 py-1 rounded-full text-sm lg:hidden">
            {onclick ? (
              <img src={Closebutton} alt="" className="w-8.5 h-8.5" />
            ) : (
              <img src={Humburger} alt="" className="w-8.5 h-8.5" />
            )}
          </button>

          {!loggedIn && (
            <div className="flex gap-2">
              <Link
                to={"/signin"}
                className="bg-[#eef0f4] hover:bg-white px-4 h-10 rounded-[25px] cursor-pointer whitespace-nowrap flex items-center"
              >
                Sign in
              </Link>
              <Link
                to={"/signup"}
                className="bg-[#0350f5] flex items-center justify-center hover:opacity-50 px-4 h-10 rounded-[25px] cursor-pointer text-white whitespace-nowrap"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Menubar;
