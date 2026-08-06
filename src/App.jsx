import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./LanguageContext";
import { ThemeProvider } from "./ThemeContext";
import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import CheckIn from "./pages/CheckIn";
import CheckOut from "./pages/CheckOut";
import Wifi from "./pages/Wifi";
import Rules from "./pages/Rules";
import Apartment from "./pages/Apartment";
import Rooms from "./pages/Rooms";
import Trash from "./pages/Trash";
import Parking from "./pages/Parking";
import Contacts from "./pages/Contacts";
import Dintorni from "./pages/Dintorni";
import Faq from "./pages/Faq";
import Availability from "./pages/Availability";
import "./App.css";

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/checkin" element={<CheckIn />} />
              <Route path="/checkout" element={<CheckOut />} />
              <Route path="/wifi" element={<Wifi />} />
              <Route path="/rules" element={<Rules />} />
              <Route path="/apartment" element={<Apartment />} />
              <Route path="/rooms" element={<Rooms />} />
              <Route path="/trash" element={<Trash />} />
              <Route path="/parking" element={<Parking />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/dintorni" element={<Dintorni />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/availability" element={<Availability />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
