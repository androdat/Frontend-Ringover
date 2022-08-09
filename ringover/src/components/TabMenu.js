import React, { useContext } from "react";
import { MyContext } from "../contexts/MyContext";
import "../Styles/tabmenu.css";
const TabMenu = ({ contactClicked, accountClicked }) => {
  const { acTab, setAcTab } = useContext(MyContext);
  const accountClickHandler = () => {
    if (acTab == false) return;
    setAcTab(false);
    accountClicked();
  };
  const contactClickHandler = () => {
    if (acTab == true) return;
    setAcTab(true);
    contactClicked();
  };
  return (
    <div className="tab-menu">
      <div onClick={accountClickHandler} id="tab-1" className="tab-1">
        <p>Account</p>
        {!acTab && <div className="bottom"></div>}
      </div>
      <div onClick={contactClickHandler} id="tab-2" className="tab-2">
        <p>Contact</p>
        {acTab && <div className="bottom"></div>}
      </div>
    </div>
  );
};

export default TabMenu;

// if (acTab != false) {
//   setAcTab(false);
//   accountClicked();
// }

// if (acTab != true) {
//   setAcTab(true);
//   contactClicked();
// }
