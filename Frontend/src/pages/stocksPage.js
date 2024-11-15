import { Box, SimpleGrid, Heading} from '@chakra-ui/react';
import { useStocks } from '../custom hooks/useStocks';

const Card = ({ title, price, category, quantity, description }) => (
  <Box
    p={5}
    shadow="md"
    borderWidth="1px"
    borderRadius="md"
    bg="white"
    _hover={{ shadow: "lg" }} // Add hover effect
  >
    <Heading fontSize="xl" mb={2}>{title}</Heading>
    <p>Price:  {price} </p>
    <p>Category:  {category}</p>
    <p>Quantity:  {quantity}</p>
    <p>Description:  {description}</p>
  </Box>
);

export function StockContainer() {
    const stocks = useStocks();
    console.log(stocks)

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
        {stocks.map((stock, index) => (
          <Card key={index} title={stock.name} price={stock.price} category={stock.category} quantity={stock.stock} description={stock.description} id={stock._id}/>
        ))}
      </SimpleGrid>
    </Box>
  );
};
