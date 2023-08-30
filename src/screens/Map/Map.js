import { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Button, PermissionsAndroid, Image } from 'react-native';
import MapView, {
  Callout,
  Marker,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import ModalDone from '../../assets/component/ModalDone';
import ModalCancel from '../../assets/component/ModalCancel';

import { mapStype } from '../../assets/config/config';
import Geolocation from 'react-native-geolocation-service';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


function Map() {
  const [modalVisible, setModalVisible] = useState(false)
  const [modalVisibleC, setModalVisibleC] = useState(false)
  const [currentLocation, setCurrentLocation] = useState("")
  const [marketList, setMarketList] = useState([
    {
      id: 1,
      latitude: 37.4214528,
      longitude: -122.0868092,
      KH: "Nguyễn Công Tần",
      DC: "Ấp 4",
      No: 123456,
      DanhSo: "54-1515",
      MaKH: "psd554as5",

    },
    {
      id: 2,
      latitude: 37.4215267,
      longitude: -122.0860008,
      KH: "Nguyễn Công Tần 2",
      DC: "Ấp 41",
      No: 1234562,
      DanhSo: "54-15151",
      MaKH: "psd554as51",
    },
  ]);

  const MyCustomMarkerView = () => {
    return (
      <Icon name="circle-slice-8" size={30} color="blue" />
    );
  };

  useEffect(() => {
    _getLocationPermission()
  }, [])

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
        getCurrentLocation()
        console.log("You can use the location")
      } else {
        console.log("location permission denied")
        alert("Location permission denied");
      }
    } catch (err) {
      console.warn(err)
    }
  }

  function getCurrentLocation() {
    Geolocation.getCurrentPosition(
      position => {
        setCurrentLocation(position.coords);
      },
      error => {
        console.error(error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
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
            latitude: 37.4219983,
            longitude: -122.084,
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
