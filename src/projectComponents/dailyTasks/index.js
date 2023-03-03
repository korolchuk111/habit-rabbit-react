import { Box, Container, Typography } from "@mui/material";
import Page from "../../components/Page";
import WeekTimeline from "./timeline";

function Tasks() {
  return (
    <Page title="Tasks">
      <Container maxWidth="xl">
        <Box>
          <WeekTimeline sx={{ width: '100%', ml: "5pt" }} />
        </Box>
      </Container>
    </Page>
  )
}
export default Tasks;
