import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./components/pages/Home";
import { Orders } from "./components/pages/Orders";
import { MyOrders } from "./components/pages/MyOrders";
import { Header } from "./components/Header/Header";
import { useState } from "react";
import { Footer } from "./components/Footer/Footer";

function App() {
  const [userName, setUserName] = useState(
    localStorage.getItem("userName") || false
  );

  return (
    <div className="App">
      <Header userName={userName} />
      <main className="content">
        <Routes>
          <Route path="/" element={<Home setUserName={setUserName} />} />
          <Route path="/order" element={<Orders userName={userName} />} />
          <Route
            path="/my_orders"
            element={
              <MyOrders
                userName={
                  typeof userName === "string" ? userName.toLowerCase() : ""
                }
              />
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
