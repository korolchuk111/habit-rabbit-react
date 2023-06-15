import Iconify from '../../components/Iconify';


const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [

  {
    title: 'tasks',
    path: '/dashboard/tasks',
    icon: getIcon('eva:checkmark-square-fill'),
  },
  {
    title: 'challenges',
    path: '/dashboard/challenges',
    icon: getIcon('eva:grid-outline'),
  },
  // {
  //   title: 'progress',
  //   path: '/dashboard/app',
  //   icon: getIcon('eva:bar-chart-fill'),
  // },
];

export default navConfig;
