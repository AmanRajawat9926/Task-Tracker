import { makeStyles } from "@mui/styles"


// Create styles for the task list
export const useStyles = makeStyles({

    // Main task list container
    root: {
        // Take full available width
        width: "100%",

        // Add space inside the container
        padding: "16px",

        // Keep padding inside the width
        boxSizing: "border-box"
    },


    // Style for the empty task message
    emptyBox: {
        // Take full available width
        width: "100%",

        // Put the message in the center
        textAlign: "center",

        // Add space around the message
        padding: "24px",

        // Keep padding inside the width
        boxSizing: "border-box"
    }

})