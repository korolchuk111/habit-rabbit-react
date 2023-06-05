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
import { Add } from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Habit from '../AddChallenge/AddChallenge';
import Page from '../../../components/Page';
import { useGetChallenges } from '../../../api/challenge/useGetChallenges';
import { useGetStatisticsChallenges } from '../../../api/challenge/useGetStatisticsChallenges';
import LongMenu from './components/LongMenu';
import CustomizedProgressBars from './components/Progress';
import DeleteModal from './components/DeleteModal';
import EditModal from '../EditChallenge/EditModal';
import Label from '../../../components/Label';
import AppWebsiteTasks from './components/AppWebsiteTasks';

function Challenges() {
  const [challenges, setChallenges] = useState([]);
  const [statisticsChallenges, setStatisticsChallenges] = useState([]);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [selectedChallengeId, setSelectedChallengeId] = useState(null);

  const { getChallenges } = useGetChallenges({
    onSuccess: (data) => {
      setChallenges(data);
    },
    onError: (error) => {
      console.error('Error getting unit:', error);
    },
  });

  const { getStatisticsChallenges } = useGetStatisticsChallenges({
    onSuccess: (data) => {
      setStatisticsChallenges(data);
    },
    onError: (error) => {
      console.error('Error getting unit:', error);
    },
  });

  useEffect(() => {
    getChallenges();
    getStatisticsChallenges();
  }, []);

  const handleOpen = () => setOpen(true);

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  }

  function calculateDifference(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffInMs = end.getTime() - start.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    return diffInDays;
  }

  return (
    <Page title="Challenges">
      <Container maxWidth="xl">
        <Grid item xs={12} md={6} lg={8}>
          <AppWebsiteTasks
            chartLabels={statisticsChallenges.map(item => item.date.substring(0, 10))}
            chartData={[
              {
                name: '',
                type: 'column',
                fill: 'solid',
                data: statisticsChallenges.map(item => item.percentageDone),
              },
            ]}
          />
        </Grid>

        <Box sx={{ width: '90%', ml: '25pt', mt: '45pt' }}>
          {challenges.map((challenge, i) => (
            <Card key={i} sx={{ mt: '15pt', width: '90%' }}>
              <CardContent sx={{ alignContent: 'center' }}>
                <Stack direction="row" alignItems="center" alignContent={'center'} spacing={2} sx={{ height: 60 }}>
                  <Box sx={{ width: 48, height: 48, borderRadius: 1.5, flexShrink: 0 }}>
                    <Avatar sx={{ bgcolor: challenge.color }}>
                      <AppleIcon />
                    </Avatar>
                  </Box>

                  <Box sx={{ minWidth: 100 }}>
                    <Typography color="inherit" variant="subtitle2" underline="hover">
                      {challenge.title}
                    </Typography>

                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {challenge.description}
                    </Typography>
                  </Box>

                  <Grid container spacing={2}>
                    <Grid item display="flex" sm container>
                      <Grid item xs={4} container direction="column" spacing={2}>
                        <Grid item xs>
                          <Typography
                            variant="caption"
                            sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}
                            component="div"
                          >
                            Start from
                          </Typography>
                          <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
                            {formatDate(challenge.startDate)}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
                          {calculateDifference(challenge.startDate, challenge.endDate)} days
                        </Typography>
                        <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
                          {challenge.countOfUnits} {challenge.unitTitle}
                        </Typography>
                        <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
                          {challenge.frequencyTitle}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  {/*  */}
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <CustomizedProgressBars startDate={challenge.startDate} endDate={challenge.endDate} />
                  </Box>
                  <Box
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', width: 30, height: 30 }}
                  >
                    <LongMenu
                      setOpenDelete={setOpenDelete}
                      openEdit={openEdit}
                      setOpenEdit={setOpenEdit}
                      openDetails={openDetails}
                      setOpenDetails={setOpenDetails}
                      selectedChallengeId={selectedChallengeId}
                      setSelectedChallengeId={setSelectedChallengeId}
                      id={challenge.id}
                    />
                  </Box>
                </Stack>
                {/* {challenge.subtasks !== null && challenge.subtasks.length !== 0 ? (
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
                            {challenge.subtasks.map((sub, i) => (
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
                )} */}
              </CardContent>
              <DeleteModal
                openDelete={openDelete}
                setOpenDelete={setOpenDelete}
                selectedChallengeId={selectedChallengeId}
              />
              {/* <EditModal openEdit={openEdit} setOpenEdit={setOpenEdit} selectedChallengeId={selectedChallengeId} /> */}
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

export default Challenges;
