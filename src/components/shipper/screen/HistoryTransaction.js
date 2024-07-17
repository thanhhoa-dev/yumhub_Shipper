import { View, Text, FlatList } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { styles } from '../styles/HistoryTransactionStyle'
import { getHistoryTransaction } from '../ShipperHTTP'
import { UserContext } from '../../user/UserContext'

const HistoryTransaction = () => {
    const { user } = useContext(UserContext);
    const [listTopUp, setListTopUp] = useState([])
    const [listWithdraw, setListWithdraw] = useState([])
    useEffect(()=> {
        const fetchData = async () => {
            try {
                const getListHistoryTransaction = await getHistoryTransaction(user.checkAccount._id);
                if(getListHistoryTransaction.result){
                    getListHistoryTransaction.TransactionHistory.filter(item => {
                        if(item.transantionType == "661b693bfc13ae5701ab8a15") listTopUp.push(item);
                        else listWithdraw.push(item)
                    })
                }
            } catch (error) {
                console.log(error);
            }
            console.log(listWithdraw); 
        }
        fetchData()
    }, [])
    const renderItemTopUp = ({item}) => {
        return (
            <View>
                <Text>{item.description}</Text>
            </View>
        )
    }
    const renderItemWithdraw = ({item}) => {
        return (
            <View>
                <Text>{item.description}</Text>
            </View>
        )
    }
  return (
    <View>
      <Text>Lịch sử nạp</Text>
      <FlatList
        data={listTopUp}
        renderItem={renderItemTopUp}
      />
      <Text>Lịch sử rút</Text>
      <FlatList
        data={listWithdraw}
        renderItem={renderItemWithdraw}
      />
    </View>
  )
}

export default HistoryTransaction