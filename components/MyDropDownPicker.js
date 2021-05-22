import DropDownPicker from 'react-native-dropdown-picker';
import {useState} from 'react'
import {FlatList} from 'react-native'
import React from 'react'


const MyDropDownPicker = (props) =>{
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);

    let countries = props.countries.map(country=>{ 
        return {label:country,value:country }
    })
    countries.push({label:"Choose a Country",value:""})
    const [items, setItems] = useState(countries);


    return (
        
        <DropDownPicker
            open={open}
            placeholder="Choose a Country"
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            onChangeValue = {()=>props.cambio("pais",value)}
            
        />
    );
}

export default MyDropDownPicker;