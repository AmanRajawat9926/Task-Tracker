import { TextField, Grid, Button } from "@mui/material"
import { useStyles } from "./TaskFormCss"
import { useState, useEffect } from "react"

export default function TaskForm({ onSubmit, taskToEdit, onCancelEdit }) {

    const classes = useStyles()

    // Store task title
    const [title, setTitle] = useState("")

    // Store task description
    const [description, setDescription] = useState("")

    // Check if the form is in edit mode
    const [editMode, setEditMode] = useState(false)

    // Store the ID of the task being edited
    const [editId, setEditId] = useState("")

    // Store error messages for each input
    const [error, setError] = useState({
        title: "",
        description: ""
    })


    /**
     * Loads task data into the form when editing
     * @param {Object} taskToEdit - Task that needs to be edited
     */
    useEffect(() => {

        // If a task is selected for editing
        if (taskToEdit) {

            // Put old task data into the input fields
            setTitle(taskToEdit.title || "")
            setDescription(taskToEdit.description || "")

            // Store the task ID
            setEditId(taskToEdit.id)

            // Turn on edit mode
            setEditMode(true)

        } else {

            // Clear the form when there is no task to edit
            setTitle("")
            setDescription("")
            setEditId("")
            setEditMode(false)
        }

    }, [taskToEdit])


    /**
     * Sets or clears an error message
     * @param {string} label - Name of the input field
     * @param {string} message - Error message to show
     */
    const handleError = (label, message) => {

        // Update only the selected error field
        setError((prev) => ({
            ...prev,
            [label]: message
        }))

        // Show current error in console
        console.log('Error', error)
    }


    /**
     * Checks if the form data is valid
     * @returns {boolean} True if there is an error, otherwise false
     */
    const validate = () => {

        // Store whether any error is found
        var error = false

        // Check if title is empty
        if (title.trim().length === 0) {

            // Show title error
            handleError("title", "Task title should not be empty...")

            // Mark form as invalid
            error = true
        }

        // Check if description is empty
        if (description.trim().length === 0) {

            // Show description error
            handleError("description", "Task description should not be empty...")

            // Mark form as invalid
            error = true
        }

        // Return true if there is any error
        return error
    }


    /**
     * Handles form submission
     * @returns {Promise<void>} Sends task data to the parent component
     */
    const handleSubmit = async () => {

        // Validate the form before submitting
        var status = validate()

        // Continue only if there is no error
        if (status === false) {

            // Create an object with task data
            var taskData = {
                // Remove extra spaces from title
                title: title.trim(),

                // Remove extra spaces from description
                description: description.trim()
            }

            // Add task ID when editing an existing task
            if (editMode) {
                taskData.id = editId
            }

            // Send task data to the parent component
            await onSubmit(taskData)

            // Clear the form after submission
            resetData()
        }
    }


    /**
     * Clears the form and resets its state
     */
    const resetData = () => {

        // Clear title input
        setTitle("")

        // Clear description input
        setDescription("")

        // Turn off edit mode
        setEditMode(false)

        // Clear task ID
        setEditId("")

        // Clear all error messages
        setError({
            title: "",
            description: ""
        })

        // Tell the parent component to cancel edit mode
        if (onCancelEdit) {
            onCancelEdit()
        }
    }


    return (
        <div className={classes.root}>

            <div className={classes.box}>

                {/* Show different heading for add and edit mode */}
                <h2 className={classes.heading}>
                    {editMode ? "Edit Task" : "Add New Task"}
                </h2>

                <div style={{ margin: 10, width: "96.7%" }}>

                    <Grid spacing={2} container>

                        <Grid size={12}>

                            <TextField
                                // Clear title error when user clicks on the input
                                onFocus={() => handleError("title", "")}

                                // Show title error below the input
                                helperText={error.title}

                                // Show red error style if there is an error
                                error={Boolean(error.title)}

                                // Set the input value from state
                                value={title}

                                // Update title when user types
                                onChange={(e) => setTitle(e.target.value)}

                                fullWidth
                                label="Task Title"
                                variant="outlined"
                            />

                        </Grid>


                        <Grid size={12}>

                            <TextField
                                // Clear description error when user clicks on the input
                                onFocus={() => handleError("description", "")}

                                // Show description error below the input
                                helperText={error.description}

                                // Show red error style if there is an error
                                error={Boolean(error.description)}

                                // Set the input value from state
                                value={description}

                                // Update description when user types
                                onChange={(e) => setDescription(e.target.value)}

                                fullWidth
                                multiline
                                rows={4}
                                label="Task Description"
                                variant="outlined"
                            />

                        </Grid>


                        <Grid size={6} className={classes.centerStyle}>

                            <Button
                                // Submit the form when clicked
                                onClick={handleSubmit}

                                fullWidth
                                variant="contained"
                            >
                                {/* Show Update in edit mode, otherwise Save */}
                                {editMode ? "Update" : "Save"}
                            </Button>

                        </Grid>


                        <Grid size={6} className={classes.centerStyle}>

                            <Button
                                // Reset or cancel the form
                                onClick={resetData}

                                fullWidth
                                variant="outlined"
                            >
                                {/* Show Cancel in edit mode, otherwise Reset */}
                                {editMode ? "Cancel" : "Reset"}
                            </Button>

                        </Grid>

                    </Grid>

                </div>

            </div>

        </div>
    )
}