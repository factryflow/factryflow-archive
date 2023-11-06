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
  Typography,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/hooks";

import FactoryFlowIcon from "@/assets/images/FactryFlow.svg";
import FFLogo from "@/assets/images/FFlogo.svg";
import { toggleChildrenOpen } from "@/redux/features/menuSlice";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { FiberManualRecord as DotIcon } from "@mui/icons-material";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  paddingLeft: "10px",
  paddingRight: "10px",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  paddingLeft: "10px",
  paddingRight: "10px",
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

  const handleMenuItemClick = (menuItem: any) => {
    if (menuItem.children) {
      dispatch(toggleChildrenOpen(menuItems.indexOf(menuItem)));
    } else {
      navigate(menuItem.route);
    }
  };
  const theme = useTheme();

  const navigate = useNavigate();
  const open = useAppSelector((state) => state.menu.menu);

  return (
    <Box sx={{ display: "flex", borderRight: "1px solid #F1F1F2 " }}>
      <CssBaseline />

      <Drawer variant="permanent" open={open}>
        <DrawerHeader sx={{ marginLeft: "14px !important" }}>
          {open && open ? (
            <img
              src={FactoryFlowIcon}
              alt="FactoryFlowIcon"
              height={50}
              width={200}
            />
          ) : (
            <img src={FFLogo} alt="FFlogo" height={35} width={35} />
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
                    location.pathname === menuItem.route
                      ? "#023E8A"
                      : "#5E6278",
                  background:
                    location.pathname === menuItem.route ? "#023E8A0D" : "#FFF",
                  borderLeft:
                    location.pathname === menuItem.route
                      ? "3px solid #023E8A"
                      : "",
                  borderRadius:
                    location.pathname === menuItem.route ? "8px" : "",
                  marginTop: "10px",
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
                      style={{
                        filter:
                          location.pathname === menuItem.route
                            ? "invert(14%) sepia(69%) saturate(3330%) hue-rotate(205deg) brightness(92%) contrast(98%)"
                            : "none",
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography
                        variant="h1"
                        sx={{
                          fontWeight: 600,
                          fontSize: 14,
                        }}
                      >
                        {menuItem.label}
                      </Typography>
                    }
                    sx={{
                      opacity: open ? 1 : 0,
                    }}
                  />
                  {
                    menuItem.children && open ? (
                      menuItem.childrenOpen ? (
                        <ExpandMoreIcon />
                      ) : open ? (
                        <KeyboardArrowRight />
                      ) : null // Hide the submenu arrow icon when the submenu is open
                    ) : null /* Hide the submenu icons when the menu is closed */
                  }
                </ListItemButton>
              </ListItem>
              {menuItem.children && (
                <Collapse
                  in={menuItem.childrenOpen}
                  timeout="auto"
                  unmountOnExit
                  sx={{ "& .MuiList-root": { padding: "0px !important" } }}
                >
                  <List>
                    {menuItem.children.map((child: any, childIndex: any) => (
                      <ListItem
                        key={childIndex}
                        disablePadding
                        sx={{
                          display: "block",
                          pl: 4,
                          padding: 0,
                          margin: 0,
                        }}
                        onClick={() => handleMenuItemClick(child)}
                      >
                        <ListItemButton
                          sx={{
                            minHeight: 48,
                            justifyContent: open ? "initial" : "center",
                            px: 2.5,
                            color:
                              pathresult === child.route
                                ? "#023E8A"
                                : "#5E6278",
                          }}
                        >
                          <ListItemIcon
                            sx={{
                              minWidth: 0,
                              mr: open ? 3 : "auto",
                              justifyContent: "center",
                            }}
                          >
                            <DotIcon
                              sx={{
                                fontSize: pathresult === child.route ? 15 : 8,
                                color:
                                  pathresult === child.route
                                    ? "#023E8A"
                                    : "#5E6278",
                              }}
                            />
                          </ListItemIcon>

                          <ListItemText
                            disableTypography
                            primary={
                              <Typography
                                variant="h1"
                                sx={{
                                  fontWeight: 600,
                                  fontSize: 14,
                                }}
                              >
                                {child.label}
                              </Typography>
                            }
                            sx={{
                              opacity: open ? 1 : 0,
                            }}
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
