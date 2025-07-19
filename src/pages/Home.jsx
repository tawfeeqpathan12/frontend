import { Button, Container, Typography } from '@mui/material';
import Login from '../components/LoginForm';
import Signup from '../components/SignupForm';


const Home = () => {
  return (
    <Container className="text-center">
        <Login/>
        <Signup/>
    </Container>
  );
};

export default Home;
