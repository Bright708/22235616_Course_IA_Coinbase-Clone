import { Box, Menu, MenuItem } from "@coinbase/cds-web";
import { useState } from "react";

const moreMenuOptions = [
  {
    name: "Settings",
    icon: "settings",
  },
  {
    name: "Help Center",
    icon: "help",
  },
  {
    name: "Legal",
    icon: "document",
  },
];

export const MoreMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        menuItems={moreMenuOptions.map((option) => (
          <MenuItem
            key={option.name}
            label={option.name}
            startIcon={option.icon}
            onClick={handleClose}
          />
        ))}
      />
    </Box>
  );
};

export default MoreMenu;
