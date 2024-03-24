import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

const UserMenu = ({ action, menuItems }) => {
  return (
    <Menu>
      <MenuButton rightIcon={<ChevronDownIcon />} as={Button}>
        {action}
      </MenuButton>
      {menuItems}
    </Menu>
  );
};

export default UserMenu;
