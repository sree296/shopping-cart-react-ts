// Import Packages
import { Routes, Route } from 'react-router';
import { Container } from 'react-bootstrap';

// Import components
import Home from './pages/Home';
import About from './pages/About';
import Store from './pages/Store';
import Navbar from './components/Navbar';

// Import Context
import {ShoppingCartProvider} from './context/ShoppingCartContext';

function App() {

  return (
    <ShoppingCartProvider>
      <Navbar />
      <Container className="mb-4">
          <Routes>
              <Route path="/" element={<Store />}/>
          </Routes>
      </Container>
    </ShoppingCartProvider>
  )
}

export default App
