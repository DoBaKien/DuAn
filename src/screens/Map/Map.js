import { useState } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import MapView, {
  Callout,
  Marker,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import ModalDone from '../../assets/component/ModalDone';
import ModalCancel from '../../assets/component/ModalCancel';


function Map() {
  const [modalVisible, setModalVisible] = useState(false)
  const [modalVisibleC, setModalVisibleC] = useState(false)

  const [marketList, setMarketList] = useState([
    {
      id: 1,
      latitude: 9.8117844,
      longitude: 105.8187709,
      KH: "Nguyễn Công Tần",
      DC: "Ấp 4",
      No: 123456,
      DanhSo: "54-1515",
      MaKH: "psd554as5",

    },
    {
      id: 2,
      latitude: 9.8124183,
      longitude: 105.820193,
      KH: "Nguyễn Công Tần 2",
      DC: "Ấp 41",
      No: 1234562,
      DanhSo: "54-15151",
      MaKH: "psd554as51",
    },
  ]);



  return (
    <View style={styles.container}>
      <ModalDone setModalVisible={setModalVisible} modalVisible={modalVisible} />
      <ModalCancel setModalVisible={setModalVisibleC} modalVisible={modalVisibleC} />
      <View style={{ height: 50, flexDirection: 'row', justifyContent: 'space-evenly' }}>

        <Button
          onPress={() => setModalVisibleC(true)}
          title="Hủy"
        />
        <Button
          onPress={() => setModalVisible(true)}
          title="Done"
        />
      </View>

      <View style={{ flex: 1 }}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{

            latitude: 9.8119654,
            longitude: 105.8199631,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}>

          {marketList.map(marker => {
            return (
              <Marker
                key={marker.id}
                coordinate={{
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                }}

              >
                <Callout>
                  <Text>KH:{marker.KH}</Text>
                  <Text>DC:{marker.DC}</Text>
                  <Text>Số No:{marker.No}</Text>
                  <Text>DanhSo:{marker.DanhSo}</Text>
                  <Text>MaKH:{marker.MaKH}</Text>
                </Callout>
              </Marker>

            );
          })}
        </MapView>
      </View>
    </View >
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
  },
  map: { flex: 1 },
});
export default Map;
