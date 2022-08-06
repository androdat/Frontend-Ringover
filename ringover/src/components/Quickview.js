import React, { useRef, useState, useEffect, useContext } from "react";
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
var id = "";
var value = "";
const Quickview = () => {
  const { highlightId } = useContext(MyContext);
  const { sethighlightId2 } = useContext(MyContext);
  const { highlightId2 } = useContext(MyContext);
  useEffect(() => {
    // console.log("Use Effect called from quickview");
    //  document.getElementById(highlightId).style.display = "none";
    highlight();
  });

  const highlight = () => {
    // console.log("highlight called9999999");

    if (highlightId != "" && highlightId != "revert") {
      console.log("***************************************");
      console.log("toggle");
      document.getElementById("qv").classList.add("qv-hover");
      id = highlightId;
      console.log(document.getElementById(highlightId));
      document.getElementById(highlightId).classList.add("grow");
    }
    if (highlightId == "revert") {
      document.getElementById("qv").classList.remove("qv-hover");
      document.getElementById(id).classList.remove("grow");
      console.log(id);
    }
    // if (highlightId == "revert") {
    //   console.log("revert");
    //   const elem = document.getElementById("qv");
    //   const list = elem.classList;
    //   list.remove("qv-hover");
    //   console.log(globalelem)
    //   // myelement.remove("grow");
    // }
  };

  const onHoverStart = (e) => {
    console.log("------onHoverStart-----")
    console.log({highlightId2})
    // if (highlightId2 != "revert" && highlightId2 != "") {
    //   sethighlightId2("revert");
    // }
    // if (highlightId2 != "revert" && highlightId2 != "") {
    //   // if (value != "") {
    //   //   sethighlightId2(value);
    //   //   return;
    //   // }

    //   // console.log("saved value = ", { value });
    //   // sethighlightId2("revert");
    //   // return;
    //   console.log("<<<<<<REVERT NOT SET>>>>>>");
    //   value = e.target.id;
    //   revertHandler();
    //   return;
    // }
    document.getElementById("qv").classList.toggle("qv-hover");

    sethighlightId2(e.target.id);
  };
  const onHoverEnd = () => {
    // console.log("------onHoverEnd-----")
    document.getElementById("qv").classList.toggle("qv-hover");
     sethighlightId2("");
  };

  const revertHandler = () => {
    console.log("=====HANDLING REVERT=====");
    console.log({ value });
    console.log(highlightId2);
    sethighlightId2("revert");
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
      <IoLogoLinkedin
        onMouseEnter={(e) => onHoverStart(e)}
        onMouseLeave={() => onHoverEnd()}
        id="Linkedin URL"
        size={32}
        color="#0077B7"
      />
      <IoLinkSharp
        onMouseEnter={(e) => onHoverStart(e)}
        onMouseLeave={() => onHoverEnd()}
        id="Company URL"
        size={32}
        color="#567191"
      />
      <p
        onMouseEnter={(e) => onHoverStart(e)}
        onMouseLeave={() => onHoverEnd()}
        className="bolder"
        id="First Name"
      >
        First_name
      </p>
      <p
        onMouseEnter={(e) => onHoverStart(e)}
        onMouseLeave={() => onHoverEnd()}
        className="bolder"
        id="Last Name"
      >
        Last_name
      </p>
      <IoGlobeOutline id="globe" size={12} color="#567191" />
      <IoBagRemoveSharp id="bag" size={12} color="#567191" />
      <span
        onMouseEnter={(e) => onHoverStart(e)}
        onMouseLeave={() => onHoverEnd()}
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
        onMouseLeave={() => onHoverEnd()}
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
        onMouseLeave={() => onHoverEnd()}
        className="small-font"
        id="Employee Number"
      >
        employee_number
      </span>{" "}
      <span className="small-font" id="employees">
        employees
      </span>
      <div
        onMouseEnter={(e) => onHoverStart(e)}
        onMouseLeave={() => onHoverEnd()}
        id="Primary Email Id"
        className="text"
      >
        <IoMail size={12} color="#567191" />
        <p>
          <span>primary_email_id</span> (4)
        </p>
      </div>
      <div
        onMouseEnter={(e) => onHoverStart(e)}
        onMouseLeave={() => onHoverEnd()}
        id="Primary Phone"
        className="text"
      >
        <IoPhonePortrait size={12} color="#567191" />
        <p>primary_phone</p>
      </div>
      <div id="Company Phone" className="text">
        <IoPhonePortraitOutline size={12} color="#567191" />
        <p>company_phone</p>
      </div>
      <img className="quickview-img" src={quickview} />
    </div>
  );
};

export default Quickview;
