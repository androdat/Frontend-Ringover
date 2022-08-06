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
} from "react-icons/io5";
var id = "";
const Quickview = () => {
  const { highlightId } = useContext(MyContext);
  useEffect(() => {
    console.log("Use Effect called from quickview");
    //  document.getElementById(highlightId).style.display = "none";
    highlight();
  });

  const highlight = () => {
    console.log("highlight called9999999");

    if (highlightId != "" && highlightId != "revert") {
      console.log("***************************************");
      console.log("toggle");
      document.getElementById("qv").classList.toggle("qv-hover");
      id = highlightId;
         document.getElementById(highlightId).classList.toggle("grow");
    }
    if (highlightId == "revert") {
      document.getElementById("qv").classList.toggle("qv-hover");
       document.getElementById(id).classList.toggle("grow");
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
  return (
    <div id="qv" className="quickview">
      {highlightId}
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
      <div className="social-icons-parent">
        <IoLogoLinkedin id="Linkedin URL" size={32} color="#0077B7" />
        <IoLinkSharp size={32} color="#567191" />
      </div>
      <div className="text">
        <p className="bolder">First_name Last_name</p>
        <IoGlobeOutline size={12} color="#567191" />
      </div>
      <div className="text">
        <IoBagRemoveSharp size={12} color="#567191" />
        <p>job_position at account_name with employee_number employees</p>
      </div>
      <div className="text">
        <IoMail size={12} color="#567191" />
        <p>primary_email_id (4)</p>
      </div>
      <div className="text">
        <IoPhonePortrait size={12} color="#567191" />
        <p>primary_phone</p>
      </div>

      <img className="quickview-img" src={quickview} />
    </div>
  );
};

export default Quickview;
