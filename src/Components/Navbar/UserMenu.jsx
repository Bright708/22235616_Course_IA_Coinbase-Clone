import { Avatar, Box, Menu, MenuItem, Text } from "@coinbase/cds-web";
import { useState } from "react";

const userMenuOptions = [
  {
    name: "Coinbase",
    description: "Buy, sell, use crypto",
  },
  {
    name: "Wallet",
    description: "The best self-hosted crypto wallet",
  },
];

export const UserMenu = () => {
  const [value, setValue] = useState(userMenuOptions[0].name);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (name) => {
    setValue(name);
    setAnchorEl(null);
  };

  return (
    <Box>
      <Avatar
        alt="User"
        src="https://avatars.githubusercontent.com/u/6711590"
        size="md"
        onClick={handleClick}
        cursor="pointer"
      />
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        menuItems={
          <>
            <Box padding={2}>
              <Text size="sm" color="textSecondary">
                For Individuals
              </Text>
            </Box>
            {userMenuOptions.map((option) => (
              <MenuItem
                key={option.name}
                label={option.name}
                description={option.description}
                selected={value === option.name}
                onClick={() => handleMenuItemClick(option.name)}
              />
            ))}
          </>
        }
      />
    </Box>
  );
};

export default UserMenu;
