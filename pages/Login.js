import React from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import { TextInput, Button, Title, Banner,ActivityIndicator } from 'react-native-paper';
import { myStyles, myContainer } from '../helpers/myStyles'
import Header from '../components/navbar/Header'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux'
import authAction from '../redux/actions/authAction'

class LogIn extends React.Component {

    state = {
        visiblePassword: false,
        inputsValues: {
            email: "",
            contrasena: ""
        },
        error: "",
        visibleBanner: false,
        loadingRequest:false
    }

    componentDidMount(){
        this.props.navigation.addListener("focus",()=>{
            const initialState = {
                visiblePassword: false,
                inputsValues: {
                    email: "",
                    contrasena: ""
                },
                error: "",
                visibleBanner: false,
                loadingRequest:false
            };
            this.setState({...initialState});
        })
    }

    setError(anError) {
        this.setState({
            ...this.state,
            error: anError,
            visibleBanner: true
        })
    }

    readInput(field, value) {

        this.setState({
            ...this.state,
            inputsValues: {
                ...this.state.inputsValues,
                [field]: value
            }
        });
    }

    changeVisibilityPassword() {
        this.setState({
            ...this.state,
            visiblePassword: !this.state.visiblePassword
        })
    }

    setVisibilityBanner(value) {
        this.setState({
            ...this.state,
            visibleBanner: value
        })
    }
    setLoadingRequest(value) {
        this.setState({
            ...this.state,
            loadingRequest: value
        })
    }



    async send(objUser) {
        this.setError("");
        this.setVisibilityBanner(false);
        const fieldValues = Object.values(this.state.inputsValues);
        if (fieldValues.some(field => field === "")) {
            this.setError("All the fields must be filled")
            return null;
        }
        this.setLoadingRequest(true)
        const error = await this.props.logInUser(objUser)
        if (!error)
            return this.props.navigation.navigate("Home")
        
        this.setState({
            ...this.state,
            error:error,
            loadingRequest:false,
            visibleBanner:true
        })
    }

    render() {
        const { navigation } = this.props;
        return (
            <View style={[styles.stylePosition, myContainer.body]}>
                <Header openDrawer={navigation.openDrawer} />
                <Title style={[styles.styleTitle,]}> Log in to your account </Title>
                <View style={[styles.containerForm, myStyles.mt_5]}>
                    <Button
                        mode="contained"
                        onPress={() => console.log('Pressed')}
                        style={styles.styleBtnGoogle}
                        icon={() => (
                            <Image
                                source={require('../assets/Formularios/logoGoogle.png')}
                                style={{ width: 18, height: 18, }}
                            />
                        )}
                    >
                        LOG IN WITH GOOGLE
                    </Button>

                    <View style={[{ flexDirection: 'row', alignItems: 'center' }, myStyles.mt_3]}>
                        <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
                        <View>
                            <Title style={{ width: 50, textAlign: 'center' }}>Or</Title>
                        </View>
                        <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
                    </View>

                    <TextInput
                        label="Email"
                        mode="outlined"
                        value={this.state.inputsValues.email}
                        style={myStyles.mt_2}
                        onChangeText={(e) => this.readInput("email", e)}
                    />
                    <TextInput
                        label="Password"
                        mode="outlined"
                        value={this.state.inputsValues.contrasena}
                        style={myStyles.mt_2}
                        onChangeText={(e) => this.readInput("contrasena", e)}
                        secureTextEntry={!this.state.visiblePassword}
                        right={<TextInput.Icon name={this.state.visiblePassword ? "eye" : "eye-off"} onPress={() => this.changeVisibilityPassword()} />}
                    />


                    <Banner
                        visible={this.state.visibleBanner}
                        contentStyle={{margin:0,justifyContent:"center", alignItems: "center"}}
                        style={{ backgroundColor: "rgb(253, 236, 234)", color: "red", width: "100%" ,flexDirection:"row",marginTop:10}}
                        actions={[]}
                        icon = {()=><Icon
                            name="alert-circle-outline"
                            color="red"
                            size={30}
                            style={{alignSelf:"baseline"}}
                        />}
                    >   
                        {this.state.error}
                    </Banner>


                    <Button
                        mode="contained"
                        onPress={!this.state.loadingRequest && (() => this.send(this.state.inputsValues))}
                        style={[myStyles.mt_3, myStyles.w_auto]}
                        icon= {this.state.loadingRequest? ()=> <ActivityIndicator color="white"/>:"" }
                        
                    >
                        LOG IN !
                    </Button>

                    <Text style={[myStyles.mt_3, myStyles.mx_3, myStyles.text_center]} >Don't have an account? </Text>
                    {/*el segundo parametro es para que le llegue por props en  props.route.params.unaPropiedad*/}
                    <Button onPress={() => this.props.navigation.navigate("SignUp", { unaPropiedad: "algo" })} >
                        <Text style={styles.callToActionForm}>Sign up </Text>
                    </Button>

                </View>
                
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containerForm: {
        padding: "3%",
        marginTop: "3%",
        width: "40%",
        minWidth: 270,
        minHeight: "40%",
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
        justifyContent: "center",
    },
    stylePosition: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,

    },
    styleBtnGoogle: {
        backgroundColor: "#343a40",
        color: "white",
    },
    styleTitle: {
        color: "white",
        fontSize: 32
    },
    callToActionForm: {
        textDecorationLine: 'underline',
        color: "rgb(116,204,223)",
        textAlign: "center"
    }
});

const mapDispatchToProps = {
    logInUser: authAction.logInUser
}

export default connect(null, mapDispatchToProps)(LogIn);


/*<View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
    <Icon
        name="alert-circle-outline"
        color="red"
        size={30}
    />
    {<Text style={{marginLeft:10,flexWrap}}>{this.state.error}</Text>}
    <View style={{ marginLeft: 10, flex: 1, backgroundColor: "green", flexWrap: "wrap" }}>
        <Text >Please provide a valid email and password</Text>
    </View>

</View>*/