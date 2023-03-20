import React, { useState, useEffect } from "react";
import styles from './LeftComponent.module.css'

const COLORS = ["#B38BFA", "#FF79F2", "#43E6FC", "#F19576", "#0047FF", "#6691FF"];

export default function LeftComponent(props) {

    const [showPopup, setShowPopup] = useState(false);
    const [groupName, setGroupName] = useState("");
    const [color, setColor] = useState("");
    const [groups, setGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const handleGroupClick = (group) => {
        props.handleGroupClick(group);
    }
    //  console.log("group clicked:", groups)
    useEffect(() => {
        // Load saved groups from local storage
        const savedGroups = Object.entries(localStorage);

        setGroups(savedGroups)


        // const existingData = localStorage.getItem('database')
        // console.log(existingData)
        // setDatabase(existingData)
        // console.log(database)


        // Update the groups state with saved groups
        // setGroups(database);
    }, []);

    function togglePopup() {
        setShowPopup(!showPopup);
        setSelectedGroup("");
    }

    function handleGroupNameChange(event) {
        setGroupName(event.target.value);
    }

    function handleColorChange(selectedColor) {
        if (["#B38BFA", "#FF79F2", "#43E6FC", "#F19576", "#0047FF", "#6691FF"].includes(selectedColor)) {
            setColor(selectedColor);
        }
    }
    function getInitials(groupName) {
        const words = groupName.split(" ");
        if (words.length === 1) {
            return words[0].substring(0, 2).toUpperCase();
        } else {
            return words[0][0].toUpperCase() + words[1][0].toUpperCase();
        }
    }
    function handleSave() {
        // Check if group name and color are empty
        if (!groupName.trim() || !color) {
            alert("You either left the group name empty or you did not choose a color");
            return;
        }


        // Save the group name and color to the local storage
        const groupData = {
            color: color,
            notes: [
            ]
        };
        localStorage.setItem(groupName, JSON.stringify(groupData));

        // Add the new group to the groups state
        const savedGroups = Object.entries(localStorage);

        setGroups(savedGroups)

        // Set the selected group to the newly created group
        setSelectedGroup(groupName);

        // Clear the group name and color state and hide the popup
        setGroupName("");
        setColor("");
        setShowPopup(false);
    }


    function handleGroupDelete(groupName) {
        // Remove the group from local storage
        localStorage.removeItem(groupName);

        // Remove the group from the groups state
        setGroups(groups.filter(group => group[0] !== groupName));

        // Clear the selected group state if the deleted group is the selected group
        if (selectedGroup === groupName) {
            setSelectedGroup(null);
        }
    }
    // function handleGroupSelect(groupName) {
    //     setSelectedGroup(groupName);

    // }
    const handleGroupSelect = (group) => {
        handleGroupClick(group)
        setSelectedGroup(group);
        setShowPopup(false);
    }

    return (
        <div className={styles.wrapper}>
            <p>Pocket Notes</p>
            <button className={styles.button} onClick={togglePopup}>
                {showPopup ? "-" : "+"} Create Notes
            </button>
            {showPopup && (
                <div className={styles.popup}>
                    <div className={styles.popupHeader}>
                        <h1>Create New Notes</h1>
                    </div>
                    <div className={styles.popupBody}>
                        <div className={styles.inputWrapper}>
                            <label className={styles.label}>
                                Group Name
                            </label>
                            <input
                                id={styles.groupName}
                                type="text"
                                placeholder="Enter your group name"
                                value={groupName}
                                onChange={handleGroupNameChange}
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.inputWrapper}>
                            <label className={styles.label}>Choose Color</label>
                            <div className={styles.circlesWrapper}>
                                {COLORS.map((selectedColor) => (
                                    <div
                                        key={selectedColor}
                                        className={`${styles.circle} ${styles[`circle${COLORS.indexOf(selectedColor) + 1}`]}`}
                                        style={{ backgroundColor: selectedColor }}
                                        onClick={() => handleColorChange(selectedColor)}
                                    ></div>
                                ))}
                            </div>
                        </div>
                        <button onClick={handleSave} className={styles.saveButton}>
                            Create
                        </button>
                    </div>
                </div>
            )}

            {/* Render the list of saved groups */}
            <div className={styles.savedGroups}>
                {groups.map(([groupName, groupData]) => (
                    <div
                        key={groupName}
                        className={styles.groupItem}
                        onClick={() => handleGroupSelect([groupName, groupData])}
                    >

                        <div
                            className={styles.circle}
                            style={{ backgroundColor: JSON.parse(groupData).color }}
                        >
                            {getInitials(groupName)}
                        </div>
                        <span className={styles.groupName}>{groupName}</span>
                        <button
                            className={`${styles.deleteButton} ${styles.small}`}
                            style={{ backgroundColor: "white" }}
                            onClick={() => handleGroupDelete(groupName)}
                        >
                            X
                        </button>
                    </div>
                ))}
            </div>

        </div>
    );
}