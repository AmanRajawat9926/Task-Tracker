import { Typography } from "@mui/material"
import { useStyles } from "./TaskListCss"
import TaskItem from "./TaskItem"


/**
 * Shows a list of tasks
 * @param {Array} tasks - List of tasks
 * @param {Function} onToggleTask - Function to change task status
 * @param {Function} onEditTask - Function to edit a task
 * @param {Function} onDeleteTask - Function to delete a task
 */
export default function TaskList({
    tasks,
    onToggleTask,
    onEditTask,
    onDeleteTask
}) {

    const classes = useStyles()


    // Check if there are no tasks
    if (tasks.length === 0) {
        return (
            <div className={classes.emptyBox}>

                {/* Show message when there are no tasks */}
                <Typography>
                    No tasks found in this view.
                </Typography>

            </div>
        )
    }


    return (
        <div className={classes.root}>

            {/* Loop through all tasks and show each task */}
            {tasks.map((task) => (

                <TaskItem
                    // Use task ID as a unique key
                    key={task.id}

                    // Send task data to TaskItem
                    task={task}

                    // Send toggle function to TaskItem
                    onToggle={onToggleTask}

                    // Send edit function to TaskItem
                    onEdit={onEditTask}

                    // Send delete function to TaskItem
                    onDelete={onDeleteTask}
                />

            ))}

        </div>
    )
}