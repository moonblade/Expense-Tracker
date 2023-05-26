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
    color: '#8CD867',
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
    color: '#F98948',
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
    color: '#3C4767',
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
    color: '#266DD3',
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
    color: '#EF2D56',
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
    color: '#998DA0',
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
    color: '#FFFC47',
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
    color: '#DB8A57',
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
    color: '#226F54',
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
    color: '#A882DD',
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
    color: '#FBB02D',
    icon: (
      <Avatar sx={{backgroundColor: '#FBB02D'}}>
        <SvgIcon>
          <LocalGasStationIcon />
        </SvgIcon>
      </Avatar>
    ),
  },
  notFound: {
    category: "notFound",
    color: '#9C3848',
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