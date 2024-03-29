import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/addUser";
import ViewUsers from "./pages/ViewUser";
import AddCloth from "./pages/addClothes";
import ViewClothes from "./pages/AllClothes";
import Login from "./pages/login";
import HomePage from "./pages/home";
import ImageUploader from "./pages/ImageUploader";
import DailyWear from "./pages/WearSelection";
import ProfilePage from "./pages/profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          
      <Route path="/" element={< Login/>} />
      <Route path="/sign" element={<Register />} />
      <Route path="/viewuser" element={<ViewUsers />} />
      <Route path="/addcloth" element={<AddCloth />} />
      <Route path="/viewcloth" element={<ViewClothes />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/image" element={<ImageUploader />} />
      <Route path="/daily" element={<DailyWear />} />
      <Route path="/profile" element={<ProfilePage />} />

      </Routes>
      </BrowserRouter>
  );
}

export default App;
