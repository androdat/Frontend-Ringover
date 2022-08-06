import React, { useState,useContext } from "react";
import { MyContext } from "../contexts/MyContext";
import "../Styles/header.css";
import mf from "../images/mf.png";
import leads from "../images/leads.png";
import aac from "../images/aac.png";
import cs from "../images/cs.png";

const Header = () => {
  const {leadsTotal} = useContext(MyContext)
  const {leadsMatched} = useContext(MyContext)
  var string1 = `(${leadsMatched}/${leadsTotal} fields matched)`
  return (
    <div className="parent">
      <div className="header-txt">
        <div className="mf">
          <img src={mf} />
          <p>Match Fields</p>
        </div>
        <p>
          Here you can match your Salesforce fields to our exisiting Cadence
          fields.
        </p>
      </div>

      <div className="button-parent">
        <div className="button">
          <img src={leads} />
          <div>
            <p>Leads</p>
            <p className="small">{string1}</p>
          </div>
        </div>

        <div className="button">
          <img src={aac} />
          <div>
            <p>Account and contacts</p>
            <p className="small">(0/25 fields matched)</p>
          </div>
        </div>

        <div className="button">
          <img src={cs} />
          <div>
            <p>Custom fields</p>
            <p className="small">(0/25 fields matched)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
