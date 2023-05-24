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
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import FlightIcon from '@mui/icons-material/Flight';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';

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
      <Avatar sx={{backgroundColor: '#F98948'}}>
        <SvgIcon>
          <HelpOutlineIcon />
        </SvgIcon>
      </Avatar>
    ),
  },
  travel: {
    label: "Travel",
    category: "travel",
    icon: (
      <Avatar sx={{backgroundColor: '#3C4767'}}>
        <SvgIcon>
          <FlightIcon />
        </SvgIcon>
      </Avatar>
    ),
  },
  family: {
    label: "Family",
    category: "family",
    icon: (
      <Avatar sx={{backgroundColor: '#266DD3'}}>
        <SvgIcon>
          <FamilyRestroomIcon />
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
      <Avatar sx={{backgroundColor: '#998DA0'}}>
        <SvgIcon>
          <SupervisedUserCircleIcon />
        </SvgIcon>
      </Avatar>
    ),
  },
  health: {
    label: "Health",
    category: "health",
    icon: (
      <Avatar sx={{backgroundColor: '#FFFC47'}}>
        <SvgIcon>
          <LocalHospitalIcon />
        </SvgIcon>
      </Avatar>
    ),
  }, 
  body: {
    label: "Body",
    category: "body",
    icon: (
      <Avatar sx={{backgroundColor: '#DB8A57'}}>
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
      <Avatar sx={{backgroundColor: '#226F54'}}>
        <SvgIcon>
          <HomeIcon />
        </SvgIcon>
      </Avatar>
    ),
  }, 
  phone:{
    label: "Phone",
    category: "phone",
    icon: (
      <Avatar sx={{backgroundColor: '#A882DD'}}>
        <SvgIcon>
          <PhoneIphoneIcon />
        </SvgIcon>
      </Avatar>
    ),
  },
  fuel:{
    label: "Fuel",
    category: "fuel",
    icon: (
      <Avatar sx={{backgroundColor: '#FBB02D'}}>
        <SvgIcon>
          <LocalGasStationIcon />
        </SvgIcon>
      </Avatar>
    ),
  },
  notFound: {
    icon: (
      <Avatar sx={{backgroundColor: '#9C3848'}}>
        <SvgIcon>
          <ErrorOutlineIcon />
        </SvgIcon>
      </Avatar>
    ),
  }
};

export default categories;