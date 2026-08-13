import { makeStyles } from "@mui/styles"
export const useStyles = makeStyles({

    root: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        boxSizing: "border-box"
    },

    box: {
        width: "100%",
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "24px",
        boxSizing: "border-box"
    },

    heading: {
        marginBottom: "5px"
    },

    subtitle: {
        marginBottom: "20px"
    },

    filterBox: {
        margin: "20px 0"
    },

    message: {
        margin: "20px 0",
        textAlign: "center"
    }

})
