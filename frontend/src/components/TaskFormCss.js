import { makeStyles } from "@mui/styles"


// Create styles for the component
export const useStyles = makeStyles({

    // Main container
    root: {
        // Use flex layout
        display: "flex",

        // Keep content in the center
        justifyContent: "center",

        // Take full screen width
        width: "100%"
    },


    // Main content box
    box: {
        // Take full available width on small screens
        width: "100%",

        // Do not allow the box to become wider than 700px
        maxWidth: "700px",

        // Add space around the box
        margin: "20px auto",

        // Add space inside the box
        padding: "20px",

        // Include padding inside the box width
        boxSizing: "border-box"
    },


    // Page heading
    heading: {
        // Put heading text in the center
        textAlign: "center",

        // Add space below the heading
        marginBottom: "20px"
    },


    // Center content inside an element
    centerStyle: {
        // Use flex layout
        display: "flex",

        // Center content horizontally
        justifyContent: "center",

        // Center content vertically
        alignItems: "center"
    }

})