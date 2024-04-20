import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { Route, Routes } from "react-router-dom";
import WineStats from './components/WineStats';
import WineGammaStats from './components/WineGammaStats';
import Navbar from './components/Navbar';


function App() {
  return (
    <>
      <Navbar />
      <MantineProvider >
        <Routes>
          
          <Route path="/" element={<WineStats />} />
          <Route path="/gama_stats" element={<WineGammaStats />} />


        </Routes>
      </MantineProvider>
    </>
  );
}

export default App;
