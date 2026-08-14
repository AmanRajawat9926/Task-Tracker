import { Checkbox, Typography, Button, Grid } from "@mui/material"
import { useStyles } from "./TaskItemCss"
import { formatDate } from "../utils/formatDate"


/**
 * Shows one task with its details and action buttons
 * @param {Object} task - Task data
 * @param {Function} onToggle - Function to change task status
 * @param {Function} onEdit - Function to edit the task
 * @param {Function} onDelete - Function to delete the task
 */
export default function TaskItem({ task, onToggle, onEdit, onDelete }) {

    const classes = useStyles()

    // Convert the task status into true or false
    const isCompleted = Boolean(task.isCompleted)


    return (
        <div className={classes.root}>

            <Grid container spacing={2} className={classes.taskBox}>

                <Grid size={{ xs: 12, sm: 1 }} className={classes.centerStyle}>

                    <Checkbox
                        // Show checked checkbox if task is completed
                        checked={isCompleted}

                        // Change task status when checkbox is clicked
                        onChange={() => onToggle(task.id, !isCompleted)}
                    />

                </Grid>


                <Grid size={{ xs: 12, sm: 7 }}>

                    <Typography
                        variant="h6"

                        // Add completed style when task is completed
                        className={isCompleted ? classes.completed : ""}
                    >
                        {task.title}
                    </Typography>


                    {/* Show description only if it exists */}
                    {task.description && (

                        <Typography className={classes.description}>
                            {task.description}
                        </Typography>

                    )}


                    <Typography
                        variant="body2"
                        color="text.secondary"
                        className={classes.date}
                    >
                        {/* Show the task creation date */}
                        Created: {formatDate(task.createdAt)}
                    </Typography>

                </Grid>


                <Grid size={{ xs: 12, sm: 4 }} className={classes.buttonGroup}>

                    <Button
                        // Send the current task to the edit function
                        onClick={() => onEdit(task)}
                        variant="outlined"
                    >
                        Edit
                    </Button>


                    <Button
                        // Send task ID to the delete function
                        onClick={() => onDelete(task.id)}
                        variant="contained"
                        color="error"
                    >
                        Delete
                    </Button>

                </Grid>

            </Grid>

        </div>
    )
}