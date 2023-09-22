import { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Button, PermissionsAndroid } from 'react-native';
import MapView, {
  Callout,
  Marker,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import ModalDone from '../../assets/component/ModalDone';
import ModalCancel from '../../assets/component/ModalCancel';
import { mapStype } from '../../assets/config/config';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getPreciseDistance, getCenter } from 'geolib';

import Geolocation from '@react-native-community/geolocation'

function Map() {
  const [modalVisible, setModalVisible] = useState(false)
  const [modalVisibleC, setModalVisibleC] = useState(false)
  const [currentLocation, setCurrentLocation] = useState("")

  const a = getPreciseDistance(
    { latitude: 10.796073868914615, longitude: 106.63558936058817 },
    { latitude: 10.795542204312463, longitude: 106.63467995227164 }
  );

  const b = getCenter([
    { latitude: 10.796073868914615, longitude: 106.63558936058817 },
    { latitude: 10.795542204312463, longitude: 106.63467995227164 }
  ]);

  useEffect(() => {
    _getLocationPermission()
  }, [])

  console.log("a=", a);
  console.log("b=", b);

  const [marketList, setMarketList] = useState([
    {
      id: 1,
      latitude: 37.4262536,
      longitude: -122.093183,
      KH: "Nguyễn Công Tần",
      DC: "Ấp 4",
      No: 123456,
      DanhSo: "54-1515",
      MaKH: "psd554as5",

    },
    {
      id: 2,
      latitude: 37.4249876,
      longitude: -122.0874513,
      KH: "Nguyễn Công Tần 2",
      DC: "Ấp 41",
      No: 1234562,
      DanhSo: "54-15151",
      MaKH: "psd554as51",
    },
  ]);

  const MyCustomMarkerView = () => {
    return (
      <View>
        <Icon name="circle-slice-8" size={30} color="blue" />
      </View>
    );
  };
  const MyCustomMarkerViewNV = (props) => {
    return (
      <View style={{ display: "flex", justifyContent: "center", alignItems: 'center' }}>
        <Text>{getDistance(props)}</Text>
        <Icon name="account" size={30} color="black" />
        <Text style={{ color: "red" }}>Nhan viên</Text>
      </View>
    );
  };

  const getDistance = (props) => {
    const a = getPreciseDistance(
      { latitude: props.latitude, longitude: props.longitude },
      { latitude: currentLocation.latitude, longitude: currentLocation.longitude }
    );
    return <Text style={{ color: "red" }}>{a} (m)</Text>
  }



  async function _getLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'Example App',
          'message': 'Example App access to your location '
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(info => setCurrentLocation(info.coords));
        console.log("You can use the location")
      } else {
        console.log("location permission denied")
        alert("Location permission denied");
      }
    } catch (err) {
      console.warn(err)
    }
  }



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
          // customMapStyle={mapStype}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}>
          {currentLocation !== "" ?
            <Marker
              coordinate={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
              }}
            >
              <MyCustomMarkerView />
            </Marker> : <></>}

          {marketList.map(marker => {
            return (
              <Marker
                key={marker.id}
                coordinate={{
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                }}
              >
                {/* <MyCustomMarkerViewNV latitude={marker.latitude} longitude={marker.longitude} /> */}
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
