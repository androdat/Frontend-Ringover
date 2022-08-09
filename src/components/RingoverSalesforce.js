/* eslint-disable */
import React, { useRef, useState, useEffect, useContext } from "react";
import { MyContext } from "../contexts/MyContext";
import "../Styles/ringoversalesforce.css";
import { IoSearchSharp, IoCloseCircle } from "react-icons/io5";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TabMenu from "./TabMenu";
import Ringover from "./Ringover";
import Salesforce from "./Salesforce";
import { onDragEndHandler } from "./DndHandler";
var prevValue = "";
var sfDataCopy = [];
var rfDataCopy = [];
var newsfDataCopy = [];
var deleteIndex = null;
var newsfDataCopyforaccount = [];
var rfDataCopyforaccount = [];
var newsfDataCopyforcontact = [];
var rfDataCopyforcontact = [];
var sfData = [
  { Name: "AccountType" },
  { Name: "AccountName" },
  { Name: "AccountNum" },
  { Name: "Body" },
  { Name: "BuildVersion" },
  { Name: "Bag" },
  { Name: "BaseCE" },
  { Name: "Body2" },
  { Name: "s" },
  { Name: "First Name" },
  { Name: "Last Name" },
  { Name: "Linkedin Url" },
  { Name: "Company Url" },
  { Name: "CEO" },
  { Name: "Account Name" },
  { Name: "Employee Number" },
  { Name: "Email ID" },
  { Name: "Ph No" },
];
var rfData = [
  { Name: "Linkedin URL", MF: "" },
  { Name: "Company URL", MF: "" },
  { Name: "First Name", MF: "" },
  { Name: "Last Name", MF: "" },
  { Name: "Job Position", MF: "" },
  { Name: "Account Name", MF: "" },
  { Name: "Employee Number", MF: "" },
  { Name: "Primary Email Id", MF: "" },
  { Name: "Primary Phone", MF: "" },
];
var newsfData = [];
const RingoverSalesforce = () => {
  const { setLeadsTotal } = useContext(MyContext);
  const { setLeadsMatched } = useContext(MyContext);
  const { sethighlightId } = useContext(MyContext);
  const { highlightId2 } = useContext(MyContext);
  const { showAcView } = useContext(MyContext);
  const { performAction, setPerformedAction } = useContext(MyContext);
  const { revertAction, setRevertAction } = useContext(MyContext);
  const { sfTotal, setSfTotal } = useContext(MyContext);
  const { setDisabledFields } = useContext(MyContext);
  const { frr, setFrr } = useContext(MyContext);
  const { setShowAcView } = useContext(MyContext);
  const { acTab, setAcTab } = useContext(MyContext);
  const { contactClickedState, setContactClickedState } = useContext(MyContext);
  const { spControllVariable, setSpControllVariable } = useContext(MyContext);
  const [fsvalue, setValue] = useState("");
  const [rcValue, setRcValue] = useState("");
  const fieldref = useRef(null);
  const [rerender, setRerender] = useState("");
  //filtered array of Ringover Fields
  const data1 = rfData.filter((filter) => {
    return filter.Name.toLowerCase().indexOf(rcValue.toLowerCase()) >= 0;
  });
  //filtered array of Salesforce Fields
  const data2 = newsfData.filter((filter) => {
    return (
      filter.letter.toLowerCase().indexOf(fsvalue.charAt(0).toLowerCase()) >= 0
    );
  });
  if (data2.length > 0) {
    var data3 = data2[0].names.filter((filter) => {
      return filter.toLowerCase().indexOf(fsvalue.toLowerCase()) >= 0;
    });
    data2[0].names = data3;
  }
  useEffect(() => {
    setLeadsTotal(rfData.length);
    setLeadsMatched(getLeadsMatched());
    setSfTotal(getSfTotal());
    setDisabledFields(rfData);
    highlight();
    performRevertActionsCaller();
  });

  const performActions = () => {
    if (spControllVariable == true) {
      //save state of contacts
      newsfDataCopyforcontact = newsfData;
      rfDataCopyforcontact = rfData;
      setShowAcView(false);
      setPerformedAction("");
      setRevertAction("");
      setAcTab(false);
      //  load state of account
      rfData = rfDataCopyforaccount;
      newsfData = newsfDataCopyforaccount;
      setRerender("a");
    }
    if (performAction == "") {
      setPerformedAction("called");
    }
    if (performAction == "called") return;
    //if first time initialize else restore state
    if (sfDataCopy.length == 0 && rfDataCopy.length == 0) {
      sfDataCopy = sfData;
      rfDataCopy = rfData;
      newsfDataCopy = newsfData;
    }
    if (
      newsfDataCopyforaccount.length == 0 &&
      rfDataCopyforaccount.length == 0
    ) {
      //new data for account
      sfData = [
        { Name: "AccountType" },
        { Name: "First Name" },
        { Name: "Last Name" },
        { Name: "Account Info" },
        { Name: "Account Name" },
        { Name: "Account Num" },
        { Name: "Employee Name" },
        { Name: "Employee Number" },
      ];
      groupNames(sfData);
      rfData = [
        { Name: "First Name", MF: "" },
        { Name: "Last Name", MF: "" },
        { Name: "Account Name", MF: "" },
        { Name: "Employee Number", MF: "" },
      ];
      setRerender("a");
    } else {
      //restore account
      rfData = rfDataCopyforaccount;
      newsfData = newsfDataCopyforaccount;
      setRerender("a");
    }
  };
  const revertActions = () => {
    if (revertAction == "") {
      setRevertAction("called");
    }
    if (revertAction == "called") return;
    //store account state
    newsfDataCopyforaccount = newsfData;
    rfDataCopyforaccount = rfData;
    //restore leads state
    sfData = sfDataCopy;
    rfData = rfDataCopy;
    newsfData = newsfDataCopy;
    setRerender("a");
  };

  const contactClicked = () => {
    setContactClickedState(true);
    //save account state
    newsfDataCopyforaccount = newsfData;
    rfDataCopyforaccount = rfData;
    //first time initialize else restore
    if (
      newsfDataCopyforcontact.length == 0 &&
      rfDataCopyforcontact.length == 0
    ) {
      //data for contact
      sfData = [
        { Name: "Vedant" },
        { Name: "Saxena" },
        { Name: "URL" },
        { Name: "737-927" },
        { Name: "Full Stack Dev" },
        { Name: "Company PhNo" },
        { Name: "Build Version" },
        { Name: "React" },
      ];
      groupNames(sfData);
      rfData = [
        { Name: "First Name", MF: "" },
        { Name: "Last Name", MF: "" },
        { Name: "Linkedin URL", MF: "" },
        { Name: "Primary Phone", MF: "" },
        { Name: "Job Position", MF: "" },
        { Name: "Company Phone", MF: "" },
      ];
      setRerender("a");
    } else {
      //restore data for contacts
      rfData = rfDataCopyforcontact;
      newsfData = newsfDataCopyforcontact;
      setRerender("a");
    }
  };
  const accountClicked = () => {
    setContactClickedState(false);
    //save state of contact
    newsfDataCopyforcontact = newsfData;
    rfDataCopyforcontact = rfData;
    //load state of account
    rfData = rfDataCopyforaccount;
    newsfData = newsfDataCopyforaccount;
    setRerender("a");
  };

  const groupNames = (arr) => {
    const map = arr.reduce((acc, val) => {
      let char = val.Name.charAt(0).toUpperCase();
      acc[char] = [].concat(acc[char] || [], val.Name);
      return acc;
    }, {});
    const res = Object.keys(map).map((el) => ({
      letter: el,
      names: map[el],
    }));
    newsfData = res;
    return res;
  };

  const onDragEnd = (result) => {
    onDragEndHandler(result, rcValue, fsvalue, rfData, newsfData, data1, data2);
    if (!result.destination) return;
    setLeadsTotal(rfData.length);
    setLeadsMatched(getLeadsMatched());
  };
  const getLeadsMatched = () => {
    var count = 0;
    rfData.forEach((item) => {
      if (item.MF != "") {
        count++;
      }
    });
    return count;
  };
  const getSfTotal = () => {
    var count = 0;
    var length;
    newsfData.forEach((item) => {
      length = item.names.length;
      count = count + length;
    });
    return count;
  };

  const highlight = () => {
    if (highlightId2 == "xyz") return;
    if (highlightId2 != "") {
      if (prevValue == "") {
        prevValue = highlightId2;
        const highlightElement = document.getElementById(highlightId2 + 1);
        if (highlightElement) {
          highlightElement.scrollIntoView();
          highlightElement.style.background = "rgba(91, 107, 225, 0.15)";
          highlightElement.style.transform = "scale(1.1)";
        }
        return;
      }
      if (prevValue != "") {
        const highlightElement = document.getElementById(highlightId2 + 1);
        const whiteElement = document.getElementById(prevValue + 1);
        if (highlightElement) {
          highlightElement.scrollIntoView();
          highlightElement.style.background = "rgba(91, 107, 225, 0.15)";
          highlightElement.style.transform = "scale(1.1)";
        }
        if (prevValue != highlightId2) {
          if (whiteElement) {
            whiteElement.style.background = "white";
          }
        }
      }
    }
    if (highlightId2 == "") {
      var array = document.getElementsByClassName("rf-filed");
      for (var i = 0; i < array.length; i++) {
        array[i].style.background = "white";
        array[i].style.transform = "scale(1)";
      }
    }
  };

  const startDelete = (index) => {
    deleteIndex = index;
    document.addEventListener("keydown", deleteElementCallback);
  };
  const endDelete = () => {
    document.removeEventListener("keydown", deleteElementCallback);
    setFrr(frr + 1);
  };
  function deleteElementCallback(event) {
    if (event.key == "Backspace") {
      deleteElement();
    }
  }
  const deleteElement = () => {
    if (rcValue == "") {
      //add
      newsfData[rfData[deleteIndex].del_id].names.splice(
        rfData[deleteIndex].del_index,
        0,
        rfData[deleteIndex].MF
      );
      //delete
      rfData.splice(deleteIndex, 1, {
        Name: rfData[deleteIndex].Name,
        MF: "",
      });
      setFrr(frr + 1);
    } else {
      var tofind = data1[deleteIndex].Name;
      for (var i = 0; i < rfData.length; i++) {
        if (rfData[i].Name == tofind) var index = i;
      }
      //delete from original array
      newsfData[rfData[index].del_id].names.splice(
        rfData[index].del_index,
        0,
        rfData[index].MF
      );
      rfData.splice(index, 1, {
        Name: rfData[index].Name,
        MF: "",
      });
      setFrr(frr + 1);
    }
  };
  const performRevertActionsCaller = () => {
    if (showAcView == true) {
      performActions();
    }
    if (showAcView == false) {
      revertActions();
    }
  };
  const calcIndex = (pindex, index) => {
    var elemToFind = data2[pindex].names[index];
    var originalIndex;

    newsfData.map((item, index) => {
      item.names.map((elem, innerindex) => {
        if (elem == elemToFind) {
          originalIndex = innerindex;
        }
      });
    });

    return originalIndex;
  };

  return (
    <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
      {showAcView && (
        <TabMenu
          contactClicked={contactClicked}
          accountClicked={accountClicked}
        />
      )}
      <div className="ringoversalesforce">
        <Ringover
          rcValue={rcValue}
          setRcValue={setRcValue}
          rfData={rfData}
          sethighlightId={sethighlightId}
          startDelete={startDelete}
          endDelete={endDelete}
          fieldref={fieldref}
        />
        <div className="salesforce">
          <div className="heading-txt">
            <p>Salesforce </p>
            <div className="count">
              <p>{sfTotal}</p>
            </div>
          </div>
          <div className="search-bar">
            <IoSearchSharp className="search-icon" size={14} color="#567191" />
            <input
              // ref={inputElt}
              value={fsvalue}
              onChange={(e) => setValue(e.target.value)}
              className="input"
              placeholder="Search"
            />
            {fsvalue && (
              <IoCloseCircle
                className="delete-icon display"
                size={14}
                color="#5b6be1"
                onClick={() => setValue("")}
              />
            )}
          </div>

          <div className="fields">
            <div className="sf-fields">
              <ul className="list">
                {newsfData.length == 0 ? groupNames(sfData) : null}
                {newsfData
                  .filter((filter) => {
                    return (
                      filter.letter
                        .toLowerCase()
                        .indexOf(fsvalue.charAt(0).toLowerCase()) >= 0
                    );
                  })

                  .map((t, pindex) => (
                    <Droppable droppableId={`${pindex}`} key={pindex}>
                      {(provided, snapshot) => {
                        return (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className="wd"
                          >
                            <p className="lettering">{t.letter}</p>

                            {t.names
                              .filter((filter) => {
                                return (
                                  filter
                                    .toLowerCase()
                                    .indexOf(fsvalue.toLowerCase()) >= 0
                                );
                              })
                              .map((n, index) => (
                                <Draggable
                                  key={index}
                                  draggableId={`right-${pindex.toString()}-${index.toString()}`}
                                  index={index}
                                >
                                  {(provided, snapshot) => {
                                    return (
                                      <li
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={{
                                          ...provided.draggableProps.style,
                                        }}
                                        className="list-item"
                                        key={index}
                                      >
                                        <div className="sf-filed">
                                          <p>{n}</p>
                                        </div>
                                      </li>
                                    );
                                  }}
                                </Draggable>
                              ))}
                            {provided.placeholder}
                          </div>
                        );
                      }}
                    </Droppable>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};

export default RingoverSalesforce;
