import { Modal, Pressable, Text, View, StyleSheet, TextInput, Image, TouchableOpacity, FlatList } from "react-native";
import React, { useState } from 'react';
import { launchCamera } from 'react-native-image-picker';

function ModalDone(props) {


    const [imagesB, setImagesB] = useState([]);
    const [imagesA, setImagesA] = useState([]);

    const pickImageCam = async (id) => {
        let result = await launchCamera({
            allowsEditing: true,
        });
        if (!result.cancelled) {
            if (id === "B") {
                const newImages = [...imagesB, result.assets[0].uri];
                setImagesB(newImages);

            } else if (id === "A") {
                const newImages = [...imagesA, result.assets[0].uri];
                setImagesA(newImages);

            }
        }
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.modalVisible}
            onRequestClose={() => {
                props.setModalVisible(!props.modalVisible);
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nhập nguyên nhân..."
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Nhập cách xử lý..."
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Nhập kết quả xử lý..."
                    />
                    <View style={styles.viewImage}>
                        <View style={{ width: "40%" }}>
                            <View>
                                <FlatList
                                    data={imagesB}
                                    renderItem={({ item }) => <Image source={{ uri: item }} style={styles.image} />}
                                    horizontal={true}
                                />
                            </View>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => pickImageCam("B")}
                            >
                                <Text style={styles.textStyle}>Hình ảnh trước</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ width: "40%" }}>
                            <View>
                                <FlatList
                                    data={imagesA}
                                    renderItem={({ item }) => <Image source={{ uri: item }} style={styles.image} />}
                                    horizontal={true}
                                />
                            </View>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => pickImageCam("A")}
                            >
                                <Text style={styles.textStyle}>Hình ảnh sau</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder="Nhập kết quả xử lý..."
                    />
                    <Pressable
                        style={styles.button}
                        onPress={() => props.setModalVisible(!props.modalVisible)}>
                        <Text style={styles.textStyle}>Hoàn thành sửa điện</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
}
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalView: {
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: "100%"
    },
    button: {
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: '90%',
    },
    viewImage: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: "90%"
    },
    image: {
        width: 50,
        height: 50,
        margin: 5,
    },

});

export default ModalDone;