import { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/app/hooks";

import DashboardIcon from "@/assets/sidebar/dashboard.svg";
import ProductionIcon from "@/assets/sidebar/production.svg";
import SettingIcon from "@/assets/sidebar/settings.svg";
import SupportIcon from "@/assets/sidebar/support_agent.svg";
import ResourceIcon from "@/assets/sidebar/resource.svg";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import Dote from "@/assets/images/Dote.svg";
import FactoryFlowIcon from "@/assets/images/factryflow .svg";

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

export default function Sidenav() {
  const theme = useTheme();
  // const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();
  const open = useAppSelector((state) => state.menu.menu);
  // const open = useAppStore((state) => state.dopen);
  const [isCollapse, setIsCollapse] = useState(false);
  const [resourceCollapse, setResourceCollapse] = useState(false);
  const handleCollapse = () => {
    setIsCollapse(!isCollapse);
  };

  const handleresourceCollapse = () => {
    setResourceCollapse(!resourceCollapse);
  };

  return (
    <Box sx={{ display: "flex", borderRight: "1px solid #F1F1F2 " }}>
      <CssBaseline />

      <Drawer variant="permanent" open={open}>
        <DrawerHeader sx={{ marginRight: "14px !important" }}>
          <img
            src={FactoryFlowIcon}
            alt="FactoryFlowIcon"
            height={50}
            width={200}
          />
        </DrawerHeader>
        {/* <Divider /> */}
        <List>
          <ListItem disablePadding sx={{ display: "block" }} onClick={() => {}}>
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
                  src={DashboardIcon}
                  alt="Dash_Icon"
                  height={30}
                  width={24}
                />
              </ListItemIcon>
              <ListItemText
                primary="Dashboard"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        </List>

        {/* <Divider /> */}
        <List>
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={handleCollapse}
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
                  src={ProductionIcon}
                  alt="Production_Icon"
                  height={30}
                  width={24}
                />
              </ListItemIcon>{" "}
              <ListItemText
                primary="Production"
                sx={{ opacity: open ? 1 : 0 }}
              />
              {isCollapse ? <ExpandMoreIcon /> : <KeyboardArrowRight />}
            </ListItemButton>
          </ListItem>
          <Collapse in={isCollapse} timeout="auto" unmountOnExit>
            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={() => {
                navigate("/jobs");
              }}
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
                  <img src={Dote} alt="Dote_Icon" height={30} width={24} />
                </ListItemIcon>
                <ListItemText primary="Jobs" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>

            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={() => {
                navigate("/tasks");
              }}
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
                  <img src={Dote} alt="Dote_Icon" height={30} width={24} />
                </ListItemIcon>
                <ListItemText primary="Tasks" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>

            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={() => {
                navigate("/dependency");
              }}
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
                  <img src={Dote} alt="Dote_Icon" height={30} width={24} />
                </ListItemIcon>
                <ListItemText
                  primary="Dependency"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </Collapse>
        </List>

        {/* <Divider /> */}
        <List>
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={handleresourceCollapse}
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
                  src={ResourceIcon}
                  alt="resource_Icon"
                  height={30}
                  width={24}
                />
              </ListItemIcon>{" "}
              <ListItemText primary="Resource" sx={{ opacity: open ? 1 : 0 }} />
              {resourceCollapse ? <ExpandMoreIcon /> : <KeyboardArrowRight />}
            </ListItemButton>
          </ListItem>
          <Collapse in={resourceCollapse} timeout="auto" unmountOnExit>
            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={() => {
                navigate("/template");
              }}
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
                  <img src={Dote} alt="Dote_Icon" height={30} width={24} />
                </ListItemIcon>
                <ListItemText
                  primary="Template"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>

            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={() => {
                navigate("/resources");
              }}
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
                  <img src={Dote} alt="Dote_Icon" height={30} width={24} />
                </ListItemIcon>
                <ListItemText
                  primary="Resources"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>

            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={() => {
                navigate("/exception");
              }}
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
                  <img src={Dote} alt="Dote_Icon" height={30} width={24} />
                </ListItemIcon>
                <ListItemText
                  primary="Exception"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </Collapse>
        </List>

        {/* <Divider /> */}
        <List>
          <ListItem disablePadding sx={{ display: "block" }} onClick={() => {}}>
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
                  src={SettingIcon}
                  alt="Setting_Icon"
                  height={30}
                  width={24}
                />
              </ListItemIcon>
              <ListItemText primary="Settings" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>

        {/* <Divider /> */}
        <List>
          <ListItem disablePadding sx={{ display: "block" }} onClick={() => {}}>
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
                  src={SupportIcon}
                  alt="Setting_Icon"
                  height={30}
                  width={24}
                />
              </ListItemIcon>
              <ListItemText
                primary="Help & Support"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}
