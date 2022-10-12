import React, { Fragment, Component, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useApi from 'shared/hooks/api';
import { get } from 'lodash';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import  ProcedureCard from 'Procedures/ProcedureCard';

const propTypes = {
 categoryId: PropTypes.number.isRequired,
 templateId: PropTypes.number.isRequired,
};


// fake data generator
const getItems = (count, offset = 0) =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k + offset}`,
        content: `item ${k + offset}`
    }));


    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
      
        return result;
      };
      
      /**
       * Moves an item from one list to another list.
       */
      const move = (source, destination, droppableSource, droppableDestination) => {
        const sourceClone = Array.from(source);
        const destClone = Array.from(destination);
        const [removed] = sourceClone.splice(droppableSource.index, 1);
      
        destClone.splice(droppableDestination.index, 0, removed);
      
        const result = {};
        if (!sourceClone) sourceClone=[];
        if (!destClone) destClone=[];
        result[droppableSource.droppableId] = sourceClone;
        result[droppableDestination.droppableId] = destClone;
      
        return result;
      };

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : '#d1cbcb',

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : '#ede9e9',
    padding: grid,
    width: 250,
    margin:50,
});


const TemplateDragDropForm = ({categoryId, templateId}) => {
    
    const [fetchDetail] =useApi.get(`/templateDetails/template/${templateId}`);            //,  { lazy: true }
    const detailList=get(fetchDetail.data,"details", []);
    //const detailList=[];

    const [fetchProcedure] = useApi.get(`/procedures/category/${categoryId}`);        //,  { lazy: true }
    const procedureList=get(fetchProcedure.data, "procedures", []);
    //const procedureList=[];

    /*
    const stateBase={
        items: subprocedureList.map(subprodecure =>({
            id: `item-${subprodecure.SubProcedureId}`,
            content: `item ${subprodecure.Range}`
        })),
        selected: detailList.map(detail =>({
            id: `item-${detail.SubProcedureId}`,
            content: `item ${detail.Name}`
        })),
    }
    */

    const [state, setState] = useState([[],[]]);    //getItems(10), getItems(5,10)

    useEffect(()=>{
        if (!fetchDetail.isLoading)
        {
            //Add sub detail to state;
            const items= detailList.map(detail =>({
                id: `item-t-${detail.ProcedureId}`,
                content: `${detail.procedure?.Name}`,
                "procedure":detail.procedure
            }));
            const newState = [...state];
            newState[1] = items;

            console.log("Fetch template");
            if (!fetchProcedure.isLoading)
            {
                console.log("procedure varmış, aynıları proceduredan temizleyelim;");
                const myArrayFiltered = newState[0].filter((el) => {
                    return newState[1].every((f) => {
                      return f.procedure.ProcedureId !== el.procedure.ProcedureId; 
                    });
                  });
                  newState[0] = myArrayFiltered;
            }
            setState(newState);
        }
    },[fetchDetail.isLoading]);


    useEffect(()=>{
        if (!fetchProcedure.isLoading)
        {
            //Add sub procedure to state;
            const items= procedureList.map(procedure =>({
                id: `item-p-${procedure.ProcedureId}`,
                content: `${procedure.Name}`,
                "procedure":procedure
            }));
            const newState = [...state];
            newState[0] = items;
            console.log("Fetch procedure");

            if (!fetchDetail.isLoading &&  newState[1].length>0)
            {
                console.log("detail varmış, detail de olanları silelin");
                console.log("procedure varmış, aynıları proceduredan temizleyelim;");
                const myArrayFiltered = items.filter((el) => {
                    return newState[1].every((f) => {
                      return f.procedure.ProcedureId !== el.procedure.ProcedureId; 
                    });
                  });
                  const newState = [...state];
                  newState[0] = myArrayFiltered;
            }
            setState(newState);
        }
    },[fetchProcedure.isLoading]);





  function onDragEnd(result) {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(state[sInd], source.index, destination.index);
      const newState = [...state];
      newState[sInd] = items;
      setState(newState);
    } else {
      const result = move(state[sInd], state[dInd], source, destination);
      const newState = [...state];
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];

      setState(newState);
      //setState(newState.filter(group => group.length));
    }
  }


  return (
<DragDropContext onDragEnd={onDragEnd}>
    {!fetchProcedure.isLoading && 
    <Droppable key={0} droppableId="0">
        {(provided, snapshot) => (
            <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}>
                {state[0].map((item, index) => (
                    <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}>
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={getItemStyle(
                                    snapshot.isDragging,
                                    provided.draggableProps.style
                                )}>
                                    <ProcedureCard
                                    procedure={item.procedure}
                                    />
                            </div>
                        )}
                    </Draggable>
                ))}
                {provided.placeholder}
            </div>
        )}
    </Droppable>
    }
    {!fetchDetail.isLoading  && 
    <Droppable key={1} droppableId="1">
        {(provided, snapshot) => (
            <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}>
                {state[1].map((item, index) => (
                    <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}>
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={getItemStyle(
                                    snapshot.isDragging,
                                    provided.draggableProps.style
                                )}>
                                {item.content}
                            </div>
                        )}
                    </Draggable>
                ))}
                {provided.placeholder}
            </div>
        )}
    </Droppable>
    }
    </DragDropContext>
  );
};

TemplateDragDropForm.propTypes = propTypes;

export default TemplateDragDropForm;
