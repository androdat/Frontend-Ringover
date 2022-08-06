import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Quickview from "./components/Quickview";
import RingoverSalesforce from "./components/RingoverSalesforce";
import { MyContext } from "./contexts/MyContext";
function App() {
  const [leadsTotal, setLeadsTotal] = useState(0);
  const [leadsMatched, setLeadsMatched] = useState(0);
  const [highlightId, sethighlightId] = useState("");
  const [highlightId2, sethighlightId2] = useState("xyz");
  return (
    <div className="App">
      <div className="grid-container">
        <MyContext.Provider
          value={{
            leadsTotal,
            setLeadsTotal,
            leadsMatched,
            setLeadsMatched,
            highlightId,
            sethighlightId,
            highlightId2,
            sethighlightId2,
          }}
        >
          <div className="grid-item grid-item-1">
            <Header />
          </div>
          <div className="grid-item grid-item-2">
            <Quickview />
          </div>
          <div className="grid-item grid-item-3">
            <RingoverSalesforce />
          </div>
        </MyContext.Provider>
      </div>
    </div>
  );
}

export default App;

{
  /* <Header />
      <Quickview/> 
      <RingoverSalesforce/> */
}
