// function MyIconComponent({ iconName }) {
//   const [Icon, setIcon] = useState(null);

//   useEffect(() => {
//     async function importIcon() {
//       const iconModule = await import(`@mui/icons-material/${iconName}`);
//       setIcon(iconModule.default);
//     }
//     importIcon();
//   }, [iconName]);

//   if (!Icon) {
//     return null;
//   }

//   return <Icon />;
// }

// export default MyIconComponent;
