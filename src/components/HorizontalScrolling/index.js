import React, { useState, useCallback } from 'react';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';

import { LeftArrow, RightArrow } from './ArrowsHorizontalScroll';
import Card from './Card';

import './styles.css';

const elemPrefix = 'test';
const getId = (index) => `${elemPrefix}${index}`;

const getItems = () =>
  Array(20)
    .fill(0)
    .map((_, ind) => ({ id: getId(ind) }));

function onWheel(apiObj, ev) {
  const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

  if (isThouchpad) {
    ev.stopPropagation();
    return;
  }

  if (ev.deltaY < 0) {
    apiObj.scrollNext();
  } else if (ev.deltaY > 0) {
    apiObj.scrollPrev();
  }
}

function HorizontalScrolling({ data = [] }) {
  const [items] = useState(getItems);
  const [selected, setSelected] = useState([]);
  // can save and restore position if needed
  const [position, setPosition] = useState(100);

  const isItemSelected = (id) => !!selected.find((el) => el === id);

  const handleItemClick = (itemId) => ({ getItemById }) => {
    const itemSelected = isItemSelected(itemId);

    console.log(getItemById(itemId));

    setSelected((currentSelected) =>
      itemSelected
        ? currentSelected.filter((el) => el !== itemId)
        : currentSelected.concat(itemId)
    );
  };

  const restorePosition = useCallback(
    ({ scrollContainer }) => {
      if (scrollContainer.current) {
        scrollContainer.current.scrollLeft = position;
      }
    },
    [position]
  );

  const savePosition = useCallback(
    ({ scrollContainer }) =>
      !!scrollContainer.current &&
      setPosition(scrollContainer.current.scrollLeft),
    []
  );

  return (
    <>
      <div className="example" style={{ paddingTop: '50px' }}>
        <div>
          <ScrollMenu
            LeftArrow={LeftArrow}
            RightArrow={RightArrow}
            onInit={restorePosition}
            onScroll={savePosition}
            onWheel={onWheel}
            className="teste"
          >
            {data.map(({ id, name, notes, file }) => (
              <Card
                title={id}
                itemId={id} // NOTE: itemId is required for track items
                key={id}
                onClick={handleItemClick(id)}
                selected={isItemSelected(id)}
                name={name}
                notes={notes}
                files={file}
              />
            ))}
          </ScrollMenu>
        </div>
      </div>
    </>
  );
}
export default HorizontalScrolling;
