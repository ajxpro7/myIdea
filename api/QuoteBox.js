import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Animated, Easing, ImageBackground } from 'react-native';
import axios from 'axios';
import Bg from '@/assets/images/Bg.png';
import { axioKey } from '@/constants';

const QuoteBox = ({onImageLoaded = () => {}}) => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const animateIn = () => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  const new_quote = (retries = 10) => {
    if (retries === 0) {
      console.log('Kon geen korte quote vinden na meerdere pogingen.');
      return;
    }

    axios.get('https://api.api-ninjas.com/v1/quotes', {
      headers: {
        'X-Api-Key': axioKey
      }
    })
    .then(response => {
      const receivedQuote = response.data[0].quote;
      const receivedAuthor = response.data[0].author;

      if (receivedQuote.length <= 120) {
        setQuote(receivedQuote);
        setAuthor(receivedAuthor);
        animateIn();
      } else {
        new_quote(retries - 1);
      }
    })
    .catch(error => {
      console.log('Fout bij ophalen quote:', error.message);
    });
  };

  useEffect(() => {
    new_quote();
    const interval = setInterval(new_quote, 60 * 30 * 1000); // 30 min

    return () => clearInterval(interval);
  }, []);

  return (
    <ImageBackground
      source={Bg}
      onLoadEnd={onImageLoaded} // ← Dit is cruciaal
      resizeMode="cover"
      className="h-[40%] justify-center items-center px-6 border-b border-gray-200 opacity-50"
    >
      <View className="absolute inset-0 bg-white/60" /> {/* semi-transparante overlay */}
      
      <Animated.View style={{ opacity: fadeAnim }}>
        <Text className="text-3xl font-serif text-center text-white leading-10">{quote}</Text>
        <Text className="text-lg text-white mt-4 text-center">- {author}</Text>
      </Animated.View>
    </ImageBackground>
  );
};

export default QuoteBox;
