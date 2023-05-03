import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import AppleIcon from '@mui/icons-material/Apple';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { QueryClient, QueryClientProvider } from 'react-query';
import Page from '../../components/Page';
import WeekTimeline from './timeline';
import { getAllTasksByDate } from '../../services/dailyTasks';
import Label from '../../components/Label';

function Tasks() {
  const [today, setToday] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  // const queryClient = new QueryClient();

  const getCurrentDay = async (timelineData) => {
    setToday(timelineData);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getAllTasksByDate(today);
        setTasks(res);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData().then();
  }, [today]);

  return (
    <Page title="Tasks">
      <Container maxWidth="xl">
        <Box>
          <WeekTimeline sx={{ width: '100%', ml: '5pt' }} onDayChange={getCurrentDay} />
        </Box>

        <Box sx={{ width: '90%', ml: '25pt', mt: '45pt' }}>
          {tasks.map((task, i) => (
            <Card key={i} sx={{ mt: '15pt', width: "90%" }}>
              <CardContent sx={{ alignContent: 'center' }}>
                <Stack direction="row" alignItems="center" alignContent={'center'} spacing={2} sx={{ height: 60 }}>
                  <Box sx={{ width: 48, height: 48, borderRadius: 1.5, flexShrink: 0 }}>
                    <Avatar sx={{ bgcolor: '#ffd500' }}>
                      <AppleIcon />
                    </Avatar>
                  </Box>

                  <Box sx={{ minWidth: 340 }}>
                    <Typography color="inherit" variant="subtitle2" underline="hover">
                      {task.challengeTitle}
                    </Typography>

                    <Typography variant="body2" sx={{ color: 'text.secondary' }} >
                      {task.description}
                    </Typography>
                  </Box>

                  <Grid container spacing={2} direction="row" justifyContent="flex-end" alignItems="center">
                    <Grid item md={2} display="flex" justifyContent="center">
                      <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
                        {task.countOfUnitsDone}/{task.countOfUnits}
                      </Typography>
                    </Grid>
                    <Grid item md={3} display="flex" justifyContent="center">
                      <Label color={'warning'}>{task.unitShortName}</Label>
                    </Grid>
                    <Grid item md={3} display="flex" justifyContent="center">
                      <Button color="secondary" variant="outlined" sx={{ justifyContent: 'flex' }}>
                        Done
                      </Button>
                    </Grid>
                  </Grid>
                </Stack>
                {task.subtasks !== null && task.subtasks.length !== 0 ? (
                  <Stack direction="row" alignItems="center" alignContent={'center'} spacing={2}>
                    <Accordion sx={{ width: '80%', mb: -1 }}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        sx={{ width: '70pt' }}
                      >
                        <Typography sx={{
                          color: 'text.secondary',
                          fontWeight: 600,
                          fontSize: '11pt'
                        }}>
                          subtasks
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Card sx={{ ml: '30pt', bgcolor: "#f3f3f3" }}>
                          <CardContent>
                            {task.subtasks.map((sub, i) => (
                              <Stack key={i} direction={'row'} alignItems={"center"}>
                                <Typography
                                  color="inherit"
                                  variant="subtitle2"
                                  underline="hover"
                                  sx={{ minWidth: 240 }}
                                >
                                  {sub.title}
                                </Typography>
                                <Grid
                                  container
                                  spacing={2}
                                  direction="row"
                                  justifyContent="flex-end"
                                  alignItems="center"
                                >
                                  <Grid item md={2} display="flex" justifyContent="center">
                                    <Typography
                                      variant="caption"
                                      sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}
                                    >
                                      {sub.countOfUnitsDone}/{sub.countOfUnits}
                                    </Typography>
                                  </Grid>
                                  <Grid item md={3} display="flex" justifyContent="center">
                                    <Label color={'warning'}>{sub.unitShortName}</Label>
                                  </Grid>
                                  <Grid item md={3} display="flex" justifyContent="center">
                                    <Button color="secondary" variant="outlined" sx={{ justifyContent: 'flex' }}>
                                      Done
                                    </Button>
                                  </Grid>
                                </Grid>
                              </Stack>
                            ))}
                          </CardContent>
                        </Card>
                      </AccordionDetails>
                    </Accordion>
                  </Stack>
                ) : (
                  <></>
                )}
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Page>
  );
}

export default Tasks;
