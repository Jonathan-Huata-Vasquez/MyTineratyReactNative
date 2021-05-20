import React from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import { TextInput, Button, Title, ActivityIndicator } from 'react-native-paper';
import { myStyles, myContainer } from '../helpers/myStyles'
import axios from 'axios'
import MyDropDownPicker from '../components/MyDropDownPicker'
class SignUp extends React.Component {

    state = {
        loading: true,
        errorCountries500: false,
        visiblePassword: false,
        countries: [],
        inputsValues: { //el backend esta adaptado para estos campos en español
            nombre: "",
            apellido: "",
            email: "",
            contrasena: "",
            usuarioAvatar: "",
            pais: ""
        },
        error: {
            nombre: "",
            apellido: "",
            email: "",
            contrasena: "",
            usuarioAvatar: "",
        }
    }

    iterableSetError(field, value) {
        //setState(updater, [callback])
        // La salida del updater se fusiona de forma superficial (shallow) con state.
        this.setState(currentState => {
            return {
                error: {
                    ...currentState.error,
                    [field]: value
                }
            }
        })
    }
    componentDidMount() {
        axios.get("https://restcountries.eu/rest/v2/all")
            .then(res =>  this.setState({
                ...this.state,
                loading: false,
                countries: res.data.map(country => country.name)
            }))
            .catch(error => {
                this.setState({
                    ...this.state,
                    loading: false,
                    errorCountries500: true,
                })
                console.log(error)
            })
            
    }

    changeVisibilityPassword() {
        this.setState({
            ...this.state,
            visiblePassword: !this.state.visiblePassword
        })
    }

    readInput(field, value) {
        
        this.setState({
            ...this.state,
            inputsValues: {
                ...this.state.inputsValues,
                [field]: value
            }
        },()=>console.log(this.state.inputsValues))
        
    }

    async send(objUser, withGoogle = false) {
        if (!withGoogle) {
            let fields = Object.keys(this.state.inputsValues);
            let hasEmptyFields = false;
            //
            fields.forEach(field => {
                const isEmpty = field !== "country" && objUser[field] === "";
                hasEmptyFields = isEmpty ? true : hasEmptyFields;
                this.iterableSetError(field, isEmpty ? "This field is required" : "")
            })
            if (hasEmptyFields) return null;
        }

        //Veo si hay erroes del backend
        let errors = await this.props.crearUsuario({
            ...objUser,
            nombre: objUser.firstName.trim(),
            apellido: objUser.lastName.trim()
        }, withGoogle);

        if (errors) {
            if (withGoogle) {
                //mostrarTostada("error",errors[0].message,"top-right");
            }
            else {
                errors.forEach(anError => this.iterableSetError(anError.label, anError.message))
            }
        }
    }
    responseGoogle(response) {
        //en caso de que el usuario cierre el popup
        if (!response.profileObj) return null;

        const userGoogle = response.profileObj
        this.send({
            nombre: userGoogle.givenName,
            apellido: userGoogle.familyName,
            email: userGoogle.email,
            contrasena: "google" + userGoogle.googleId + "myTinerary",
            usuarioAvatar: userGoogle.imageUrl,
            pais: ""
        }, true)
    }

    render() {
        const { mt_2, mt_3, mx_3,mb_3, mt_5, w_auto, text_center, flex_1, w_100, minWidth } = myStyles;

        if (this.state.loading) {
            return (
                <View style={[styles.stylePosition, mt_3]}>
                    {this.state.errorCountries500
                        ? <Title style={text_center}>Ups, please reload the page</Title>
                        : <View >
                            <Title style={text_center}>Loading...</Title>
                            <ActivityIndicator size="large" />
                        </View>

                    }
                </View>
            )
        }
        return (
            <View style={[styles.stylePosition, mt_3]}>
                <Title style={[styles.styleTitle]}> Log in to your account </Title>
                <View style={[mt_5, myContainer.container]}>
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
                        SIGN UP WITH GOOGLE
                    </Button>

                    <View style={[{ flexDirection: 'row', alignItems: 'center' }, myStyles.mt_3]}>
                        <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
                        <View>
                            <Title style={{ width: 50, textAlign: 'center' }}>Or</Title>
                        </View>
                        <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
                    </View>

                    <TextInput
                        label="FirstName"
                        mode="outlined"
                        style={mt_2}
                    />
                    <TextInput
                        label="LastName"
                        mode="outlined"
                        style={mt_2}
                    />
                    <TextInput
                        label="Email"
                        mode="outlined"
                        style={mt_2}
                    />
                    <TextInput
                        label="Password"
                        mode="outlined"
                        style={mt_2}
                        secureTextEntry={!this.state.visiblePassword}
                        right={<TextInput.Icon name={this.state.visiblePassword ? "eye" : "eye-off"} onPress={() => this.changeVisibilityPassword()} />}
                    />
                    <TextInput
                        label="Enter the URL of your picture"
                        mode="outlined"
                        style={ [mt_2,mb_3]}
                    />

                    <MyDropDownPicker  countries={this.state.countries} cambio={this.readInput.bind(this)} />

                    <Button
                        mode="contained"
                        onPress={() => console.log('Pressed')}
                        style={[mt_3, w_auto]}
                    >
                        SIGN UP !
                    </Button>

                    <Text style={[mt_3, mx_3, text_center]} >Have an account?</Text>
                    <Text style={styles.callToActionForm}>Log In </Text>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({

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
})


export default SignUp;