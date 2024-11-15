import LandingPage from "./pages/landingpage";
import Bill from "./pages/billpage";
import {StockContainer} from "./pages/stocksPage"; // Changed to PascalCase
import { Routes, Route } from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react';
import {CardContainer} from './pages/viewBills';

function App() {
  return (
  <ChakraProvider>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/bills" element={<Bill />} />
      <Route path="/stocks" element={<StockContainer />} />
      <Route path="/get-bills" element={<CardContainer />} />
      {/* Changed to PascalCase */}
    </Routes>
    </ChakraProvider>
  );
}

export default App;
