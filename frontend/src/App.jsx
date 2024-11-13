
import {Route, Routes} from 'react-router-dom';
import Homepage from "./pages/HomePage.jsx";
import CreatePage from "./pages/CreatePage.jsx";
import Navbar from "./components/Navbar.jsx";




const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Homepage/> }/>
        <Route path="/create" element={<CreatePage/> }/>
      </Routes>
    </div>
  )
}

export default App