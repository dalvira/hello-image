import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Carousel from 'react-native-reanimated-carousel';

const { width: SLIDER_WIDTH } = Dimensions.get('window');

export default function HomeScreen() {
  const [images, setImages] = useState<string[]>([]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (!result.cancelled) {
      setImages((prevImages) => [
        ...prevImages,
        ...result.assets.map((asset) => asset.uri),
      ]);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.carouselItem}>
        <Image source={{ uri: item }} style={styles.image} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        loop
        snapEnabled
        width={SLIDER_WIDTH}
        autoPlay={false}
        data={images}
        renderItem={renderItem}
        scrollAnimationDuration={1000}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text style={styles.text}>Choose Image</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  carouselContainer: {
    flex: 6,
  },
  buttonContainer: {
    alignItems: 'center',
    padding: 32,
  },
  button: {
    backgroundColor: '#007bf7',
    borderRadius: 13,
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  text: {
    color: 'white',
    fontWeight: '700',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  carouselItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
