import { useEffect, useState } from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import {
  Collapse,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  ListItem,
  List,
  IconButton,
  Divider,
  SvgIcon,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

// import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/hooks";

import FactoryFlowIcon from "@/assets/images/FactryFlow.svg";
import FFLogo from "@/assets/images/FFlogo.svg";
import { toggleChildrenOpen } from "@/redux/features/menuSlice";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const Sidenav = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const pathParts = location.pathname.split("/");
  const pathresult = `/${pathParts[1]}`;

  const menuItems = useAppSelector((state) => state.menu.menuItems);

  // const newMenuItems = [
  //   {
  //     label: "Dashboard",
  //     icon: DashboardIcon,
  //     route: "/dashboard",
  //   },
  //   {
  //     label: "Production",
  //     icon: ProductionIcon,
  //     childrenOpen: false,
  //     route: "/production",
  //     children: [
  //       {
  //         label: "Jobs",
  //         icon: Dote,
  //         route: "/jobs",
  //       },
  //       {
  //         label: "Tasks",
  //         icon: Dote,
  //         route: "/tasks",
  //       },
  //       {
  //         label: "Dependency",
  //         icon: Dote,
  //         route: "/dependency",
  //       },
  //     ],
  //   },
  //   {
  //     label: "Resource",
  //     icon: ResourceIcon,
  //     childrenOpen: false,
  //     route: "/resource",
  //     children: [
  //       {
  //         label: "Template",
  //         icon: Dote,
  //         route: "/template",
  //       },
  //       {
  //         label: "Resources",
  //         icon: Dote,
  //         route: "/resources",
  //       },
  //       {
  //         label: "Exception",
  //         icon: Dote,
  //         route: "/exception",
  //       },
  //     ],
  //   },
  //   {
  //     label: "Settings",
  //     icon: SettingIcon,
  //     route: "/settings",
  //   },
  //   {
  //     label: "Help & Support",
  //     icon: SupportIcon,
  //     route: "/help",
  //   },
  // ];

  const handleMenuItemClick = (menuItem: any) => {
    if (menuItem.children) {
      dispatch(toggleChildrenOpen(menuItems.indexOf(menuItem)));
    } else {
      navigate(menuItem.route);
    }
  };
  const theme = useTheme();
  // const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();
  const open = useAppSelector((state) => state.menu.menu);
  // const open = useAppStore((state) => state.dopen);

  return (
    <Box sx={{ display: "flex", borderRight: "1px solid #F1F1F2 " }}>
      <CssBaseline />

      <Drawer variant="permanent" open={open}>
        <DrawerHeader sx={{ marginRight: "14px !important" }}>
          {open && open ? (
            <img
              src={FactoryFlowIcon}
              alt="FactoryFlowIcon"
              height={50}
              width={200}
            />
          ) : (
            <img src={FFLogo} alt="FFlogo" height={30} width={30} />
          )}
        </DrawerHeader>

        <List>
          {menuItems.map((menuItem: any, index: any) => (
            <div key={index}>
              <ListItem
                disablePadding
                sx={{
                  display: "block",
                  color:
                    location.pathname === menuItem.route ? "#007BFF" : "black",
                }}
                onClick={() => handleMenuItemClick(menuItem)}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={menuItem.icon}
                      alt={menuItem.label}
                      height={30}
                      width={24}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={menuItem.label}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                  {menuItem.children &&
                    (menuItem.childrenOpen ? (
                      <ExpandMoreIcon />
                    ) : (
                      <KeyboardArrowRight />
                    ))}
                </ListItemButton>
              </ListItem>
              {menuItem.children && (
                <Collapse
                  in={menuItem.childrenOpen}
                  timeout="auto"
                  unmountOnExit
                >
                  <List>
                    {menuItem.children.map((child: any, childIndex: any) => (
                      <ListItem
                        key={childIndex}
                        disablePadding
                        sx={{
                          display: "block",
                          pl: 4,
                        }}
                        onClick={() => handleMenuItemClick(child)}
                      >
                        <ListItemButton
                          sx={{
                            minHeight: 48,
                            justifyContent: open ? "initial" : "center",
                            px: 2.5,
                            color:
                              pathresult === child.route ? "#007BFF" : "black",
                          }}
                        >
                          <ListItemIcon
                            sx={{
                              minWidth: 0,
                              mr: open ? 3 : "auto",
                              justifyContent: "center",
                            }}
                          >
                            <img
                              src={child.icon}
                              alt={child.label}
                              height={30}
                              width={24}
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary={child.label}
                            sx={{ opacity: open ? 1 : 0 }}
                          />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              )}
            </div>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default Sidenav;
