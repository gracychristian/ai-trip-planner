import React from "react";
import {
  AppBar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Switch,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import TravlyLogo from "../../assets/images/Travly.png";
import TravlyDarkLogo from "../../assets/images/Travly-dark.png";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { toggleTheme } from "../../redux/slices/themeSlice";

export const Header = () => {
  const options = ["Profile", "Sign up", "Sign in"];
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.up("sm"));

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = React.useState(true);
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  const dispatch = useAppDispatch();
  const isDarkTheme = useAppSelector((state) => state.themeMode.isDarkTheme);

  const handleThemeChange = () => {
    dispatch(toggleTheme());
  };

  const drawerContent = (
    <Box sx={{ width: 250 }}>
      {!isMobile && (
        <div className="flex justify-between items-center pr-5">
          <div>
            <img
              className="h-[80px]"
              src={isDarkTheme ? TravlyDarkLogo : TravlyLogo}
              alt=""
            />
          </div>
          <div>
            <IconButton onClick={toggleDrawer} className="m-2">
              <CloseIcon />
            </IconButton>
          </div>
        </div>
      )}
      <List>
        {options.map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{ backgroundColor: theme.palette.secondary.main }}
      >
        <Toolbar className="flex justify-between">
          <div className="flex items-center gap-2">
            <img
              className="h-[80px]"
              src={isDarkTheme ? TravlyDarkLogo : TravlyLogo}
              alt=""
            />
          </div>
          <div>
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={Boolean(anchorEl) ? "long-menu" : undefined}
              aria-expanded={Boolean(anchorEl) ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <PermIdentityIcon className="text-[#174891]" />
            </IconButton>
            <Menu
              id="long-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              slotProps={{
                paper: {
                  style: {
                    maxHeight: 48 * 3.5,
                    width: "20ch",
                  },
                },
              }}
            >
              {options.map((option) => (
                <MenuItem
                  key={option}
                  onClick={() => {
                    handleClose();
                    handleOpenDialog();
                  }}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>
            {!isMobile && (
              <IconButton onClick={toggleDrawer}>
                <MenuIcon />
              </IconButton>
            )}
          </div>
        </Toolbar>
      </AppBar>

      {!isMobile && (
        <Drawer
          anchor="left"
          open={!mobileOpen}
          onClose={toggleDrawer}
          ModalProps={{ keepMounted: true }}
        >
          {drawerContent}
        </Drawer>
      )}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Profile</DialogTitle>
        <DialogContent>
          <p>This is the profile dialog content.</p>
          <div className="flex mt-3 font-bold items-center">
            <PermIdentityIcon className="text-[#174891] mr-5" />
            <h4>Guest</h4>
          </div>

          <div className="flex items-center gap-3 mt-5">
            <Brightness7 className="text-yellow-500" />
            <Switch
              checked={isDarkTheme}
              onChange={handleThemeChange}
              inputProps={{ "aria-label": "Dark mode toggle" }}
              color="default"
            />
            <Brightness4 className="text-gray-400" />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
