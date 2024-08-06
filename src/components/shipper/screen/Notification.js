import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const Notification = () => {
  const navigation = useNavigation()

  const link = [
    "https://game.playfun.vn/games/subway-runner?fullScreen=true",
    "https://id.yugih5.com/?",
    "https://id.vltkh5.zing.vn/play-game",
    "https://afkmobi.com/game/nong-trai-nhi-nho-h5?playhttps://afkmobi.com/game/nong-trai-nhi-nho-h5?play",
    "https://game.playfun.vn/games/two-punk-racing?fullScreen=true",
    "https://afkmobi.com/game/moba-kieu-moi-h5?play",
  ]
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.oneRow}>
          <TouchableOpacity
            style={styles.oneGame}
            onPress={() => {
              navigation.navigate("ViewGame1", {link : link[0]})
            }}>
            <Image style={styles.imgGame} source={{ uri : "https://cdn.playfun.vn/posts/images/35/funtap_458117_1614066052_1.webp"}} />
            <Text style={styles.nameGame}>Subway Runner</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.oneGame}
            onPress={() => {
              navigation.navigate("ViewGame1", {link : link[1]})
            }}>
            <Image style={styles.imgGame} source={{ uri : "https://genk.mediacdn.vn/2017/2-1511523913809.jpg"}} />
            <Text style={styles.nameGame}>YuGi</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.oneRow}>
          <TouchableOpacity
            style={styles.oneGame}
            onPress={() => {
              navigation.navigate("ViewGame1", {link : link[2]})
            }}>
            <Image style={styles.imgGame} source={{ uri : "https://images2.thanhnien.vn/zoom/686_429/Uploaded/khuongduy/2018_10_22/vltk-h5-open-beta-04_TOQG.jpg"}} />
            <Text style={styles.nameGame}>Võ lâm truyền kỳ</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.oneGame}
            onPress={() => {
              navigation.navigate("ViewGame1", {link : link[3]})
            }}>
            <Image style={styles.imgGame} source={{uri : "https://upload.afkmobi.com/photos/afkmobi-com/2020/10/afkmobi_nong_trai_nhi_nho_h5_logo.png"}} />
            <Text style={styles.nameGame}>Nông trại nhí nhố</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.oneRow}>
          <TouchableOpacity
            style={styles.oneGame}
            onPress={() => {
              navigation.navigate("ViewGame1", {link : link[4]})
            }}>
            <Image style={styles.imgGame} source={{uri : "https://a.silvergames.com/j/b/two-punk-racing.jpg"}} />
            <Text style={styles.nameGame}>Two punk racing</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.oneGame}
            onPress={() => {
              navigation.navigate("ViewGame1", {link : link[5]})
            }}>
            <Image style={styles.imgGame} source={{uri : "https://upload.afkmobi.com/photos/afkmobi-com/2022/12/afkmobi_game_moba_kieu_moi_icon_h5.png"}} />
            <Text style={styles.nameGame}>Moba kiểu mới</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

export default Notification

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20
  },
  oneRow : {
    flexDirection : 'row',
    justifyContent : 'space-around'
  },
  oneGame: {
    borderWidth : 0.5,
    borderColor : 'black',
    marginTop : 15,
    borderRadius : 10,
    padding: 5
  },
  imgGame: {
    width: 150,
    height: 150,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'white'
  },
  nameGame: {
    textAlign : 'center',
    fontSize : 16,
    fontWeight: 'bold',
    color : 'green'
  }
})