import { Menu, MenuButton, Button } from "@chakra-ui/react";
// import { ChevronDownIcon } from "@chakra-ui/icons";

const UserMenu = ({ action, menuItems }) => {
  return (
    <Menu>
      <MenuButton>{action}</MenuButton>
      {menuItems}
    </Menu>
  );
};

export default UserMenu;
