import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Container } from "@mantine/core";

function MainLayout() {
  return (
    <>
      <Navbar />
      <Container sx={{ border: "1px solid red" }} size={"md"} mt={20} h={"88%"}>
        <Outlet />
      </Container>
    </>
  );
}

export default MainLayout;
