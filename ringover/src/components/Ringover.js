import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { IoSearchSharp, IoCloseCircle } from "react-icons/io5";
const Ringover = ({
  rcValue,
  setRcValue,
  rfData,
  sethighlightId,
  startDelete,
  endDelete,
  fieldref,
}) => {
  return (
    <div className="ringover">
      <div className="heading-txt">
        <p>Ringover Cadence</p>
      </div>
      <div className="search-bar">
        <IoSearchSharp className="search-icon-lg" size={14} color="#567191" />
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
                  filter.Name.toLowerCase().indexOf(rcValue.toLowerCase()) >= 0
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
            <p>Salesforce fields </p>
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
                            <div
                              id={`div-left-${index.toString()}`}
                              ref={fieldref}
                              className="rf-filed-new"
                              onMouseDown={() => {
                                startDelete(index);
                              }}
                              onMouseUp={endDelete}
                            >
                              <p>{d.MF}</p>{" "}
                              {/* {d.MF != "" && makeListElementColor(index)} */}
                              {d.MF == "" && (
                                <p className="place-here">Place Here</p>
                              )}
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
  );
};

export default Ringover;
