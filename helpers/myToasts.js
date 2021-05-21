export const toastMessageError500 = ()=>{
    Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error 500',
        text2: 'Ups something went wrong',
        visibilityTime: 4000,
        autoHide: true,
    });
}

export const showToastMessage = (type,text1) =>{
    Toast.show({
        type,
        position: 'top',
        text1,
        visibilityTime: 4000,
        autoHide: true,
    });
}