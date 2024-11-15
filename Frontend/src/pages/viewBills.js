import React from 'react';
import { Box, SimpleGrid, Heading,} from '@chakra-ui/react';
import { useViewBills } from '../custom hooks/useViewBills';
import { FetchAndGeneratePDF } from '../components/printSpecificBill';

const Card = ({ title, date, time,id }) => (
  <Box
    p={5}
    shadow="md"
    borderWidth="1px"
    borderRadius="md"
    bg="white"
    _hover={{ shadow: "lg" }} // Add hover effect
  >
    <Heading fontSize="xl" mb={2}>{title}</Heading>
    <p>Date: {date} </p>
    <p>Time of issue: {time}</p>
    <p>ID:{id}</p>
    <FetchAndGeneratePDF billId={id}/>
  </Box>
);

export const CardContainer = () => {
    const bills = useViewBills();
  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      justifyContent="center" 
      minH="100vh" // Take up the full height of the viewport
      p={4}
      bg="gray.100"
    >
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={4} w="full">
        {bills.map((bill, index) => (
          <Card key={index} title={bill.customerName} date= {formatDateAndTime(bill.billDate)["date"]} time= {formatDateAndTime(bill.billDate)["time"]} id={bill._id}/>
        ))}
      </SimpleGrid>
    </Box>
  );
};

function formatDateAndTime(timestamp) {
    const date = new Date(timestamp);
    const optionsDate = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const optionsTime = { hour: '2-digit', minute: '2-digit', hour12: false };
  
    const dateString = date.toLocaleDateString('en-IN', optionsDate);
    const timeString = new Date(date.getTime() + 5.5 * 60 * 60 * 1000)
      .toLocaleTimeString('en-IN', optionsTime);
  
    return { date: dateString, time: timeString };
  }