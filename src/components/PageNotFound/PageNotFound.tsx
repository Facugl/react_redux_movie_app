import { Card, CardMedia } from '@mui/material';
import ImageNotFound from '@/assets/images/pnf.jpg';

const PageNotFound: React.FC = () => {
  return (
    <Card
      sx={{
        mt: 10,
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <CardMedia
        component="img"
        sx={{ width: 500, height: 500 }}
        image={ImageNotFound}
        title="Error 404 - Page Not Found"
      />
    </Card>
  );
};

export default PageNotFound;
