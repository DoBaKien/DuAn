import { Modal, Pressable, Text, View, StyleSheet, TextInput } from "react-native";


function ModalCancel(props) {
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
                        placeholder="Nhập ghi chú khi sửa điện.."
                    />

                    <Pressable
                        style={styles.button}
                        onPress={() => props.setModalVisible(!props.modalVisible)}>
                        <Text style={styles.textStyle}>Hủy yêu cầu</Text>
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


});

export default ModalCancel;