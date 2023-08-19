const { makeStyles } = require("@material-ui/styles")

export const useStyles = makeStyles({

    //Login container
    loginContainer: {
        height: "100vh",
        width: "100vw",
        backgroundColor: "rgb(193 146 146 / 30%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "25px"

    },

    loginSection: {
        height: "25em",
        width: "25em",
        backgroundColor: "#FFFFFF",
        borderRadius: "20px",
        display: "flex",
        flexDirection: "column",
        // gap: "2em"
    },

    loginSectionLogo: {
        height: "25%",
        paddingTop: "1em"
    },

    loginSectionLogoImg: {
        objectFit: "contain",
        width: "100%",
        height: "100%",
        padding: "0.4em"
    },

    loginSectionInputs: {
        height: "70%",
        width: "80%",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        // alignItems: "center",
        justifyContent: "space-evenly",
        // paddingBottom: "2em"
    },

    loginSectionInputsBtn: {
        boxShadow: "none",
        height: "3em",
        width: "10em",
        display: "flex",
        alignSelf: "center",
    }
});