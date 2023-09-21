import axios from "axios";
import { useEffect, useState } from "react";
import { Text, View, Button } from "react-native";
import React from 'react';

function Api() {
    const [location, setLocation] = useState("")
    const [countdown1, setCountDown1] = useState(60)
    useEffect(() => {
        axios.get(`http://10.170.215.5:8000/Api/SangTaiChuyenLuoi/find?id=${1}`)
            .then(function (response) {
                setLocation(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [])

    useEffect(() => {
        const time1 = setTimeout(() => {
            if (countdown1 > 0) {
                setCountDown1(countdown1 - 1)
            } else {
                setCountDown1(60)
            }

        }, 1000)
        return () => clearInterval(time1)
    }, [countdown1])

    useEffect(() => {
        const intervalId = setInterval(() => {
            axios.post(`http://10.170.215.5:8000/Api/SangTaiChuyenLuoi/update`, {
                CUSTOMER_ID: 1,
                LATITUDE: "310.222",
                LONGITUDE: "320.222"
            })
                .then(function (response) {
                    setLocation(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }, 60000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <View style={{ justifyContent: "center", alignItems: "center", height: "100%" }}>
            <Text style={{ fontSize: 30 }}>latitude: {location.LATITUDE}</Text>
            <Text style={{ fontSize: 30 }}>longitude: {location.LONGITUDE}</Text>
            <Text>{countdown1}</Text>
        </View>
    );
}

export default Api;