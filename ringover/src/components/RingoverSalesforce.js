import "../Styles/ringoversalesforce.css";

const RingoverSalesforce = () => {
  return (
    <div className="ringoversalesforce">
      <div className="ringover">
        <div className="heading-txt">
          <p>Ringover Cadence</p>
        </div>
        <div className="search-bar"></div>
        <div className="fields">
          <div className="ringover-fields">
            <div className="heading-txt-inside">
              <p>Ringover fields</p>
            </div>
            <ul className="list">
              <li className="list-item">
                <div className="rf-filed">
                  <p>account_name</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="salesforce-fields">
            <div className="heading-txt-inside">
              <p>Salesforce fields</p>
            </div>
          </div>
        </div>
      </div>

      <div className="salesforce">
        <div className="heading-txt">
          <p>Salesforce</p>
        </div>
        <div className="search-bar"></div>
      </div>
    </div>
  );
};

export default RingoverSalesforce;
