import React from 'react'
import styles from './SubscriptionPage.module.css'
import SideNavbar from '../../components/SideNavbar/SideNavbar'
import { Box, Button, Card, CardBody, CardFooter, CardHeader, Heading, SimpleGrid, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const tiers = [
    {
      title: 'Free',
      price: '0',
      description: [
        '10 users included',
        '2 GB of storage',
        'Help center access',
        'Email support',
      ],
      buttonText: 'Sign up for free',
      buttonVariant: 'outlined',
    },
    {
      title: 'Pro',
      subheader: 'Most popular',
      price: '15',
      description: [
        '20 users included',
        '10 GB of storage',
        'Help center access',
        'Priority email support',
      ],
      buttonText: 'Get started',
      buttonVariant: 'contained',
    },
    {
      title: 'Enterprise',
      price: '30',
      description: [
        '50 users included',
        '30 GB of storage',
        'Help center access',
        'Phone & email support',
      ],
      buttonText: 'Contact us',
      buttonVariant: 'outlined',
    },
  ];
const SubscriptionPage = () => {
    const navigate = useNavigate();
    const userData = useSelector((state) => state.user.currentUser);
    const basicPayHandler = () =>{
        console.log(userData)
        navigate(`/ConductUser/${userData.id}/payment`);
    }
  return (
    <div style={{ display: "flex"}} className={styles.parentComponent}>
      <SideNavbar />
      <Box   display="flex" flexDirection="column"  alignItems="center" width="100%"  marginTop="2%">
        <Heading>Subscription Plans</Heading>
        <SimpleGrid width="50%" display="flex" justifyContent="center" alignItems="center"  spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
  <Card flex="1">
    <CardHeader>
      <Heading size='md'> Free</Heading>
    </CardHeader>
    <CardBody>
      <Text>0$</Text>
    </CardBody>
    <CardFooter>
      <Button >Buy Now</Button>
    </CardFooter>
  </Card>
  <Card flex="1">
    <CardHeader>
      <Heading size='md'> Basic</Heading>
    </CardHeader>
    <CardBody>
      <Text >$10</Text>
    </CardBody>
    <CardFooter>
      <Button onClick={basicPayHandler}>Buy Now</Button>
    </CardFooter>
  </Card>
  <Card flex="1">
    <CardHeader>
      <Heading size='md'>Unlimited</Heading>
    </CardHeader>
    <CardBody>
      <Text>$30</Text>
    </CardBody>
    <CardFooter>
      <Button>Buy Now</Button>
    </CardFooter>
  </Card>
</SimpleGrid>
            
        
      </Box>
      </div>
  )
}

export default SubscriptionPage