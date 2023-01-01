import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd"
import { useState } from "react"

export const List = () => {
    const listItems = [
        {
            id: 'gary',
            name: 'Gary Goodspeed',
            thumb: '/images/gary.png'
          },
          {
            id: 'cato',
            name: 'Little Cato',
            thumb: '/images/cato.png'
          },
          {
            id: 'kvn',
            name: 'KVN',
            thumb: '/images/kvn.png'
          },
          {
            id: 'mooncake',
            name: 'Mooncake',
            thumb: '/images/mooncake.png'
          },
          {
            id: 'quinn',
            name: 'Quinn Ergon',
            thumb: '/images/quinn.png'
          }
    ]
    const [characters, setCharacters] = useState(listItems)
    const handleOnDragEnd = (e) => {
        if (!e.destination) return; //if out of element parent
        console.log(e)
        const items = [...characters];
        const [reorderedItem] = items.splice(e.source.index, 1);
        items.splice(e.destination.index, 0, reorderedItem);

        setCharacters(items);
    }
    
    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="characters">
                {(provided) => (
                     <ul {...provided.droppableProps} ref={provided.innerRef}>
                     {characters.map(({id, name, thumb}, index) => {
                       return (
                         <Draggable key={id} draggableId={id} index={index}>
                           {(provided) => (
                             <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                               <div className="characters-thumb">
                               </div>
                               <p>
                                 { name }
                               </p>
                             </li>
                           )}
                         </Draggable>
                       );
                     })}
                     {provided.placeholder}
                   </ul>
                )}
            </Droppable>
        </DragDropContext>
    )
}