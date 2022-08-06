import React, { useRef, useState, useEffect, useContext } from "react";
import { MyContext } from "../contexts/MyContext";
import "../Styles/ringoversalesforce.css";
import { IoSearchSharp, IoCloseCircle } from "react-icons/io5";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
var prevValue = "";
var sfData = [
  { Name: "AccountType" },
  { Name: "AccountName" },
  { Name: "AccountNum" },
  { Name: "Body" },
  { Name: "BuildVersion" },
  { Name: "Bas" },
  { Name: "Box" },
  { Name: "Body3" },
  { Name: "Boat" },
  { Name: "Bag" },
  { Name: "BaseCE" },
  { Name: "Body2" },
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

  const { setLeadsTotal } = useContext(MyContext);
  const { setLeadsMatched } = useContext(MyContext);
  const { sethighlightId } = useContext(MyContext);
  const { highlightId2 } = useContext(MyContext);
  const [fsvalue, setValue] = useState("");
  const [rcValue, setRcValue] = useState("");
  const fieldref = useRef(null);
  //   const [firstFilteredList, setFirstFilteredList] = useState([]);
  //   const [secondFilteredList, setSeconfFilteredList] = useState([]);
  useEffect(() => {
    // Update the document title using the browser API
    console.log("mounted");
    setLeadsTotal(rfData.length);
    setLeadsMatched(getLeadsMatched());
    // groupNames(sfData)
    highlight();
  });
  const data1 = rfData.filter((filter) => {
    return filter.Name.toLowerCase().indexOf(rcValue.toLowerCase()) >= 0;
  });

  const data2 = newsfData.filter((filter) => {
    return (
      filter.letter.toLowerCase().indexOf(fsvalue.charAt(0).toLowerCase()) >= 0
    );
  });
  console.log("----------");
  console.log({ rcValue });
  console.log({ fsvalue });
  console.log(data1);
  console.log(data2);
  console.log(data1.length);
  console.log(data2.length);
  console.log("----------");

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
    const { draggableId, source, destination } = result;
    console.log(source, destination, draggableId);
    //Case coming from somewhere else to droppable-mf

    if (
      rcValue == "" &&
      fsvalue == "" &&
      source.droppableId != "droppable-mf" &&
      destination.droppableId == "droppable-mf"
    ) {
      console.log("case 1 both unfiltered right to left");

      if (rfData[destination.index].MF != "") {
        alert("Remove Field First By Dragging or Pressing Backspace");

        return;
      }

      rfData.splice(destination.index, 1, {
        Name: rfData[destination.index].Name,
        MF: newsfData[source.droppableId].names[source.index],
        del_id: source.droppableId,
        del_index: source.index,
      });
      newsfData[source.droppableId].names.splice(source.index, 1);

      console.log(rfData);
      console.log(newsfData);
    }
    if (
      rcValue == "" &&
      fsvalue == "" &&
      source.droppableId == "droppable-mf" &&
      destination.droppableId != "droppable-mf"
    ) {
      console.log("case 2 both unfiltered left to right");

      newsfData[rfData[source.index].del_id].names.splice(
        rfData[source.index].del_index,
        0,
        rfData[source.index].MF
      );

      rfData.splice(source.index, 1, {
        Name: rfData[source.index].Name,
        MF: "",
      });
      console.log(rfData);
      console.log(newsfData);
    }
    if (
      rcValue == "" &&
      fsvalue != "" &&
      source.droppableId != "droppable-mf" &&
      destination.droppableId == "droppable-mf"
    ) {
      console.log("case 3 right filtered right to left");
      console.log(newsfData);
      console.log(data2);
      //filtered array se value uthao original array mein search kro and the move to left
      var value = data2[source.droppableId].names[source.index];
      console.log(value);
      for (var i = 0; i < newsfData.length; i++) {
        for (var j = 0; j < newsfData[i].names.length; j++) {
          if (newsfData[i].names[j] == value) {
            var obj = { id: i, index: j };
          }
        }
      }
      console.log(obj);

      if (rfData[destination.index].MF != "") {
        alert("Remove Field First By Dragging or Pressing Backspace");
        return;
      }

      //add
      rfData.splice(destination.index, 1, {
        Name: rfData[destination.index].Name,
        MF: newsfData[obj.id].names[obj.index],
        del_id: obj.id,
        del_index: obj.index,
      });

      //remove
      newsfData[obj.id].names.splice(obj.index, 1);

      console.log(rfData);
      console.log(newsfData);
    }

    if (
      rcValue == "" &&
      fsvalue != "" &&
      source.droppableId == "droppable-mf" &&
      destination.droppableId != "droppable-mf"
    ) {
      console.log("case 4 right filtered left to right");
      newsfData[rfData[source.index].del_id].names.splice(
        rfData[source.index].del_index,
        0,
        rfData[source.index].MF
      );

      rfData.splice(source.index, 1, {
        Name: rfData[source.index].Name,
        MF: "",
      });
      console.log(rfData);
      console.log(newsfData);
    }

    if (
      rcValue != "" &&
      fsvalue == "" &&
      source.droppableId != "droppable-mf" &&
      destination.droppableId == "droppable-mf"
    ) {
      console.log("case 5 left filtered right to left");
      //right normal array index se value uthao left sorted array ki value original array mein search kro and uss index par move kro
      //left sorted array ki destination index ki value se original array ki indexes nikalo
      console.log(data1);
      var tofind = data1[destination.index].Name;
      console.log(tofind);
      //find index of to find from original array
      for (var i = 0; i < rfData.length; i++) {
        if (rfData[i].Name == tofind) {
          var index = i;
        }
      }
      console.log(index);
      //add
      //   console.log(newsfData[source.droppableId].names[source.index])
      if (rfData[index].MF != "") {
        alert("Remove Field First By Dragging or Pressing Backspace");
        return;
      }
      rfData.splice(index, 1, {
        Name: rfData[index].Name,
        MF: newsfData[source.droppableId].names[source.index],
        del_id: source.draggableId,
        del_index: source.index,
      });

      //delete
      var value = newsfData[source.droppableId].names[source.index];
      console.log(value);
      newsfData[source.droppableId].names.splice(source.index, 1);
    }

    if (
      rcValue != "" &&
      fsvalue == "" &&
      source.droppableId == "droppable-mf" &&
      destination.droppableId != "droppable-mf"
    ) {
      console.log("case 6 left filtered left to right");
      //left ke sorted array se vlue ko original array mein find kro index lo
      console.log(data1);
      var tofind = data1[source.index].Name;
      console.log(tofind);

      for (var i = 0; i < rfData.length; i++) {
        if (rfData[i].Name == tofind) var index = i;
      }
      console.log(index);

      //add
      newsfData[rfData[index].del_id].names.splice(
        rfData[index].del_index,
        0,
        rfData[index].MF
      );
      //delete
      rfData.splice(index, 1, {
        Name: rfData[index].Name,
        MF: "",
      });
      console.log(rfData);
      console.log(newsfData);
    }

    if (
      rcValue != "" &&
      fsvalue != "" &&
      source.droppableId != "droppable-mf" &&
      destination.droppableId == "droppable-mf"
    ) {
      console.log("case 7 both Filtered right to left ");

      //take right value from duplicate array search in original array store index
      console.log(data2);
      var tofind = data2[source.droppableId].names[source.index];
      console.log(tofind);
      for (var i = 0; i < newsfData.length; i++) {
        for (var j = 0; j < newsfData[i].names.length; j++) {
          if (newsfData[i].names[j] == tofind) {
            var obj = { id: i, index: j };
          }
        }
      }
      console.log(obj);
      console.log(newsfData);
      //jo obj milla hai uss value ko move karna hai ab dhondo kaha move krna hai

      console.log(data1);
      var tofindindex = data1[destination.index].Name;
      console.log(tofindindex);
      for (var i = 0; i < rfData.length; i++) {
        if (rfData[i].Name == tofindindex) {
          var finalindex = i;
        }
      }
      console.log(finalindex);
      console.log(rfData);
      if (rfData[finalindex].MF != "") {
        alert("Remove Field First By Dragging or Pressing Backspace");
        return;
      }

      //add
      rfData.splice(finalindex, 1, {
        Name: rfData[finalindex].Name,
        MF: newsfData[obj.id].names[obj.index],
        del_id: obj.id,
        del_index: obj.index,
      });
      //delete
      newsfData[obj.id].names.splice(obj.index, 1);
    }
    if (
      rcValue != "" &&
      fsvalue != "" &&
      source.droppableId == "droppable-mf" &&
      destination.droppableId != "droppable-mf"
    ) {
      console.log("case 8 both Filtered left to right ");

      //take left value from filtered array find index in original array
      console.log(data1);
      var tofind = data1[source.index].Name;
      console.log(tofind);
      for (var i = 0; i < rfData.length; i++) {
        if (rfData[i].Name == tofind) var index = i;
      }
      console.log(index);
      console.log(rfData);
      //add
      newsfData[rfData[index].del_id].names.splice(
        rfData[index].del_index,
        0,
        rfData[index].MF
      );
      //delete
      rfData.splice(index, 1, {
        Name: rfData[index].Name,
        MF: "",
      });
    }

    // if (
    //   source.droppableId != "droppable-mf" &&
    //   destination.droppableId == "droppable-mf" &&
    //   rfData[destination.index].MF == ""
    // ) {
    //   console.log("case 1");
    //   //   console.log(groupNames(sfData)[source.droppableId].names[source.index])
    //   //Dala
    //   let obj = JSON.parse(draggableId);
    //   console.log(obj);
    //   console.log(newsfData[obj.idx1].names[obj.idx2]);
    //   var name = rfData[destination.index].Name;
    //   rfData.splice(destination.index, 1, {
    //     Name: name,
    //     MF: newsfData[obj.idx1].names[obj.idx2],
    //     del_id: obj.idx1,
    //     del_index: obj.idx2,
    //   });
    //   //   console.log(newsfData[source.droppableId].names)
    //   //remove kia
    //   newsfData[obj.idx1].names.splice(obj.idx2, 1);
    //   console.log(rfData);
    //   console.log(newsfData);
    // } else {
    //   if (
    //     source.droppableId != "droppable-mf" &&
    //     destination.droppableId == "droppable-mf" &&
    //     rfData[destination.index].MF != ""
    //   ) {
    //     console.log("case 2");
    //     //new case before dala remove kia already existing ko vapas bhejna
    //     //   newsfData[rfData[source.index].del_id].names
    //     console.log(newsfData[rfData[destination.index].del_id].names);
    //     console.log(rfData[destination.index].del_index);

    //     newsfData[rfData[destination.index].del_id].names.splice(
    //       rfData[destination.index].del_index,
    //       0,
    //       rfData[destination.index].MF
    //     );

    //     var name = rfData[destination.index].Name;
    //     rfData.splice(destination.index, 1, {
    //       Name: name,
    //       MF: newsfData[source.droppableId].names[source.index],
    //       del_id: source.droppableId,
    //       del_index: source.index,
    //     });

    //     newsfData[source.droppableId].names.splice(source.index, 1);
    //   }
    // }

    // //Case Delete going from droppable-mf to anywhere
    // if (
    //   source.droppableId == "droppable-mf" &&
    //   destination.droppableId != "droppable-mf"
    // ) {
    //   console.log("delete");
    //   //     console.log(newsfData)
    //   //    console.log("---")
    //   //    console.log(newsfData[rfData[source.index].del_id].names)
    //   //    console.log(rfData[source.index].del_index)
    //   //    console.log(rfData[source.index].MF)

    //   console.log(draggableId);

    //   newsfData[rfData[draggableId].del_id].names.splice(
    //     rfData[draggableId].del_index,
    //     0,
    //     rfData[draggableId].MF
    //   );

    //   rfData.splice(draggableId, 1, {
    //     Name: rfData[draggableId].Name,
    //     MF: "",
    //   });
    //   console.log(rfData);
    // }
    setLeadsTotal(rfData.length);
    setLeadsMatched(getLeadsMatched());
  };
  const getLeadsMatched = () => {
    console.log("==========CALLED=======");
    var count = 0;
    for (var i = 0; i < rfData.length; i++) {
      if (rfData[i].MF != "") {
        count++;
      }
    }
    console.log(count);
    return count;
  };
  const highlight = () => {
    if (highlightId2 == "xyz") return;
    console.log("===========Highlight==============");
    console.log({ highlightId2 });
    if (highlightId2 != "") {
      if (prevValue == "") {
        prevValue = highlightId2;
        if (document.getElementById(highlightId2 + 1)) {
          document.getElementById(highlightId2 + 1).style.background =
            "rgba(91, 107, 225, 0.15)";
          document.getElementById(highlightId2 + 1).scrollIntoView();
        }

        return;
      }
      if (prevValue != "") {
        console.log(prevValue + "isko whitekrdo");
        if (document.getElementById(highlightId2 + 1)) {
          document.getElementById(highlightId2 + 1).style.background =
            "rgba(91, 107, 225, 0.15)";
          document.getElementById(highlightId2 + 1).scrollIntoView();
        }

        if (prevValue != highlightId2) {
          if (document.getElementById(prevValue + 1)) {
            document.getElementById(prevValue + 1).style.background = "white";
          }
        }
      }

      //   console.log("***************************************");
      //   console.log("toggle");
      //   document.getElementById("qv").classList.toggle("qv-hover");
      //   id = highlightId2;
      //    console.log(document.getElementById(highlightId2+1));

      //   document.getElementById(highlightId2 + 1).style.background =
      //     "rgba(91, 107, 225, 0.15)";
      //   document.getElementById(highlightId2 + 1).scrollIntoView();

      //   document.getElementById(highlightId).classList.toggle("grow");
    }

    if (highlightId2 == "") {
      console.log("sabko white krdo");

      var array = document.getElementsByClassName("rf-filed");

      for (var i = 0; i < array.length; i++) {
        array[i].style.background = "white";
      }
    }
    // if (highlightId2 == "revert") {
    //     console.log("revert")
    //   //   document.getElementById("qv").classList.toggle("qv-hover");
    //   //   document.getElementById(id).classList.toggle("grow");
    //   //   console.log(id);
    //   //  console.log({id})
    //   //console.log(document.getElementById(id+1))
    //   if (document.getElementById(id + 1)) {
    //     document.getElementById(id + 1).style.background = "white";
    //   }
    // }
    // if (highlightId == "revert") {
    //   console.log("revert");
    //   const elem = document.getElementById("qv");
    //   const list = elem.classList;
    //   list.remove("qv-hover");
    //   console.log(globalelem)
    //   // myelement.remove("grow");
    // }
  };
  const getOriginalIndex = (index) => {};
  const getIndexFromArray = (n) => {
    // console.log(n);
    // console.log(newsfData);
    for (var i = 0; i < newsfData.length; i++) {
      for (var j = 0; j < newsfData[i].names.length; j++) {
        if (newsfData[i].names[j] == n) {
          //   console.log(i, j);
          var val = `{"idx1":"${i}","idx2":"${j}"}`;
          //   console.log(val);
        }
      }
    }
    return val;
  };

  const getIndexFromArrayNew = (n) => {
    console.log(n);
    for (var i = 0; i < rfData.length; i++) {
      if (rfData[i].Name == n) {
        var val = `{"index1":"${i}"}`;
        return val;
      }
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
                      <div
                        onMouseEnter={(e) =>
                          sethighlightId(e.target.querySelector("p").innerHTML)
                        }
                        onMouseLeave={(e) => sethighlightId("revert")}
                        className="rf-filed"
                        id={d.Name + 1}
                      >
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
                    {rfData
                      .filter((filter) => {
                        return (
                          filter.Name.toLowerCase().indexOf(
                            rcValue.toLowerCase()
                          ) >= 0
                        );
                      })
                      .map((d, index) => (
                        <Draggable
                          id={"S"}
                          key={index}
                          draggableId={`left-${index.toString()}`}
                          index={index}
                          type={"my type "}
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
                                  <p>{d.MF}</p>
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
                {console.log(newsfData.length)}
                {newsfData.length == 0 ? console.log(groupNames(sfData)) : null}
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
