import React, { useEffect, useState } from 'react';
import { AppLoading } from "expo";
import * as Font from 'expo-font';

import Main from './src/main'

// console.disableYellowBox = true
export default function App() {
  const [loading, setLoading] = React.useState(true)

  async function loadFont() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    })
    setLoading(false)
  }

  useEffect(function () {
    loadFont();
  })

  if (!loading) {
    return (
      <Main />
    );
  }
  return <AppLoading />
}