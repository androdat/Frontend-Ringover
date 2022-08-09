import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { IoSearchSharp, IoCloseCircle } from "react-icons/io5";
const Salesforce = ({
  sfTotal,
  fsvalue,
  setValue,
  sfData,
  newsfData,
  groupNames,
}) => {
  return (
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
  );
};

export default Salesforce;
