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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Modal,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import AppleIcon from '@mui/icons-material/Apple';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DoneIcon from '@mui/icons-material/Done';
import { Add } from '@mui/icons-material';
import { QueryClient, QueryClientProvider } from 'react-query';
import Page from '../../components/Page';
import WeekTimeline from './timeline';
import { getAllTasksByDate } from '../../services/dailyTasks';
import Label from '../../components/Label';
import Habit from '../../pages/Challenge/AddChallenge/AddChallenge';
import { useAddProgress } from '../../api/dailyTask/useAddProgress';
import { useRemoveProgress } from '../../api/dailyTask/useRemoveProgress';

function Tasks() {
  const [today, setToday] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(false);
  const [progressSubTask, setProgressSubTask] = useState(false);

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

  const { addProgressChallenge } = useAddProgress({
    onSuccess: (data) => {
      console.log('Progress added:', data);
      window.location.reload();
    },
    onError: (error) => {
      console.error('Error adding progress:', error);
    },
  });

  const { removeProgressChallenge } = useRemoveProgress({
    onSuccess: (data) => {
      console.log('Progress removed:', data);
      window.location.reload();
    },
    onError: (error) => {
      console.error('Error removing progress:', error);
    },
  });

  const handleOpen = () => setOpen(true);

  const markTaskAsDone = (task) => {
    addProgressChallenge({
      dailyTaskId: task.id,
      countOfUnits: task.countOfUnits,
      progressToAdd: task.countOfUnits - task.countOfUnitsDone,
    });
  };

  return (
    <Page title="Tasks">
      <Container maxWidth="xl">
        <Box>
          <WeekTimeline sx={{ width: '100%', ml: '5pt' }} onDayChange={getCurrentDay} />
        </Box>

        <Box sx={{ width: '90%', ml: '25pt', mt: '45pt' }}>
          {tasks.map((task, i) => (
            <Card key={i} sx={{ mt: '15pt', width: '90%' }}>
              <CardContent sx={{ alignContent: 'center' }}>
                <Stack direction="row" alignItems="center" alignContent={'center'} spacing={2} sx={{ height: 60 }}>
                  <Box sx={{ width: 48, height: 48, borderRadius: 1.5, flexShrink: 0 }}>
                    <Avatar sx={{ bgcolor: task.color }}>
                      <AppleIcon />
                    </Avatar>
                  </Box>

                  <Box sx={{ minWidth: 340 }}>
                    <Typography color="inherit" variant="subtitle2" underline="hover">
                      {task.challengeTitle}
                    </Typography>

                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
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
                    {task.countOfUnits === 1 && (
                      <Grid item md={3} display="flex" justifyContent="center">
                        {task.countOfUnits === 1 ? (
                          <Grid item md={3} display="flex" justifyContent="center">
                            {task.countOfUnitsDone === 1 ? (
                              <Button
                                color="error"
                                variant="outlined"
                                sx={{ justifyContent: 'flex' }}
                                onClick={() => {
                                  addProgressChallenge({
                                    dailyTaskId: task.id,
                                    countOfUnits: task.countOfUnits,
                                    progressToAdd: -task.countOfUnitsDone,
                                  });
                                }}
                              >
                                UNDONE
                              </Button>
                            ) : (
                              <Button
                                color="secondary"
                                variant="outlined"
                                sx={{ justifyContent: 'flex' }}
                                onClick={() => markTaskAsDone(task)}
                              >
                                Done
                              </Button>
                            )}
                          </Grid>
                        ) : (
                          <></>
                        )}
                      </Grid>
                    )}
                    {task.countOfUnits !== 1 && task.countOfUnits <= 5 && (
                      <Grid item md={3} display="flex" justifyContent="center">
                        {task.countOfUnitsDone === task.countOfUnits ? (
                          <Button
                            color="error"
                            variant="outlined"
                            sx={{ justifyContent: 'flex' }}
                            onClick={() => {
                              addProgressChallenge({
                                dailyTaskId: task.id,
                                countOfUnits: task.countOfUnits,
                                progressToAdd: -task.countOfUnitsDone,
                              });
                            }}
                          >
                            UNDONE
                          </Button>
                        ) : (
                          <Button
                            color="secondary"
                            variant="outlined"
                            sx={{ justifyContent: 'flex', height: '40px', minWidth: '120px', fontSize: '10px' }}
                            onClick={() => {
                              addProgressChallenge({
                                dailyTaskId: task.id,
                                countOfUnits: task.countOfUnits,
                                progressToAdd: 1,
                              });
                            }}
                          >
                            +ADD PROGRESS
                          </Button>
                        )}
                      </Grid>
                    )}
                    {task.countOfUnits > 5 && (
                      <Grid item md={5} display="flex" justifyContent="center">
                        {task.countOfUnitsDone === task.countOfUnits || task.countOfUnitsDone > task.countOfUnits ? (
                          <Button
                            color="error"
                            variant="outlined"
                            sx={{ justifyContent: 'flex' }}
                            onClick={() => {
                              addProgressChallenge({
                                dailyTaskId: task.id,
                                countOfUnits: task.countOfUnits,
                                progressToAdd: -task.countOfUnitsDone,
                              });
                            }}
                          >
                            UNDONE
                          </Button>
                        ) : (
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <TextField
                              label="Units Done"
                              type="number"
                              InputProps={{ inputProps: { min: 1 } }}
                              variant="outlined"
                              size="small"
                              sx={{ mr: '5pt' }}
                              onChange={(e) => {
                                setProgress(parseInt(e.target.value, 10));
                              }}
                            />
                            <Button
                              color="secondary"
                              variant="outlined"
                              size="small"
                              sx={{ justifyContent: 'flex', minWidth: '40px' }}
                              onClick={() => {
                                addProgressChallenge({
                                  dailyTaskId: task.id,
                                  countOfUnits: task.countOfUnits,
                                  progressToAdd: progress,
                                });
                              }}
                            >
                              <DoneIcon fontSize="small" />
                            </Button>
                          </Box>
                        )}
                      </Grid>
                    )}
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
                        <Typography
                          sx={{
                            color: 'text.secondary',
                            fontWeight: 600,
                            fontSize: '11pt',
                          }}
                        >
                          subtasks
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Card sx={{ ml: '30pt', bgcolor: '#f3f3f3' }}>
                          <CardContent>
                            {task.subtasks.map((sub, i) => (
                              <Stack key={i} direction={'row'} alignItems={'center'}>
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
                                  {sub.countOfUnits === 1 && (
                                    <Grid item md={3} display="flex" justifyContent="center">
                                      {sub.countOfUnits === 1 ? (
                                        <Grid item md={3} display="flex" justifyContent="center">
                                          {sub.countOfUnitsDone === 1 ? (
                                            <Button
                                              color="error"
                                              variant="outlined"
                                              sx={{ justifyContent: 'flex' }}
                                              onClick={() => {
                                                addProgressChallenge({
                                                  dailyTaskId: sub.id,
                                                  countOfUnits: sub.countOfUnits,
                                                  progressToAdd: -sub.countOfUnitsDone,
                                                });
                                              }}
                                            >
                                              UNDONE
                                            </Button>
                                          ) : (
                                            <Button
                                              color="secondary"
                                              variant="outlined"
                                              sx={{ justifyContent: 'flex' }}
                                              onClick={() => markTaskAsDone(sub)}
                                            >
                                              Done
                                            </Button>
                                          )}
                                        </Grid>
                                      ) : (
                                        <></>
                                      )}
                                    </Grid>
                                  )}
                                  {sub.countOfUnits !== 1 && sub.countOfUnits <= 5 && (
                                    <Grid item md={3} display="flex" justifyContent="center">
                                      {sub.countOfUnitsDone === sub.countOfUnits ? (
                                        <Button
                                          color="error"
                                          variant="outlined"
                                          sx={{ justifyContent: 'flex' }}
                                          onClick={() => {
                                            addProgressChallenge({
                                              dailyTaskId: sub.id,
                                              countOfUnits: sub.countOfUnits,
                                              progressToAdd: -sub.countOfUnitsDone,
                                            });
                                          }}
                                        >
                                          UNDONE
                                        </Button>
                                      ) : (
                                        <Button
                                          color="secondary"
                                          variant="outlined"
                                          sx={{
                                            justifyContent: 'flex',
                                            height: '40px',
                                            minWidth: '120px',
                                            fontSize: '10px',
                                          }}
                                          onClick={() => {
                                            addProgressChallenge({
                                              dailyTaskId: sub.id,
                                              countOfUnits: sub.countOfUnits,
                                              progressToAdd: 1,
                                            });
                                          }}
                                        >
                                          +ADD PROGRESS
                                        </Button>
                                      )}
                                    </Grid>
                                  )}
                                  {sub.countOfUnits > 5 && (
                                    <Grid item md={5} display="flex" justifyContent="center">
                                      {sub.countOfUnitsDone === sub.countOfUnits ||
                                      sub.countOfUnitsDone > sub.countOfUnits ? (
                                        <Button
                                          color="error"
                                          variant="outlined"
                                          sx={{ justifyContent: 'flex' }}
                                          onClick={() => {
                                            addProgressChallenge({
                                              dailyTaskId: sub.id,
                                              countOfUnits: sub.countOfUnits,
                                              progressToAdd: -sub.countOfUnitsDone,
                                            });
                                          }}
                                        >
                                          UNDONE
                                        </Button>
                                      ) : (
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                          <TextField
                                            label="Units Done"
                                            type="number"
                                            InputProps={{ inputProps: { min: 1 } }}
                                            variant="outlined"
                                            size="small"
                                            sx={{ mr: '5pt' }}
                                            onChange={(e) => {
                                              setProgressSubTask(parseInt(e.target.value, 10));
                                            }}
                                          />
                                          <Button
                                            color="secondary"
                                            variant="outlined"
                                            size="small"
                                            sx={{ justifyContent: 'flex', minWidth: '40px' }}
                                            onClick={() => {
                                              addProgressChallenge({
                                                dailyTaskId: sub.id,
                                                countOfUnits: sub.countOfUnits,
                                                progressToAdd: progressSubTask,
                                              });
                                            }}
                                          >
                                            <DoneIcon fontSize="small" />
                                          </Button>
                                        </Box>
                                      )}
                                    </Grid>
                                  )}
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
        <Habit open={open} setOpen={setOpen} />
        <Box
          sx={{
            position: 'fixed',
            bottom: 0,
            right: 0,
            m: 3,
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
          }}
        >
          <Button
            onClick={handleOpen}
            variant="contained"
            color="primary"
            sx={{ height: 62, width: 62, borderRadius: 100 }}
          >
            <Add sx={{ fontSize: 36 }} />
          </Button>
        </Box>
      </Container>
    </Page>
  );
}

export default Tasks;
