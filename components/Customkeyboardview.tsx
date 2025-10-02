import { View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import React from 'react';

const Customkeyboardview = ({children}) => {
  const ios = Platform.OS == 'ios';

  return (
    <KeyboardAvoidingView
      behavior={ios ? 'padding' : 'height'}
      className="flex-1"
    >
      <ScrollView
        className="flex-1"
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,         // <-- Voeg deze toe!
          justifyContent: 'center', // <-- Voeg deze toe als je alles netjes in het midden wil
        }}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default Customkeyboardview;
