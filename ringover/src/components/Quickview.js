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
  IoBagRemoveSharp
} from "react-icons/io5";

const Quickview = () => {
  return (
    <div className="quickview">
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
        <IoLogoLinkedin size={32} color="#0077B7" />
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

      <img src={quickview} />
    </div>
  );
};

export default Quickview;
