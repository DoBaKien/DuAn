import axios from "axios";
import { useEffect, useState } from "react";
import { Text, View, Button } from "react-native";
import React from 'react';

function Api() {
    const [location, setLocation] = useState("")
    const [count, setCount] = useState(0);
    useEffect(() => {
        axios.get('http://localhost:50314/Api/SangTaiChuyenLuoi/')
            .then(function (response) {

                setLocation(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [])


    // useEffect(() => {
    //     // const intervalId = setInterval(() => {
    //     //     axios.put('http://10.170.215.5:8001/location/1', {
    //     //         latitude: "232",
    //     //         longitude: "ews",
    //     //         command: 'stop'
    //     //     })

    //     //     setCount(count + 1);


    //     // }, 2000);


    //     return () => clearInterval(intervalId);
    // }, [count]);

    return (
        <View style={{ justifyContent: "center", alignItems: "center", height: "100%" }}>
            <Text style={{ fontSize: 30 }}>latitude: {location.latitude}</Text>
            <Text style={{ fontSize: 30 }}>longitude: {location.longitude}</Text>
            <Button
                title="Press me"
                onPress={() => Alert.alert('Simple Button pressed')}
            />
        </View>
    );
}

export default Api;