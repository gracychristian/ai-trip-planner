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
  TextField,
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
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  const options = ["Profile","Sign in"];
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.up("sm"));

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = React.useState(true);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [dialogType, setDialogType] = React.useState<
    "profile" | "signup" | "signin" | null
  >(null);

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
    // dispatch(toggleTheme());
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
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("./")}>
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
                    setDialogType(
                      option.toLowerCase().replace(" ", "") as
                        | "signup"
                        | "signin"
                        | "profile"
                    );
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
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth={dialogType === "profile" ? "xs" : "md"}
        fullWidth={dialogType !== "profile"}
        sx={{
          "& .MuiDialog-paper": {
            width: dialogType === "profile" ? "400px" : "100%",
            maxWidth: dialogType === "profile" ? "400px" : "800px",
          },
        }}
      >
        <div className="flex justify-between px-5 pt-5">
          <DialogTitle className="!p-0 place-content-center">
            {dialogType === "signup" && "Sign Up"}
            {dialogType === "signin" && "Sign In"}
            {dialogType === "profile" && "Profile"}
          </DialogTitle>
          <DialogActions className="cursor-pointer">
            <CloseIcon onClick={handleCloseDialog} />
          </DialogActions>
        </div>

        <DialogContent>
          {dialogType === "profile" && (
            <>
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
            </>
          )}

          {(dialogType === "signup" || dialogType === "signin") && (
            <div className="flex flex-col md:flex-row gap-6 mt-2">
              <div className="flex flex-col gap-4 min-w-[300px] md:w-1/2">
                {dialogType === "signup" && (
                  <>
                    <TextField label="Full Name" variant="outlined" fullWidth />
                    <TextField
                      label="Email"
                      type="email"
                      variant="outlined"
                      fullWidth
                      required
                    />
                    <TextField
                      label="Password"
                      type="password"
                      variant="outlined"
                      fullWidth
                    />
                    <TextField
                      label="Confirm Password"
                      type="password"
                      variant="outlined"
                      fullWidth
                    />
                  </>
                )}

                {dialogType === "signin" && (
                  <>
                    <TextField
                      label="Email"
                      type="email"
                      variant="outlined"
                      fullWidth
                    />
                    <TextField
                      label="Password"
                      type="password"
                      variant="outlined"
                      fullWidth
                    />
                  </>
                )}

                <Button variant="contained" color="primary" type="submit">
                  {dialogType === "signup" ? "Sign Up" : "Sign In"}
                </Button>

                <div className="text-sm text-center mt-2">
                  {dialogType === "signup" ? (
                    <>
                      Already have an account?{" "}
                      <span
                        className="text-blue-600 cursor-pointer"
                        onClick={() => setDialogType("signin")}
                      >
                        Sign In
                      </span>
                    </>
                  ) : (
                    <>
                      New to Travly?{" "}
                      <span
                        className="text-blue-600 cursor-pointer"
                        onClick={() => setDialogType("signup")}
                      >
                        Sign Up
                      </span>
                    </>
                  )}
                </div>
              </div>

              <div className="relative md:w-1/2 hidden md:block max-h-[450px]">
                <img
                  src="https://img.freepik.com/free-photo/maldives-island_1203-3746.jpg?t=st=1746100542~exp=1746104142~hmac=c0a1a8fce4d0919df590dd8d3b3a7d9541332c2cd95037e6aebab166ebb25f83&w=740"
                  alt="Sign up illustration"
                  className="w-full h-full object-cover rounded-r-lg"
                />
                <div className="absolute top-8 left-8 bg-white p-4 rounded-md shadow-md max-w-[240px]">
                  Here's the tea, sign up for a free account and, voilà, we'll
                  continue chatting.
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};
