import {
  Box,
  Burger,
  Button,
  Divider,
  Drawer,
  Group,
  Header,
  rem,
  ScrollArea,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link, useNavigate } from "react-router-dom";
import { useNavbarStyles } from "./Navbar.styles";

export function Navbar() {
  const navigate = useNavigate();

  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const { classes, theme } = useNavbarStyles();

  const logOut = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  return (
    <Box>
      <Header height={60} px="md">
        <Group position="apart" sx={{ height: "100%" }}>
          VideoCreatorLogo
          {/* Desktop Navbar */}
          <Group
            sx={{ height: "100%" }}
            spacing={0}
            className={classes.hiddenMobile}
          >
            <Link to={"/videos"} className={classes.link}>
              All Videos
            </Link>
          </Group>
          {/* Mobile Navbar */}
          <Group className={classes.hiddenMobile}>
            <Link to={"/videos"} className={classes.link}>
              All Videos
            </Link>
            <Button onClick={logOut}>Log Out</Button>
          </Group>
          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            className={classes.hiddenDesktop}
          />
        </Group>
      </Header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          />

          <Link to={"/videos"} className={classes.link}>
            Videos
          </Link>
          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          />

          <Group position="center" grow pb="xl" px="md">
            <Button onClick={logOut}>Log Out</Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
