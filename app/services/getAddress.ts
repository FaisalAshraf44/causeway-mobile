import axios from 'axios';

export default function getAddress(lat: any, lng: any) {
  return axios.post(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyDM88FwG-R3dqn_Fc_a4KqojTxZAjJJZPE`
  );
}
