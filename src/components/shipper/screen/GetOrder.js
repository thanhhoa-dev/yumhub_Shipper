import React, { useEffect, useState } from 'react';
import { View, Button, Text } from 'react-native';
import { GetOrderByID } from '../ShipperHTTP';
import { SetStatus } from '../ShipperHTTP';

const GetOrder = () => {
  const [order, setOrder] = useState(null);
  const id = '660c9dc319f26b917ea15837';

  useEffect(()=>{
    const fetchOrder = async () => {
        try {
          const result = await GetOrderByID(id);
          setOrder(result.order);
        } catch (error) {
          console.error('Error fetching order:', error);
        }
      };
      fetchOrder();
  },[])

  

  const updateOrderStatus = async (id, status) => {
    try {
      await SetStatus(id, status)
      
      console.log('cập nhập trạng thái thành công')
      // Nếu muốn cập nhật lại màn hình sau khi cập nhật trạng thái, có thể gọi fetchOrder(orderId) ở đây
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const handleShipperDecision = async (id, status) => {
    try {
      if (status === 3) {
        await updateOrderStatus(id, 3);
        // fetchOrder(id); // Cập nhật lại đơn hàng sau khi thay đổi trạng thái
      } else if (status === 5) {
        await updateOrderStatus(status, 5);
      } else {
        console.warn('Lựa chọn không hợp lệ');
      }
    } catch (error) {
      console.error('Error handling shipper decision:', error);
    }
  };

  return (
    <View>
      {order ? (
        <>
          <Text>{`ID Đơn hàng: ${order._id}`}</Text>
          {/* Hiển thị các thông tin khác về đơn hàng tại đây */}
          <Button title="Nhận đơn" onPress={() => handleShipperDecision(order._id, 3)} />
          <Button title="Không nhận đơn" onPress={() => handleShipperDecision(order._id, 5)} />
        </>
      ) : (
        <Text>Không có đơn hàng để hiển thị</Text>
      )}
    </View>
  );
};

export default GetOrder;
