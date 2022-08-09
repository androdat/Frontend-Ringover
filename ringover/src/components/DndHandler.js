export const onDragEndHandler = ( result, rcValue, fsvalue, rfData, newsfData, data1, data2 ) => {
  if (!result.destination) return;
  const { draggableId, source, destination } = result;
  var dndCase = getCases( rcValue, fsvalue, source.droppableId, destination.droppableId );
  switch (dndCase) {

    case "both unfiltered right to left":
      if (rfData[destination.index].MF != "") {
        alert("Remove Field First By Dragging or Pressing Backspace");
        return;
      }
      addCase1ToRfData( destination.index, destination.index, source.droppableId, source.index, source.droppableId, source.index, rfData, newsfData );
      delCase1FromNewSfData(source.droppableId, source.index, newsfData);
      break;

    case "both unfiltered left to right":
      addCase2ToNewSfData( source.index, source.index, source.index, rfData, newsfData );
      delCase2FromRfData(source.index, source.index, rfData);
      break;

    case "right filtered right to left":
      var value = data2[source.droppableId].names[source.index];
      var obj = case3(value, newsfData);
      if (rfData[destination.index].MF != "") {
        alert("Remove Field First By Dragging or Pressing Backspace");
        return;
      }
      addCase1ToRfData( destination.index, destination.index, obj.id, obj.index, obj.id, obj.index, rfData, newsfData );
      delCase1FromNewSfData(obj.id, obj.index, newsfData);
      break;

    case "right filtered left to right":
      addCase2ToNewSfData( source.index, source.index, source.index, rfData, newsfData );
      delCase2FromRfData(source.index, source.index, rfData);
      break;

    case "left filtered right to left":
      var tofind = data1[destination.index].Name;
      var index = case5(tofind, rfData);
      if (rfData[index].MF != "") {
        alert("Remove Field First By Dragging or Pressing Backspace");
        return;
      }
      addCase1ToRfData( index, index, source.droppableId, source.index, source.droppableId, source.index, rfData, newsfData );
      delCase1FromNewSfData(source.droppableId, source.index, newsfData);
      break;

    case "left filtered left to right":
      var tofind = data1[source.index].Name;
      var index = case5(tofind, rfData); // reusing case5 fnc
      addCase2ToNewSfData(index, index, index, rfData, newsfData);
      delCase2FromRfData(index, index, rfData);
      break;

    case "both Filtered right to left":
      var tofind = data2[source.droppableId].names[source.index];
      var obj = case3(tofind, newsfData);
      var tofindindex = data1[destination.index].Name;
      var finalindex = case5(tofindindex, rfData);
      if (rfData[finalindex].MF != "") {
        alert("Remove Field First By Dragging or Pressing Backspace");
        return;
      }
      addCase1ToRfData( finalindex, finalindex, obj.id, obj.index, obj.id, obj.index, rfData, newsfData );
      delCase1FromNewSfData(obj.id, obj.index, newsfData);
      break;

    case "both Filtered left to right":
      var tofind = data1[source.index].Name;
      var index = case5(tofind, rfData);
      addCase2ToNewSfData(index, index, index, rfData, newsfData);
      delCase2FromRfData(index, index, rfData);
      break;

    default:
      // code block
      console.log("Some Error Occured");
  }
};

const addCase1ToRfData = ( index1, index2, index3, index4, index5, index6, rfData, newsfData ) => {
  rfData.splice(index1, 1, {
    Name: rfData[index2].Name,
    MF: newsfData[index3].names[index4],
    del_id: index5,
    del_index: index6,
  });
};

const delCase1FromNewSfData = (index1, index2, newsfData) => {
  newsfData[index1].names.splice(index2, 1);
};

const addCase2ToNewSfData = (index1, index2, index3, rfData, newsfData) => {
  newsfData[rfData[index1].del_id].names.splice(
    rfData[index2].del_index,
    0,
    rfData[index3].MF
  );
};

const delCase2FromRfData = (index1, index2, rfData) => {
  rfData.splice(index1, 1, {
    Name: rfData[index2].Name,
    MF: "",
  });
};

const getCases = (
  rcValue,
  fsvalue,
  sourcedotdroppableid,
  destinationdotdroppableid
) => {
  if (
    rcValue == "" &&
    fsvalue == "" &&
    sourcedotdroppableid != "droppable-mf" &&
    destinationdotdroppableid == "droppable-mf"
  )
    return "both unfiltered right to left";

  if (
    rcValue == "" &&
    fsvalue == "" &&
    sourcedotdroppableid == "droppable-mf" &&
    destinationdotdroppableid != "droppable-mf"
  )
    return "both unfiltered left to right";
  if (
    rcValue == "" &&
    fsvalue != "" &&
    sourcedotdroppableid != "droppable-mf" &&
    destinationdotdroppableid == "droppable-mf"
  )
    return "right filtered right to left";

  if (
    rcValue == "" &&
    fsvalue != "" &&
    sourcedotdroppableid == "droppable-mf" &&
    destinationdotdroppableid != "droppable-mf"
  )
    return "right filtered left to right";

  if (
    rcValue != "" &&
    fsvalue == "" &&
    sourcedotdroppableid != "droppable-mf" &&
    destinationdotdroppableid == "droppable-mf"
  )
    return "left filtered right to left";

  if (
    rcValue != "" &&
    fsvalue == "" &&
    sourcedotdroppableid == "droppable-mf" &&
    destinationdotdroppableid != "droppable-mf"
  )
    return "left filtered left to right";
  if (
    rcValue != "" &&
    fsvalue != "" &&
    sourcedotdroppableid != "droppable-mf" &&
    destinationdotdroppableid == "droppable-mf"
  )
    return "both Filtered right to left";
  if (
    rcValue != "" &&
    fsvalue != "" &&
    sourcedotdroppableid == "droppable-mf" &&
    destinationdotdroppableid != "droppable-mf"
  )
    return "both Filtered left to right";
};

const case3 = (value, newsfData) => {
  for (var i = 0; i < newsfData.length; i++) {
    for (var j = 0; j < newsfData[i].names.length; j++) {
      if (newsfData[i].names[j] == value) {
        var obj = { id: i, index: j };
      }
    }
  }
  return obj;
};

const case5 = (tofind, rfData) => {
  for (var i = 0; i < rfData.length; i++) {
    if (rfData[i].Name == tofind) {
      var index = i;
    }
  }
  return index;
};
