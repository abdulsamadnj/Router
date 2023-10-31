import './App.css';
import Calculator6 from './Component/calculator';
import WeatherApp from './Component/WeatherApp';
import MainPage from './Component/MainPage';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
   <Router>
    <Routes>
      
      <Route path ='/' element={<MainPage/>}/>
      <Route path='/calculator' element={<Calculator6 />} />
      <Route path='/weatherapp' element={<WeatherApp />} />
      
      
    </Routes>
   </Router>
    </div>
  );
}

export default App;
