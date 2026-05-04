
const Menubarlist = ({ Menuname, children, subMenu, handleActiveMenu }) => {


  return (
    <div
      className="relative"
      onMouseEnter={() =>  handleActiveMenu(Menuname)}
      onMouseLeave={() =>  handleActiveMenu('')}
    >
      {/* Menu item */}
      <li className="hidden md:block cursor-pointer px-1.5 py-2 hover:bg-[#eef0f4] transition-colors list-none rounded-[25px]">
        {Menuname}
      </li>

      {/* Submenu */}
      { subMenu === Menuname && (
        <>
          {/* Hover bridge: prevents a tiny gap from triggering mouseleave */}
          <div className="absolute flex left-0 right-0 top-full h-3 font-bold" />

          <div className="absolute  top-[calc(100%+0.75rem)] left-0 w-full bg-white shadow-lg z-200">
            {children}
          </div>
        </>
      )}
    </div>
  );
};

export default Menubarlist 