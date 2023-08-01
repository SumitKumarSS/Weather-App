import {
  View,
  Text,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { theme } from "../theme/theme";
import { CalendarDaysIcon} from "react-native-heroicons/solid";
import { astro, current, foreCast } from "../util/request";
import Header from "../component/header";
import Loading from "../component/Loading";
import { weatherImages } from "../component/images";

const dim = Dimensions.get("window");

export default function HomeScreen() {
  const [isLoading,setLoading]=useState(false)
  const [currentWeather, setWeather] = useState();
  const [location, setLocation] = useState();
  const [isSunrise, setSunrise] = useState();
  const [isForeCast, setForecast] = useState();
  const [curCity,setCity]=useState('Noida')

  useEffect(() => {
    DataHandler();
  }, []);
  const DataHandler = async (city) => {
    setLoading(true)
    if(!!city) 
    {
    const data2 = await foreCast(city, 7);
  
    setForecast(data2?.forecast?.forecastday);
    setWeather(data2?.current);
    setLocation(data2?.location);
    setSunrise(data2?.forecast?.forecastday[0].astro);
    setCity(city)
    }
    else{  
    const data2 = await foreCast(curCity, 7);
    setForecast(data2?.forecast?.forecastday);
    setWeather(data2?.current);
    setLocation(data2?.location);
    setSunrise(data2?.forecast?.forecastday[0].astro);
    }
    setLoading(false)
  };

  const image = currentWeather?.condition.icon;
  const cLocation = [location?.name, location?.country];
  return (
    <View className="flex-1 relative">
      <StatusBar style="light" />
      <Image
        blurRadius={70}
        source={require("../assets/OIP.png")}
        className="absolute"
        style={{ height: dim.height, width: dim.width }}
      />
      {isLoading?<Loading/>:<SafeAreaView>
        <View className="mx-4 relative z-50 my-3">
          <Header fun={DataHandler}/>
          <View className="mx-4 flex justify-around ">
            <Text className="text-white text-center text-4xl font-bold p-4 -mb-5 mt-5">
              {cLocation[0]},
              <Text className="text-lg font-semibold text-gray-300"> {cLocation[1]}</Text>
            </Text>
            {/* weather icon */}
            <View className="flex-row justify-center mt-5">
              <Image source={weatherImages[currentWeather?.condition.text]} className="w-52 h-52" />
            </View>
            <View className="justify-center items-center">
              <Text className="text-white text-center text-7xl font-bold mt-5 mb-1 ml-9">
                {currentWeather?.temp_c}°
              </Text>
              <Text className="text-neutral-400 text-center text-2xl font-bold tracking-widest">
                {currentWeather?.condition?.text}
              </Text>
            </View>
          </View>
          <View className="flex-row justify-between my-6">
            <View className="flex-row space-x-2 items-center">
              <Image
                source={require("../assets/wind.png")}
                className="w-5 h-5"
              />
              <Text className="text-white">
                {currentWeather?.wind_kph} km/h
              </Text>
            </View>
            <View className="flex-row space-x-2 items-center">
              <Image
                source={require("../assets/drop.png")}
                className="w-5 h-5"
              />
              <Text className="text-white">{currentWeather?.humidity}%</Text>
            </View>
            <View className="flex-row space-x-2 items-center">
              <Image
                source={require("../assets/sun.png")}
                className="w-5 h-5"
              />
              <Text className="text-white">{isSunrise?.sunrise}</Text>
            </View>
          </View>
          <View>
            <View className="flex-row items-center">
              <CalendarDaysIcon size={22} color={"white"} />
              <Text className="mx-2 text-neutral-200 text-base">
                Weather Forecast
              </Text>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: 2,
                paddingVertical: 19,
              }}
            >

              {isForeCast?.map((item, index) => {
                let image2 = item?.day.condition.icon;
                let today =new Date(item?.date)
                let dayName=today.toLocaleDateString('en-US',{weekday:"long"})
                // dayName=dayName.split(',')[0]
                dayName=dayName.slice(0,3)
                return (
                  <TouchableOpacity key={index}>
                  <View
                    className="mx-2 bg-neutral-200 rounded-3xl p-5 px-8"
                    
                    style={{ backgroundColor: theme.bgWhite(0.15) }}
                  >
                    <Text className='text-white text-center'>{dayName}</Text>
                    <Image
                      source={{ uri: "https:" + image2 }}
                      className="w-10 h-10 items-center"
                    />
                    <Text className="text-white text-center">
                      {item?.day.avgtemp_c} °
                    </Text>
                  </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>}
    </View>
  );
}
