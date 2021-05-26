import React from 'react'
import { View, StyleSheet, Text, Image, ScrollView,FlatList, SafeAreaView } from 'react-native'
import { TextInput, Button, Title, ActivityIndicator, HelperText } from 'react-native-paper';
import { myStyles, myContainer } from '../helpers/myStyles'
import axios from 'axios'
import MyDropDownPicker from '../components/MyDropDownPicker'
import Header from '../components/navbar/Header'
import signUpUser from '../redux/actions/authAction'
import { connect } from 'react-redux'
import authActions from '../redux/actions/authAction';

import { LogBox } from 'react-native';



class SignUp extends React.Component {

    state = {
        loadingCountries: true,
        loadingRequest: false,
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
    async componentDidMount() {
        try {
            let { data } = await axios.get("https://restcountries.eu/rest/v2/all");
            let countries = data.map(country => country.name);
            this.setState({
                ...this.state,
                loadingCountries: false,
                countries
            })

        } catch (error) {
            this.setState({
                ...this.state,
                loadingCountries: false,
                errorCountries500: true,
            })
            console.log(error)
        }
        this.props.navigation.addListener("focus", () => {
            this.setState({
                ...this.state,
                loadingCountries: false,
                loadingRequest: false,
                visiblePassword: false,
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
            })
        })
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

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
        })

    }

    setLoadingRequest(value) {
        this.setState({
            ...this.state,
            loadingRequest: value
        })
    }
    async send(objUser) {

        let fields = Object.keys(this.state.inputsValues);
        let hasEmptyFields = false;
        let newError = { ...this.state.error };
        fields.forEach(field => {
            const isEmpty = field !== "pais" && objUser[field] === "";
            hasEmptyFields = isEmpty ? true : hasEmptyFields;
            /*this.iterableSetError(field, isEmpty ? "This field is required" : "")*/
            newError[field] = isEmpty ? "This field is required" : ""

        })
        if (hasEmptyFields) {
            this.setState({
                ...this.state,
                error: newError
            })
            return null;
        } else {
            this.setState({
                ...this.state,
                error: newError,
                loadingRequest: true
            })
        }
        let errors = await this.props.signUpUser({
            ...objUser,
            nombre: objUser.nombre.trim(),
            apellido: objUser.apellido.trim()
        });

        if (errors) {
            errors.forEach(anError => this.iterableSetError(anError.label, anError.message));
            this.setLoadingRequest(false);
        } else {
            this.props.navigation.navigate("Cities");
        }
    }


    render() {
        const { mt_2, mt_3, mx_3, mb_3, mt_5, w_auto, text_center, flex_1, w_100, minWidth } = myStyles;
        const { navigation } = this.props;
        if (this.state.loadingCountries) {
            return (
                <View style={[styles.stylePosition, mt_3, myContainer.body]}>
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
            
            <ScrollView style={myContainer.scrollBody}>
                <View style={[styles.stylePosition, myContainer.body]}>
                    <Header openDrawer={navigation.openDrawer} />
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
                            error={this.state.error.nombre !== ""}
                            value={this.state.inputsValues.nombre}
                            onChangeText={(e) => this.readInput("nombre", e)}
                        />
                        <HelperText type="error" visible={true}> {this.state.error.nombre}</HelperText>
                        <TextInput
                            label="LastName"
                            mode="outlined"
                            style={mt_2}
                            value={this.state.inputsValues.apellido}
                            error={this.state.error.apellido !== ""}
                            onChangeText={(e) => this.readInput("apellido", e)}
                        />
                        <HelperText type="error" visible={true}> {this.state.error.apellido}</HelperText>
                        <TextInput
                            label="Email"
                            mode="outlined"
                            style={mt_2}
                            error={this.state.error.email !== ""}
                            value={this.state.inputsValues.email}
                            onChangeText={(e) => this.readInput("email", e)}
                        />
                        <HelperText type="error" visible={true}> {this.state.error.email}</HelperText>
                        <TextInput
                            label="Password"
                            mode="outlined"
                            style={mt_2}
                            secureTextEntry={!this.state.visiblePassword}
                            value={this.state.inputsValues.contrasena}
                            error={this.state.error.contrasena !== ""}
                            onChangeText={(e) => this.readInput("contrasena", e)}
                            right={<TextInput.Icon name={this.state.visiblePassword ? "eye" : "eye-off"} onPress={() => this.changeVisibilityPassword()} />}
                        />
                        <HelperText type="error" visible={true}> {this.state.error.contrasena}</HelperText>
                        <TextInput
                            label="Enter the URL of your picture"
                            mode="outlined"
                            value={this.state.inputsValues.usuarioAvatar}
                            style={[mt_2]}
                            onChangeText={(e) => this.readInput("usuarioAvatar", e)}
                            error={this.state.error.usuarioAvatar !== ""}
                        />
                        <HelperText type="error" visible={true} style={mb_3}> {this.state.error.usuarioAvatar}</HelperText>
                        <MyDropDownPicker countries={this.state.countries} cambio={this.readInput.bind(this)}  />
                        
                        <Button
                            mode="contained"
                            onPress={!this.state.loadingRequest && (() => this.send(this.state.inputsValues))}
                            style={[myStyles.mt_3, myStyles.w_auto]}
                            icon={this.state.loadingRequest ? () => <ActivityIndicator color="white" /> : ""}
                        >
                            SIGN UP !
                        </Button>

                        <Text style={[mt_3, mx_3, text_center]} >Have an account?</Text>
                        <Button onPress={() => this.props.navigation.navigate("LogIn")}>
                            <Text style={styles.callToActionForm}>Log In </Text>
                        </Button>

                    </View>
                </View>
                <View style={{ height: 20 }} />
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({

    stylePosition: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    styleBtnGoogle: {
        backgroundColor: "#343a40",
        color: "white",
    },
    styleTitle: {
        color: "white",
        fontSize: 32,
        marginTop: 10,

    },
    callToActionForm: {
        textDecorationLine: 'underline',
        color: "rgb(116,204,223)",
        textAlign: "center"
    }
})
const mapDispatchToProps = {
    signUpUser: authActions.signUpUser
}

export default connect(null, mapDispatchToProps)(SignUp);