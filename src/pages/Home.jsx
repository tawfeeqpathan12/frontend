import { Button, Container, Typography } from '@mui/material';
import {Link} from 'react-router-dom'


const Home = () => {
  return (
    <Container className="text-center mt-10">
      <Button variant="contained" color="primary">
        Material UI + Tailwind!
      </Button>
      <br />
      <br />
      <br />
        <Link to="/about" className="text-blue-600 hover:underline">About page link</Link>
    </Container>
  );
};

export default Home;
