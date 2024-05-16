import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { GetOrderByID } from '../ShipperHTTP';

const Test = () => {
    const [order, setOrder] = useState(null);
    const id = '660c9dc319f26b917ea15837';
    useEffect(() => {
        const fetchOrder = async () => {
          try {
            const result = await GetOrderByID(id);
            setOrder(result.order);
            console.log(result);
          } catch (error) {
            console.error('Error fetching order:', error);
          }
        };
        fetchOrder();
      }, []);
  return (
    <View>
      <Text>test</Text>
    </View>
  )
}

export default Test