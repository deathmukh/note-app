import React, { useState } from "react";
import styles from './RightComponent.module.css'

export default function RightComponent(props) {
  const { selectedGroup, updateSelectedGroup } = props
  const [inputValue, setInputValue] = useState('')
  // console.log("Selected Group:", selectedGroup);

  function handleInputChange(event) {
    setInputValue(event.target.value)
  }
  function getInitials(groupName) {
    const words = groupName.split(" ");
    if (words.length === 1) {
      return words[0].substring(0, 2).toUpperCase();
    } else {
      return words[0][0].toUpperCase() + words[1][0].toUpperCase();
    }
  }

  function handleInputSubmit(event) {

    event.preventDefault()

    const existingData = localStorage.getItem(selectedGroup[0])
    const parsedData = JSON.parse(existingData)

    if (inputValue) {
      const newNote = {

        timestamp: new Date().toLocaleString(),
        text: inputValue.trim()

      }
      parsedData.notes.push(newNote)
      localStorage.setItem(selectedGroup[0], JSON.stringify(parsedData))
      setInputValue('');
      // console.log('data',parsedData)
      const updatedData = localStorage.getItem(selectedGroup[0])
      const finalData = [selectedGroup[0], updatedData]
      // console.log(selectedGroup)
      // console.log(finalData)
      updateSelectedGroup(finalData)

    }

  }

  return (
    <div className={styles.container}>
      <div className={styles.titleBar} style={{ display: 'flex'}}>
        {selectedGroup && (
          <div
            className={styles.circle}
            style={{ backgroundColor: JSON.parse(selectedGroup[1]).color }}
          >
            {getInitials(selectedGroup[0])}
          </div>
        )}
        <h1 style={{ color: selectedGroup?.color }}>
          {selectedGroup === null ? 'Select A Group' : selectedGroup[0]}
        </h1>
      </div>
      <div className={styles.notes}>
        {selectedGroup === null ? '' :
          JSON.parse(selectedGroup[1]).notes.map((note, key) => {
            return (<div className={styles.noteContent}>
              <p className={styles.noteContent1}>{note.timestamp}</p>
              <p className={styles.noteContent1}>{note.text}</p>
            </div>)
          })
        }
      </div>
      <div className={styles.inputBox}>
        <form onSubmit={handleInputSubmit}>
          <button type="submit" className={styles.submitButton}>
            <img src="./images/Vector.jpg" alt={`Enter-img`} />
          </button>
          <input
            placeholder="Enter your text here..."
            value={inputValue}
            onChange={handleInputChange}
          />
        </form>
      </div>

    </div >
  )
}
