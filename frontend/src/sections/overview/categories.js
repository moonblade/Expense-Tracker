import {
  ShoppingBagIcon,
  NoSymbolIcon,
  TruckIcon,
  UserGroupIcon,
  CakeIcon,
  UserIcon,
  HomeIcon,
} from "@heroicons/react/24/solid";
import { Avatar, SvgIcon } from "@mui/material";
import RestaurantIcon from '@mui/icons-material/Restaurant';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';

const categories = {
  groceries: {
    label: "Groceries",
    category: "groceries",
    icon: (
      <Avatar sx={{backgroundColor: '#8CD867'}}>
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
      <Avatar sx={{backgroundColor: '#EF2D56'}}>
        <SvgIcon>
          <RestaurantIcon />
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
  health: {
    label: "Health",
    category: "health",
    icon: (
      <Avatar sx={{backgroundColor: '#C7E9B0'}}>
        <SvgIcon>
          <HealthAndSafetyIcon />
        </SvgIcon>
      </Avatar>
    ),
  }, 
  body: {
    label: "Body",
    category: "body",
    icon: (
      <Avatar sx={{backgroundColor: '#C7E9B0'}}>
        <SvgIcon>
          <AccessibilityNewIcon />
        </SvgIcon>
      </Avatar>
    ),
  },
  home:{
    label: "Home",
    category: "home",
    icon: (
      <Avatar sx={{backgroundColor: '#C7E9B0'}}>
        <SvgIcon>
          <HomeIcon />
        </SvgIcon>
      </Avatar>
    ),
  } 
};

export default categories;