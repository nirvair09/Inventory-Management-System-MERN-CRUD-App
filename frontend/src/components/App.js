import './App.css';
import Home from './Home';
import Navbar from './Navbar';
import Products from './Product';
import InsertProduct from './InsertProduct';
import UpdateProduct from './UpdateProduct';
import About from './About';

import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';


function App(){

    return(
        <div className='App'>
        <Navbar title="IMS" about="About" ></Navbar>
        <Router>
            <Routes>
                <Route exact='/' element={<Home/>} />
                <Route path='/products' element={<Products></Products>} />
                <Route path='/insertproduct' element={<InsertProduct/>}/>
                <Route path="/updateproduct/:id" element={<UpdateProduct />} />
          <Route path="/about" element={<About />} />
            </Routes>
        </Router>

        </div>
    );

}

export default App;