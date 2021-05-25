import { StyleSheet } from 'react-native'


export const myStyles = StyleSheet.create({
    w_100: { width: "100%" },
    w_75: { width: "75%" },
    w_25: { width: "25%" },
    minWidth: (aWidth) => { return { minWidth: aWidth } },

    //margin
    m_1: { margin: 4 },
    m_2: { margin: 8 },
    m_3: { margin: 12 },
    m_4: { margin: 16 },
    m_5: { margin: 20 },

    mt_1: { marginTop: 4 },
    mt_2: { marginTop: 8 },
    mt_3: { marginTop: 12 },
    mt_4: { marginTop: 16 },
    mt_5: { marginTop: 20 },

    mb_1: { marginBottom: 4 },
    mb_2: { marginBottom: 8 },
    mb_3: { marginBottom: 12 },
    mb_4: { marginBottom: 16 },
    mb_5: { marginBottom: 20 },

    mx_1: { marginHorizontal: 4 },
    mx_2: { marginHorizontal: 8 },
    mx_3: { marginHorizontal: 12 },
    mx_4: { marginHorizontal: 16 },
    mx_5: { marginHorizontal: 20 },

    my_1: { marginVertical: 4 },
    my_2: { marginVertical: 8 },
    my_3: { marginVertical: 12 },
    my_4: { marginVertical: 16 },
    my_5: { marginVertical: 20 },

    w_auto: { alignSelf: 'center' },

    //padding

    p_1: { padding: 4 },
    p_2: { padding: 8 },
    p_3: { padding: 12 },
    p_4: { padding: 16 },
    p_5: { padding: 20 },

    pt_1: { paddingTop: 4 },
    pt_2: { paddingTop: 8 },
    pt_3: { paddingTop: 12 },
    pt_4: { paddingTop: 16 },
    pt_5: { paddingTop: 20 },

    pb_1: { paddingBottom: 4 },
    pb_2: { paddingBottom: 8 },
    pb_3: { paddingBottom: 12 },
    pb_4: { paddingBottom: 16 },
    pb_5: { paddingBottom: 20 },

    px_1: { paddingHorizontal: 4 },
    px_2: { paddingHorizontal: 8 },
    px_3: { paddingHorizontal: 12 },
    px_4: { paddingHorizontal: 16 },
    px_5: { paddingHorizontal: 20 },

    py_1: { paddingVertical: 4 },
    py_2: { paddingVertical: 8 },
    py_3: { paddingVertical: 12 },
    py_4: { paddingVertical: 16 },
    py_5: { paddingVertical: 20 },



    //align text
    text_center: { textAlign: "center" },

    //flexbox
    flex_1: { flex: 1 }
})

export const myContainer = StyleSheet.create({
    container: {
        padding: "3%",
        marginTop: "3%",
        width: "80%",
        minWidth: 270,
        //boxShadow: 8 8 10 rgb(0 0 0 / 43 %),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.50,
        shadowRadius: 12.35,
        elevation: 19,
        backgroundColor: "hsla(0, 0%, 100%, 0.884)",
        textAlign: "center",
        borderRadius: 6,
        justifyContent:"center",
        
    },

    body: {
        backgroundColor: "#343a40",
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        color:"white",
        paddingTop:40,
        
        paddingBottom:30,
        width:"100%"
    },
    scrollBody:{
        backgroundColor: "#343a40",
        flex:1,
        color:"white"
    },
    backgroundMainColor :{
        backgroundColor: "#343a40",
    }
})