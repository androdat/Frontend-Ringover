import React, { useRef, useState, useEffect } from "react";
import "../Styles/ringoversalesforce.css";
import { IoSearchSharp, IoCloseCircle } from "react-icons/io5";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
var sfData = [
  { Name: "AccountType" },
  { Name: "AccountName" },
  { Name: "AccountNum" },
  { Name: "Body" },
  { Name: "BuildVersion" },
  { Name: "BaseCE" },
  { Name: "s" },
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
var rfDataMatched = [
  { Name: "Placeholder" },
  { Name: "Placeholder" },
  { Name: "Placeholder" },
  { Name: "Placeholder" },
  { Name: "Placeholder" },
  { Name: "Placeholder" },
  { Name: "Placeholder" },
  { Name: "Placeholder" },
  { Name: "Placeholder" },
];

const arr = ["Simon", "Mike", "Jake", "Lara", "Susi", "Blake", "James"];
const RingoverSalesforce = () => {
  // Search Box

  const [value, setValue] = useState("");
  const [rcValue, setRcValue] = useState("");
  const fieldref = useRef(null);
  useEffect(() => {
    // Update the document title using the browser API
    console.log("mounted");
    // groupNames(sfData)
  });

  const groupNames = (arr) => {
    console.log("groupNames called");
    const map = arr.reduce((acc, val) => {
      let char = val.Name.charAt(0).toUpperCase();
      acc[char] = [].concat(acc[char] || [], val.Name);
      return acc;
    }, {});
    const res = Object.keys(map).map((el) => ({
      letter: el,
      names: map[el],
    }));
    console.log(res);
    newsfData = res;
    console.log(newsfData);
    return res;
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    console.log("on drag end fired");
    console.log(result);
    const { source, destination } = result;
    console.log(source, destination);
    //Case coming from somewhere else to droppable-mf
    if (
      source.droppableId != "droppable-mf" &&
      destination.droppableId == "droppable-mf"
    ) {
      console.log("1 2 ka 4");
      //   console.log(groupNames(sfData)[source.droppableId].names[source.index])
      rfDataMatched.splice(destination.index, 1, {
        Name: newsfData[source.droppableId].names[source.index],
        del_id: source.droppableId,
        del_index: source.index,
      });
      //   console.log(newsfData[source.droppableId].names)
      newsfData[source.droppableId].names.splice(source.index, 1);
      console.log(newsfData);
      console.log(rfDataMatched);
    }

    //Case Delete going from droppable-mf to anywhere
    if (
      source.droppableId == "droppable-mf" &&
      destination.droppableId != "droppable-mf"
    ) {
      console.log("delete");
      console.log(rfDataMatched[source.index]);
    //   console
    //     .log(newsfData[rfDataMatched[source.index].del_id].names)
        (newsfData[rfDataMatched[source.index].del_id].names)
        .splice(rfDataMatched[source.index].del_index, 0, rfDataMatched[source.index].Name);
        rfDataMatched.splice(source.index,1,{ Name: "Placeholder" })
    }
  };
  return (
    <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
      <div className="ringoversalesforce">
        <div className="ringover">
          <div className="heading-txt">
            <p>Ringover Cadence</p>
          </div>
          <div className="search-bar">
            <IoSearchSharp
              className="search-icon-lg"
              size={14}
              color="#567191"
            />
            <input
              // ref={inputElt}
              value={rcValue}
              onChange={(e) => setRcValue(e.target.value)}
              className="input-lg "
              placeholder="Search"
            />
            {rcValue && (
              <IoCloseCircle
                className="delete-icon-lg"
                size={14}
                color="#5b6be1"
                onClick={() => setRcValue("")}
              />
            )}
          </div>
          <div className="fields">
            <div className="ringover-fields">
              <div className="heading-txt-inside">
                <p>Ringover fields</p>
              </div>
              <ul className="list">
                {rfData
                  .filter((filter) => {
                    return (
                      filter.Name.toLowerCase().indexOf(
                        rcValue.toLowerCase()
                      ) >= 0
                    );
                  })
                  .map((d, index) => (
                    <li key={index} className="list-item">
                      <div className="rf-filed">
                        <p>{d.Name}</p>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
            <div className="salesforce-fields">
              <div className="heading-txt-inside">
                <p>Salesforce fields</p>
              </div>

              <Droppable droppableId="droppable-mf" key={1}>
                {(provided, snapshot) => (
                  <ul
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="list"
                  >
                    {rfDataMatched
                      .filter((filter) => {
                        return (
                          filter.Name.toLowerCase().indexOf(
                            rcValue.toLowerCase()
                          ) >= 0
                        );
                      })
                      .map((d, index) => (
                        <Draggable
                          key={index}
                          draggableId={d + index}
                          index={index}
                        >
                          {(provided, snapshot) => {
                            return (
                              <li
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                                key={index}
                                className="list-item"
                              >
                                <div ref={fieldref} className="rf-filed-new">
                                  <p>{d.Name}</p>
                                </div>
                              </li>
                            );
                          }}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </div>
          </div>
        </div>

        <div className="salesforce">
          <div className="heading-txt">
            <p>Salesforce</p>
          </div>
          <div className="search-bar">
            <IoSearchSharp className="search-icon" size={14} color="#567191" />
            <input
              // ref={inputElt}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="input"
              placeholder="Search"
            />
            {value && (
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
                {console.log(newsfData.length)}
                {newsfData.length == 0 ? console.log(groupNames(sfData)) : null}
                {newsfData
                  .filter((filter) => {
                    return (
                      filter.letter
                        .toLowerCase()
                        .indexOf(value.charAt(0).toLowerCase()) >= 0
                    );
                  })

                  .map((t, index) => (
                    <Droppable droppableId={`${index}`} key={index}>
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
                                    .indexOf(value.toLowerCase()) >= 0
                                );
                              })
                              .map((n, index) => (
                                <Draggable
                                  key={index}
                                  draggableId={n + index}
                                  index={index}
                                >
                                  {(provided, snapshot) => {
                                    return (
                                      <li
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className="list-item"
                                        key={index}
                                      >
                                        <div className="sf-filed">
                                          {index}

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
