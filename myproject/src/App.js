import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from "./pages/Home";
import MyReservations from "./pages/MyReservations";



function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/">
        <Route index element={<Home/>}/>
        <Route path="myReservations" element={<MyReservations/>}/>
      </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
