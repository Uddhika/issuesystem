import { Route, Routes } from "react-router-dom"
import Home from "./UI/Home"
import FilterIssueList from "./UI/FilterIssueList"
import Contactus from "./UI/Contactus"
import Aboutus from "./UI/Aboutus"
import FAQ from "./UI/FAQ"

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/filterissues" element={<FilterIssueList />} />
        <Route path="/contact" element={<Contactus />} />
        <Route path="/about" element={<Aboutus />} />
        <Route path="/faq" element={<FAQ />} />
      </Routes>
    </div>
  )
}

export default App
