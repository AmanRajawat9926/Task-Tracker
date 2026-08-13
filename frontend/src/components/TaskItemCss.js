import { makeStyles } from "@mui/styles"


// Create styles for the task item
export const useStyles = makeStyles({

    // Main task container
    root: {
        // Take full available width
        width: "100%",

        // Include padding and border inside the width
        boxSizing: "border-box",

        // Add space below each task
        marginBottom: "16px"
    },


    // Task box style
    taskBox: {
        // Take full available width
        width: "100%",

        // Add space inside the task box
        padding: "16px",

        // Keep padding inside the box width
        boxSizing: "border-box",

        // Add a light border around the task
        border: "1px solid #ddd",

        // Make the corners rounded
        borderRadius: "8px",

        // Center items vertically
        alignItems: "center"
    },


    // Center content horizontally and vertically
    centerStyle: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },


    // Style for completed tasks
    completed: {
        // Show a line through completed task title
        textDecoration: "line-through",

        // Break long words to avoid overflow
        wordBreak: "break-word"
    },


    // Style for task description
    description: {
        // Break long words to avoid overflow
        wordBreak: "break-word",

        // Add small space above description
        marginTop: "4px"
    },


    // Style for task creation date
    date: {
        // Add space above the date
        marginTop: "8px"
    },


    // Style for Edit and Delete buttons
    buttonGroup: {
        // Use flex layout
        display: "flex",

        // Center buttons horizontally
        justifyContent: "center",

        // Center buttons vertically
        alignItems: "center",

        // Add space between buttons
        gap: "8px"
    }

})