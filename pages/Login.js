import React from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import { TextInput, Button, Title, } from 'react-native-paper';
import {myStyles,myContainer} from '../helpers/myStyles'
import Header from '../components/navbar/Header'
class LogIn extends React.Component {

    state = {
        visiblePassword: false,
        inputsValues: {
            email: "",
            contrasena: ""
        },
        error: ""
    }
    setError(anError) {
        this.setState({
            ...this.state,
            error: anError
        })
    }

    readInput(e) {
        this.setState({
            ...this.state,
            inputsValues: {
                ...this.state.inputsValues,
                [e.target.name]: e.target.value
            }
        });
    }

    changeVisibilityPassword() {
        this.setState({
            ...this.state,
            visiblePassword: !this.state.visiblePassword
        })
    }

    responseGoogle(response) {
        if (!response.profileObj) {//en caso de que el usuario cierre el popup
            console.log(response)
            return null;
        }
        const userGoogle = response.profileObj;
        this.send({
            email: userGoogle.email,
            password: "google" + userGoogle.googleId + "myTinerary",
        }, true)
    }

    async send(objUsuario, withGoogle = false) {
        this.setError("");
        if (!withGoogle) {
            const fieldValues = Object.values(this.state.inputsValues);
            if (fieldValues.some(field => field === "")) {
                this.setError("All the fields must be filled")
                return null;
            }
        }

        //Envio los datos y en caso de errores de validaciones, lo trato
        const error = await this.props.loguearUsuario(objUsuario)
        if (!error)
            return null

        if (withGoogle) {
            /*toast.error("This google account is not registered", {
                position: "top-right",
                autoClose: 3500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });*/
        } else {
            this.setError(error);
        }
    }

    render() {
        const {navigation} = this.props;
        return (
            <View style={[styles.stylePosition,myContainer.body]}>
                <Header openDrawer={navigation.openDrawer}/>
                <Title style={[styles.styleTitle,]}> Log in to your account </Title>
                <View style={[styles.containerForm,myStyles.mt_5]}>
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

                    <View style={[{ flexDirection: 'row', alignItems: 'center' },myStyles.mt_3]}>
                        <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
                        <View>
                            <Title style={{ width: 50, textAlign: 'center' }}>Or</Title>
                        </View>
                        <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
                    </View>

                    <TextInput
                        label="Email"
                        mode="outlined"
                        style={myStyles.mt_2}
                    />
                    <TextInput
                        label="Password"
                        mode="outlined"
                        style={myStyles.mt_2}
                        secureTextEntry={!this.state.visiblePassword}
                        right={<TextInput.Icon name={this.state.visiblePassword ? "eye" : "eye-off"} onPress={() => this.changeVisibilityPassword()} />}
                    />
                    <Button
                        mode="contained"
                        onPress={() => console.log('Pressed')}
                        style={[myStyles.mt_3,myStyles.w_auto]}
                    >
                        LOG IN !
                    </Button>
                    
                    <Text style={[myStyles.mt_3,myStyles.mx_3,myStyles.text_center]} >Don't have an account? </Text>
                    {/*el segundo parametro es para que le llegue por props en  props.route.params.unaPropiedad*/}
                    <Button   onPress={() => this.props.navigation.navigate("SignUp",{unaPropiedad:"algo"})}> 
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
        justifyContent:"center",
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
    callToActionForm:{
        textDecorationLine : 'underline',
        color: "rgb(116,204,223)",
        textAlign:"center"
    }
});

export default LogIn;