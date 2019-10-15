import { StyleSheet } from 'react-native';
import { PRIMARY_COLOR } from "../const"
const PRIMARYCOLOR = PRIMARY_COLOR;
const SECONDARYCOLOR = "white";

export default styles = StyleSheet.create({
    // Login
    loginMain: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    loginViewContent: {
        backgroundColor: "white",
        width: '90%',
        height: 300,
        borderRadius: 30,
        padding: 10
    },
    loginViewLogo: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    // SIDEBAR
    sidebar: {
        backgroundColor: SECONDARYCOLOR
    },
    sidebarProfile: {
        color: SECONDARYCOLOR,
        fontSize: 20,
    },
    sidebarProfileView: {
        flex: 0.5,
        justifyContent: "center",
        alignItems: "center"
    },
    sidebarProfileThumbnail: {
        width: 150,
        height: 150,
        borderRadius: 150 / 2,
        borderColor: "white",
        borderWidth: 2
    },
    listItemSelected: {
        backgroundColor: PRIMARY_COLOR
    },
    listTextSelected: {
        color: "#fafafa",
        fontWeight: "bold"
    },

    listTextUnselected: {
        color: PRIMARY_COLOR
    },
    icon: {
        color: PRIMARY_COLOR
    },
    // HEADER
    header: {
        backgroundColor: PRIMARYCOLOR,
        borderBottomWidth: 0,
        shadowOpacity: 0
    },
    //MAIN
    main: {
        backgroundColor: SECONDARYCOLOR,
        flex: 1
    },
    mainContent: {
        padding: 10
    },
    // GENERAL
    modalWhite: {
        backgroundColor: "white"
    },  
    modalSmall: {
        // flex: 0.5, 
        height: 350,
        backgroundColor: "white",
        borderRadius: 10
    },
    textSecondary: {
        color: SECONDARYCOLOR
    },
    textPrimary: {
        color: PRIMARYCOLOR
    },
    formItems: {
        marginBottom: 5,
        marginTop: 5,
        backgroundColor: "white"
    },
    backgroundPrimary: {
        backgroundColor: PRIMARYCOLOR
    },
    SquareShapeView: {
        width: "45%",
        height: 130,
        // backgroundColor: '#00BCD4',
        // borderColor: PRIMARYCOLOR,
        borderWidth: 0.1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
})
