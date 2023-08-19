const { makeStyles } = require("@material-ui/styles")

export const useStyles = makeStyles({
    registrationContainer: {
        height: "100vh",
        width: "100vw",
        backgroundColor: "rgb(193 146 146 / 30%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "25px"

    },

    registrationSection: {
        height: "27em",
        width: "32em",
        backgroundColor: "#FFFFFF",
        borderRadius: "20px",
        display: "flex",
        flexDirection: "column",
        // gap: "2em"
    },

    registrationSectionLogo: {
        height: "20%",
        paddingTop: "1em"
    },

    registrationSectionLogoImg: {
        objectFit: "contain",
        width: "100%",
        height: "100%",
        padding: "0.4em"
    },

    registrationForm: {
        marginTop: "1em",
        display: "flex",
        flexDirection: "column",
        margin: "auto",
        gap: "10px",
        padding:"20px"
    },

    registrationFormRow: {
        display: "flex",
        justifyContent:"space-between",
    },

    inputs: {
        width: "49%"
    },

    registerBtn: {
        boxShadow: "none",
        height: "3em",
        width: "10em",
        display: "flex",
        alignSelf: "center",
        
    }
})