import { Stack } from "@mantine/core";
import VideosHeader from "./components/VideosHeader";
import VideosGrid from "./components/VideosGrid";
import Navbar from "../../layout/components/Navbar";

function Videos() {
  return (
    <>
      <Navbar />
      <Stack mx={"15%"} my={25} spacing={"lg"} h={"90%"}>
        <VideosHeader />
        <VideosGrid />
      </Stack>
    </>
  );
}

export default Videos;
