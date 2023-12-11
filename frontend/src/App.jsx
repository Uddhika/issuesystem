import { Route, Routes } from "react-router-dom"
import Home from "./UI/Home"
import FilterIssueList from "./UI/FilterIssueList"
import Contactus from "./UI/Contactus"
import Aboutus from "./UI/Aboutus"
import FAQ from "./UI/FAQ"
import { BrowserRouter } from 'react-router-dom'

function App() {

  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/filterissues" element={<FilterIssueList />} />
        <Route path="/contact" element={<Contactus />} />
        <Route path="/about" element={<Aboutus />} />
        <Route path="/faq" element={<FAQ />} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
