const { makeStyles } = require("@material-ui/styles")

export const useStyles = makeStyles({
    editProfileModalContainer: {
        position: "absolute",
        left: "50%",
        padding: "25px 25px 0 25px",
        backgroundColor: "#FFFFFF",
        width: "30em",
        height: "23em",
        borderRadius: "5px",
        top: "50%",
        transform: "translate(-50%,-50%)",
        display: "flex",
        flexDirection: "column",
        gap: "5px",
        border: "none"
    },

    editProfileModalSection: {
        marginTop: "1em",
        display: "flex",
        flexDirection: "column",
        gap: "10px"
    },

    editProfileModalSectionBtn: {
        padding: "10px",
        display: "flex",
        justifyContent: "space-around"
    },

});