import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';

const HomeSlider = ({ data }) => {
  return (
    <View style={styles.container}>
      <SwiperFlatList
        autoplay
        autoplayDelay={2}
        autoplayLoop
        index={0}
        showPagination
      >
        {data.map((item, index) => (
          <View style={styles.item} key={index}>
            <Image source={item.img} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.balance}>{item.balance}</Text>
          </View>
        ))}
      </SwiperFlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  item: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 5,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  balance: {
    fontSize: 14,
    color: 'gray',
  },
});

export default HomeSlider;
