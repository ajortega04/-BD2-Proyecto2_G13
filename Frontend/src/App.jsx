import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Authors from './pages/Authors.jsx';
import Books from './pages/Books.jsx';
import History from './pages/History.jsx';
import Reports from './pages/Reports.jsx';
import LogIn from './pages/LogIn.jsx';
import SignUp from './pages/SignUp.jsx';
import Profile from './pages/Profile.jsx';
import ShoppingCar from './pages/ShoppingCar.jsx';

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<LogIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/home" element={<Home />} />
                <Route path="/authors" element={<Authors />} />
                <Route path="/books" element={<Books />} />
                <Route path="/history" element={<History />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/shopping-car" element={<ShoppingCar />} />
            </Routes>
        </>
    );
}

export default App;
