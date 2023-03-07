import { Stack } from "@mantine/core";
import VideosHeader from "./components/VideosHeader";
import { Suspense } from "react";
import VideosGrid from "./components/VideosGrid";

function Videos() {
  return (
    <>
      <Stack spacing={"lg"} h={"100%"}>
        <VideosHeader />
        <Suspense fallback={<p>Loading...</p>}>
          <VideosGrid />
        </Suspense>
      </Stack>
    </>
  );
}

export default Videos;
