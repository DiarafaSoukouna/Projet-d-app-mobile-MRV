import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const get_data = async (url, setData) => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    const headers = { Authorization: `Bearer ${token}` };

    const response = await axios.get(url, { headers });

    setData(response.data.data);
  } catch (error) {
    console.error('Error:', error);
  }
};
export const BaseURL = 'https://admin.mrv-mali.org/apis/'

