import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import QuickView from "./components/QuickView";
import RingoverSalesforce from "./components/RingoverSalesforce";
import { MyContext } from "./contexts/MyContext";
function App() {
  const [leadsTotal, setLeadsTotal] = useState(0);
  const [leadsMatched, setLeadsMatched] = useState(0);
  const [highlightId, sethighlightId] = useState("");
  const [highlightId2, sethighlightId2] = useState("xyz");
  const [showAcView, setShowAcView] = useState(null);
  const [acTab, setAcTab] = useState(false);
  const [performAction, setPerformedAction] = useState("");
  const [revertAction, setRevertAction] = useState("");
  const [sfTotal, setSfTotal] = useState("");
  const [disabledFields, setDisabledFields] = useState([]);
  const [frr, setFrr] = useState(0);
  const [contactClickedState, setContactClickedState] = useState(false);
  const [spControllVariable, setSpControllVariable] = useState(false);
  const providerValues = {
    leadsTotal,
    setLeadsTotal,
    leadsMatched,
    setLeadsMatched,
    highlightId,
    sethighlightId,
    highlightId2,
    sethighlightId2,
    showAcView,
    setShowAcView,
    acTab,
    setAcTab,
    performAction,
    setPerformedAction,
    revertAction,
    setRevertAction,
    sfTotal,
    setSfTotal,
    disabledFields,
    setDisabledFields,
    frr,
    setFrr,
    contactClickedState,
    setContactClickedState,
    spControllVariable,
    setSpControllVariable,
  };
  return (
    <div className="App">
      <div className="grid-container">
        <MyContext.Provider value={providerValues}>
          <div className="grid-item grid-item-1">
            <Header />
          </div>
          <div className="grid-item grid-item-2">
            <QuickView />
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
