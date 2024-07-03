// App.js
import './App.css';
import React, { useState, useEffect } from "react";
import Todo from './Todo';

function App() {

  const [inputList, setInputList] = useState("");
  
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);

  //get data from ls
  const getLocalItems =()=>{
    let list =(localStorage.getItem('lists'));
    if (list){
      return JSON.parse(localStorage.getItem('lists'));
    }
    else{
      return [];
    }
  }
  const [Items, setItems] = useState(getLocalItems());
  
  const itemEvent = (event) => {
    setInputList(event.target.value);
  };

  const listOfItems = () => {
    if (isUpdating) {
      setItems((oldItems) => {
        const updatedItems = [...oldItems];
        updatedItems[currentIndex] = inputList;
        return updatedItems;
      });
      setIsUpdating(false);
      setCurrentIndex(null);
    } else {
      setItems((oldItems) => {
        return [...oldItems, inputList];
      });
    }
    setInputList("");
  };

  const deleteItems = (id) => {
    console.log("deleted");
    setItems((oldItems) => {
      return oldItems.filter((arrElem, index) => {
        return index !== id;
      });
    });
  };

  const editItem = (id) => {
    setIsUpdating(true);
    setCurrentIndex(id);
    setInputList(Items[id]);
  };

  // add local storrage
  useEffect(() =>{
    localStorage.setItem('lists',JSON.stringify(Items))
  },[Items]);

  return (
    <>
      <div className="main_div">
        <div className="center_div">
          <br />

          <h1>
            <i className="bi bi-list-task " /> ToDo List
          </h1>

          <br />

          <input type="text" placeholder="Add list"
            value={inputList}
            onChange={itemEvent} />

          <button onClick={listOfItems}>
            {isUpdating ? <i className="bi bi-pencil-square"></i> : "+"}
          </button>

          <ol>
            {Items.map((itemval, index) => {
              return (
                <Todo
                  key={index}
                  id={index}
                  text={itemval}
                  onSelect={deleteItems}
                  onEdit={editItem}
                />
              );
            })}
          </ol>
        </div>
      </div>
    </>
  );
}

export default App;
