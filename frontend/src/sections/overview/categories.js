import {
  ShoppingBagIcon,
  NoSymbolIcon,
  TruckIcon,
  UserGroupIcon,
  CakeIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { Avatar, SvgIcon } from "@mui/material";

const categories = {
  groceries: {
    label: "Groceries",
    category: "groceries",
    icon: (
      <Avatar sx={{backgroundColor: '#C7E9B0'}}>
        <SvgIcon>
          <ShoppingBagIcon />
        </SvgIcon>
      </Avatar>
    ),
  },
  unknown: {
    label: "Unknown",
    category: "unknown",
    icon: (
      <Avatar sx={{backgroundColor: '#FAAB78'}}>
        <SvgIcon>
          <NoSymbolIcon />
        </SvgIcon>
      </Avatar>
    ),
  },
  travel: {
    label: "Travel",
    category: "travel",
    icon: (
      <Avatar sx={{backgroundColor: '#A6B1E1'}}>
        <SvgIcon>
          <TruckIcon />
        </SvgIcon>
      </Avatar>
    ),
  },
  family: {
    label: "Family",
    category: "family",
    icon: (
      <Avatar sx={{backgroundColor: '#FFDFD3'}}>
        <SvgIcon>
          <UserGroupIcon />
        </SvgIcon>
      </Avatar>
    ),
  },
  food: {
    label: "Food",
    category: "food",
    icon: (
      <Avatar sx={{backgroundColor: '#FD8A8A'}}>
        <SvgIcon>
          <CakeIcon />
        </SvgIcon>
      </Avatar>
    ),
  },
  friends: {
    label: "Friends",
    category: "friends",
    icon: (
      <Avatar sx={{backgroundColor: '#D3F6F3'}}>
        <SvgIcon>
          <UserIcon />
        </SvgIcon>
      </Avatar>
    ),
  },
};

export default categories;