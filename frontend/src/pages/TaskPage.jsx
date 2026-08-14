import { Typography, Button, Grid, Dialog, DialogTitle, DialogContent } from "@mui/material"
import { useStyles } from "./TaskPageCss"
import { useState, useEffect } from "react"
import Swal from "sweetalert2"

import TaskList from "../components/TaskList"
import TaskForm from "../components/TaskForm"

import {
    fetchTasks,
    createTask,
    updateTask,
    deleteTask
} from "../services/taskService"


/**
 * Shows the main task page
 * Handles tasks, filters, add, edit, complete and delete actions
 */
export default function TaskPage() {

    const classes = useStyles()

    // Store all tasks
    const [tasks, setTasks] = useState([])

    // Store the selected filter
    const [filter, setFilter] = useState("All")

    // Store the task that is being edited
    const [editingTask, setEditingTask] = useState(null)

    // Check if tasks are loading
    const [loading, setLoading] = useState(true)

    // Store error message
    const [error, setError] = useState(null)


    /**
     * Loads tasks when the page opens
     */
    useEffect(() => {
        loadTasks()
    }, [])


    /**
     * Gets all tasks from the server
     * @returns {Promise<void>} Loads tasks into the state
     */
    const loadTasks = async () => {
        try {

            // Show loading message
            setLoading(true)

            // Get tasks from the server
            const data = await fetchTasks()

            // Store tasks in state
            setTasks(data)

            // Clear old error
            setError(null)

        }
        catch (err) {

            // Store error message
            setError("Unable to fetch tasks.")

            // Show error popup
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Unable to fetch tasks from server."
            })

        }
        finally {

            // Stop loading after success or error
            setLoading(false)
        }
    }


    /**
     * Creates a new task or updates an existing task
     * @param {Object} formData - Task data from the form
     * @returns {Promise<void>} Saves the task
     */
    const handleSaveTask = async (formData) => {
        try {

            // Check if a task is being edited
            if (editingTask) {

                // Update the existing task
                const updated = await updateTask(
                    editingTask.id,
                    formData
                )

                // Replace the old task with the updated task
                setTasks(
                    tasks.map((t) =>
                        t.id === editingTask.id ? updated : t
                    )
                )

                // Exit edit mode
                setEditingTask(null)

                // Show success message
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Task updated successfully!",
                    showConfirmButton: false,
                    timer: 1500,
                    toast: true
                })
            }
            else {

                // Create a new task
                const newTask = await createTask(formData)

                // Show success message if task was created
                if (newTask) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: newTask.message || "Task created successfully",
                        showConfirmButton: false,
                        timer: 1500,
                        toast: true
                    })
                }

                // Add the new task at the beginning of the list
                setTasks([newTask, ...tasks])
            }

        }
        catch (err) {

            // Store error message
            setError("Failed to save task.")

            // Show error popup
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Failed to save task."
            })
        }
    }


    /**
     * Changes the completed status of a task
     * @param {number} id - Task ID
     * @param {boolean} isCompleted - New task status
     * @returns {Promise<void>} Updates the task status
     */
    const handleToggleTask = async (id, isCompleted) => {
        try {

            // Update only the completed status
            const updated = await updateTask(
                id,
                { isCompleted }
            )

            // Replace the old task with the updated task
            setTasks(
                tasks.map((t) =>
                    t.id === id ? updated : t
                )
            )

            // Show success or pending message
            Swal.fire({
                position: "center",
                icon: isCompleted ? "success" : "error",
                title: isCompleted
                    ? "Task Completed"
                    : "Task Marked Pending",
                showConfirmButton: false,
                timer: 1200,
                toast: true
            })

        }
        catch (err) {

            // Store error message
            setError("Failed to update task status.")

            // Show error popup
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to update task status."
            })
        }
    }


    /**
     * Deletes a task after user confirmation
     * @param {number} id - Task ID
     * @returns {Promise<void>} Deletes the selected task
     */
    const handleDeleteTask = async (id) => {

        // Ask the user before deleting the task
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmColor: "#d33",
            cancelColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        })


        // Continue only if user confirms
        if (result.isConfirmed) {
            try {

                // Delete task from the server
                await deleteTask(id)

                // Remove the task from the list
                setTasks(
                    tasks.filter((t) => t.id !== id)
                )

                // If deleted task was being edited, exit edit mode
                if (editingTask && editingTask.id === id) {
                    setEditingTask(null)
                }

                // Show success message
                Swal.fire({
                    icon: "success",
                    title: "Deleted!",
                    text: "Your task has been deleted.",
                    timer: 1500,
                    showConfirmButton: false
                })

            }
            catch (err) {

                // Store error message
                setError("Failed to delete task.")

                // Show error popup
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to delete task."
                })
            }
        }
    }


    /**
     * Starts edit mode for a task
     * @param {Object} task - Task to edit
     */
    const handleEditTask = (task) => {

        // Store the selected task for editing
        setEditingTask(task)
    }


    // Filter tasks based on selected status
    const filteredTasks = tasks.filter((task) => {

        // Convert task status into true or false
        const isCompleted = Boolean(task.isCompleted)


        // Show only completed tasks
        if (filter === "Completed") {
            return isCompleted
        }


        // Show only pending tasks
        if (filter === "Pending") {
            return !isCompleted
        }


        // Show all tasks
        return true
    })


    return (
        <div className={classes.root}>

            <div className={classes.box}>

                <h1
                    variant="h4"
                    className={classes.heading}
                >
                    Task Tracker
                </h1>


                <h2 className={classes.subtitle}>
                    Organize and monitor daily deliverables
                </h2>


                {/* Task form for adding and editing tasks */}
                <Dialog
    open={Boolean(editingTask)}
    onClose={() => setEditingTask(null)}
    fullWidth
    maxWidth="sm"
>
    <DialogTitle>
        Edit Task
    </DialogTitle>

    <DialogContent>
        <TaskForm
            onSubmit={handleSaveTask}
            taskToEdit={editingTask}
            onCancelEdit={() => setEditingTask(null)}
        />
    </DialogContent>
</Dialog>


                <div className={classes.filterBox}>

                    <h2 variant="h6">
                        Status Filter
                    </h2>


                    <Grid container spacing={1}>

                        {/* Create filter buttons */}
                        {["All", "Pending", "Completed"].map((status) => (

                            <Grid key={status}>

                                <Button
                                    // Change the selected filter
                                    onClick={() => setFilter(status)}

                                    // Highlight the selected filter
                                    variant={
                                        filter === status
                                            ? "contained"
                                            : "outlined"
                                    }
                                >
                                    {status}
                                </Button>

                            </Grid>

                        ))}

                    </Grid>

                </div>


                {/* Show loading message while tasks are loading */}
                {loading ? (

                    <Typography className={classes.message}>
                        Loading tasks from database...
                    </Typography>

                ) : (

                    // Show the filtered task list
                    <TaskList
                        tasks={filteredTasks}
                        onToggleTask={handleToggleTask}
                        onEditTask={handleEditTask}
                        onDeleteTask={handleDeleteTask}
                    />
                )}


                {/* Show error message if there is an error */}
                {error && (
                    <Typography
                        color="error"
                        className={classes.message}
                    >
                        {error}
                    </Typography>
                )}

            </div>

        </div>
    )
}