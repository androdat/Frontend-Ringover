import React, { useState, useEffect, useContext } from "react";
import { MyContext } from "../contexts/MyContext";
import "../Styles/quickview.css";
import quickview from "../images/quickview.png";
import {
  IoCaretDownOutline,
  IoAddCircle,
  IoPencilOutline,
  IoLogoLinkedin,
  IoLinkSharp,
  IoGlobeOutline,
  IoMail,
  IoPhonePortrait,
  IoBagRemoveSharp,
  IoPhonePortraitOutline,
} from "react-icons/io5";
var value = "";
const QuickView = () => {
  const { highlightId } = useContext(MyContext);
  const { sethighlightId2 } = useContext(MyContext);
  const { highlightId2 } = useContext(MyContext);
  const { disabledFields, setDisabledFields } = useContext(MyContext);
  const [showLinkedenUrl, setShowLinkedenUrl] = useState(false);
  const [showCompanyUrl, setShowCompanyUrl] = useState(false);
  const [onHoverTracker, setOnHoverTracker] = useState(null);
  useEffect(() => {
    highlight();
    disable();
  });

  const disable = () => {
    if (disabledFields.length == 0) return;
    //remove all enable (reset)
    setShowLinkedenUrl(false);
    setShowCompanyUrl(false);
    removeEnable();
    for (var i = 0; i < disabledFields.length; i++) {
      var condition = document.getElementById(disabledFields[i].Name);
      if (disabledFields[i].Name == "Linkedin URL") {
        setShowLinkedenUrl(true);
      }
      if (disabledFields[i].Name == "Company URL") {
        setShowCompanyUrl(true);
      }
      if (condition) condition.classList.add("enable");
    }
    //clear array
    setDisabledFields([]);
  };
  const highlight = () => {
    const parentDiv = document.getElementById("qv");
    const highlightElement = document.getElementById(highlightId);
    if (highlightId != "" && highlightId != "revert") {
      if (parentDiv) {
        parentDiv.classList.add("qv-hover");
      }
      if (highlightElement) {
        highlightElement.classList.add("grow");
      }
    }
    if (highlightId == "revert") {
      const growElement = document.querySelectorAll(".grow");
      growElement.forEach((element) => {
        element.classList.remove("grow");
      });
      if (parentDiv) {
        parentDiv.classList.remove("qv-hover");
      }
    }
  };

  const onHoverStart = (e) => {
    const parentDiv = document.getElementById("qv");
    const target = e.target;
    if (onHoverTracker == 1) {
      setOnHoverTracker(0);
      sethighlightId2("");
      parentDiv.classList.remove("qv-hover");
    }
    setOnHoverTracker(1);
    sethighlightId2(target.id);
    if (target.classList.contains("enable"))
      parentDiv.classList.add("qv-hover");
  };
  const onHoverEnd = (e) => {
    const parentDiv = document.getElementById("qv");
    const target = e.target;
    setOnHoverTracker(0);
    sethighlightId2("");
    if (target.classList.contains("enable"))
      parentDiv.classList.remove("qv-hover");
  };

  const removeEnable = () => {
    var elements = document.getElementsByClassName("enable");
    if (elements.length == 0) return;
    for (var i = 0; i < elements.length; i++) {
      elements[i].classList.remove("enable");
    }
  };
  return (
    <div id="qv" className="quickview">
      <div className="static-buttons-parents">
        <div className="static-buttons">
          <p>Status</p>
          <IoCaretDownOutline size={12} color="#567191" />
        </div>
        <div className="static-buttons">
          <p>Custom</p>
          <IoAddCircle size={12} color="#567191" />
        </div>
        <div className="static-buttons">
          <p>Add note</p>
          <IoPencilOutline size={12} color="#567191" />
        </div>
      </div>
      {showLinkedenUrl && (
        <IoLogoLinkedin
          onMouseEnter={(e) => onHoverStart(e)}
          onMouseLeave={(e) => onHoverEnd(e)}
          id="Linkedin URL"
          size={32}
          color="#0077B7"
        />
      )}
      {showCompanyUrl && (
        <IoLinkSharp
          onMouseEnter={(e) => onHoverStart(e)}
          onMouseLeave={(e) => onHoverEnd(e)}
          id="Company URL"
          size={32}
          color="#567191"
        />
      )}
      <p
        onMouseEnter={(e) => onHoverStart(e)}
        onMouseLeave={(e) => onHoverEnd(e)}
        className="bolder"
        id="First Name"
      >
        First_name
      </p>
      <p
        onMouseEnter={(e) => onHoverStart(e)}
        onMouseLeave={(e) => onHoverEnd(e)}
        className="bolder"
        id="Last Name"
      >
        Last_name
      </p>
      <IoGlobeOutline id="globe" size={12} color="#567191" />
      <IoBagRemoveSharp id="bag" size={12} color="#567191" />
      <span
        onMouseEnter={(e) => onHoverStart(e)}
        onMouseLeave={(e) => onHoverEnd(e)}
        className="small-font"
        id="Job Position"
      >
        job_position
      </span>{" "}
      <span className="small-font" id="at">
        at
      </span>
      <span
        onMouseEnter={(e) => onHoverStart(e)}
        onMouseLeave={(e) => onHoverEnd(e)}
        className="small-font"
        id="Account Name"
      >
        account_name
      </span>{" "}
      <span className="small-font" id="with">
        with
      </span>
      <span
        onMouseEnter={(e) => onHoverStart(e)}
        onMouseLeave={(e) => onHoverEnd(e)}
        className="small-font"
        id="Employee Number"
      >
        employee_number
      </span>{" "}
      <span className="small-font" id="employees">
        employees
      </span>
      <IoMail className="pee" size={12} color="#567191" />
      <p
        onMouseEnter={(e) => onHoverStart(e)}
        onMouseLeave={(e) => onHoverEnd(e)}
        id="Primary Email Id"
      >
        primary_email_id
      </p>
      <IoPhonePortrait className="pff" size={12} color="#567191" />
      <p
        onMouseEnter={(e) => onHoverStart(e)}
        onMouseLeave={(e) => onHoverEnd(e)}
        id="Primary Phone"
      >
        primary_phone
      </p>
      <IoPhonePortraitOutline className="cpp" size={12} color="#567191" />
      <p id="Company Phone">company_phone</p>
      <img className="quickview-img" src={quickview} />
    </div>
  );
};

export default QuickView;

// const highlight = () => {
//   if (highlightId != "" && highlightId != "revert") {
//     if (document.getElementById("qv")) {
//       document.getElementById("qv").classList.add("qv-hover");
//     }
//     if (document.getElementById(highlightId)) {
//       document.getElementById(highlightId).classList.add("grow");
//     }
//   }
//   if (highlightId == "revert") {
//     const growElement = document.querySelectorAll(".grow");
//     growElement.forEach((element) => {
//       element.classList.remove("grow");
//     });
//     if (document.getElementById("qv")) {
//       document.getElementById("qv").classList.remove("qv-hover");
//     }
//   }
// };

// const onHoverStart = (e) => {
//   //  debugger;
//   if (onHoverTracker == 1) {
//     setOnHoverTracker(0);
//     sethighlightId2("");
//     document.getElementById("qv").classList.remove("qv-hover");
//   }
//   setOnHoverTracker(1);
//   console.log("------onHoverStart-----");
//   console.log({ highlightId2 });
//   sethighlightId2(e.target.id);
//   // if (highlightId2 != "revert" && highlightId2 != "") {
//   //   sethighlightId2("revert");
//   // }
//   // if (highlightId2 != "revert" && highlightId2 != "") {
//   //   // if (value != "") {
//   //   //   sethighlightId2(value);
//   //   //   return;
//   //   // }

//   //   // console.log("saved value = ", { value });
//   //   // sethighlightId2("revert");
//   //   // return;
//   //   console.log("<<<<<<REVERT NOT SET>>>>>>");
//   //   value = e.target.id;
//   //   revertHandler();
//   //   return;
//   // }
//   console.log(e.target.classList.contains("enable"));
//   if (e.target.classList.contains("enable"))
//     document.getElementById("qv").classList.add("qv-hover");
// };
