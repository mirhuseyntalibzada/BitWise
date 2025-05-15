import Home from "./pages/Home"
import Exchange from "./pages/Exchange"
import "../src/assets/styles/styles.scss"
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exchange" element={<Exchange />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default App
