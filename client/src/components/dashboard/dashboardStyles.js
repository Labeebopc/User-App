const { makeStyles } = require("@material-ui/styles")

export const useStyles = makeStyles({
    dashboardContainer: {
        // border:"1px solid red",
        height: "100%",
    },

    userImageSection: {
        width: "80%",
        display: "flex",
        justifyContent: "center",
        margin: "auto",
        // height:"25%",
        marginTop: "2em"
    },

    userImg: {
        objectFit: "contain",
        width: "15%",
        height: "15%",
    },

    dashboardActions: {
        width: "80%",
        display: "flex",
        justifyContent: "space-around",
        margin: "auto",
        marginTop: "5em"
    },

    dashboardLogout: {
        width: "80%",
        display: "flex",
        justifyContent: "center",
        margin: "auto",
        marginTop: "3em"
    },

    deleteBtn: {
        '&:hover': { backgroundColor: 'red' },
    }
});