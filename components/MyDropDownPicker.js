import DropDownPicker from 'react-native-dropdown-picker';
import {useState} from 'react'
import React from 'react'
import { Keyboard } from 'react-native';


const MyDropDownPicker = (props) =>{
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);

    
    const [items, setItems] = useState(props.countries.map(country=>{ 
        return {label:country,value:country }
    }));

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
            onBlur = {()=>{setOpen(!open);Keyboard.dismiss}}
        />
    );
}

export default MyDropDownPicker;