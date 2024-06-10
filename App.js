import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, FlatList, Pressable, TextInput, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { cars } from "./cars.json";
 
const Stack = createStackNavigator();
 
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
 
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isLoggedIn ? (
          <Stack.Screen
            name="login"
            options={{ title: "Login" }}
          >
            {props => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen
              name="car-list"
              component={CarListScreen}
              options={{ title: "Car List" }}
            />
            <Stack.Screen
              name="home"
              component={HomeScreen}
              options={{ title: "Home" }}
            />
            <Stack.Screen
              name="specific-car"
              component={SpecificCarScreen}
              options={{ title: "Specific Car" }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
 
function LoginScreen({ navigation, setIsLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
 
  const handleLogin = () => {
    const validUsername = 'admin';
    const validPassword = 'admin';
 
    if (username === validUsername && password === validPassword) {
      setIsLoggedIn(true);
    } else {
      Alert.alert('Error', 'Invalid username or password!');
    }
  };
 
  return (
    <View style={styles.container}>
      <Image source={{ uri : "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Barbie_Logo.svg/1280px-Barbie_Logo.svg.png"}} style={styles.logo}></Image>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor={"rgb(243, 213, 234)"}
        onChangeText={text => setUsername(text)}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={"rgb(243, 213, 234)"}
        onChangeText={text => setPassword(text)}
        value={password}
        secureTextEntry
      />
      <Pressable style={styles.button_press} onPress={handleLogin}>
        <Text style={styles.inputText}>Login</Text>
      </Pressable>
    </View>
  );
}
 
function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      
      <Text style={styles.text}>Welcome to the Home Screen</Text>
      <Pressable style={styles.button_press} onPress={() => navigation.navigate("car-list")}>
        <Text style={styles.inputText}>Go to Car List</Text>
      </Pressable>
    </View>
  );
}
 
function CarListScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Image source={{ uri : "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Barbie_Logo.svg/1280px-Barbie_Logo.svg.png"}} style={styles.logo}></Image>
      <Text style={styles.text}>Choose your own Barbie Dream Car!</Text>
      <FlatList
        style={styles.carlist}
        data={cars}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => navigation.navigate("specific-car", { car: item })}
            style={styles.itemContainer}
          >
            <Text style={styles.name}>{item.model}</Text>
            <Image style={styles.image} source={{ uri: item.img }}></Image>
          </Pressable>
        )}
        keyExtractor={item => item.id.toString()}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />
    </SafeAreaView>
  );
}
 
function SpecificCarScreen({ route }) {
  const { car } = route.params;
 
  return (
    <View style={styles.container}>
      <Image source={{ uri : "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Barbie_Logo.svg/1280px-Barbie_Logo.svg.png"}} style={styles.logo}></Image>
      <View style={styles.innerSection}>
        <Image style={styles.detailImg} source={{ uri: car.img }}></Image>
        <Text style={styles.detailText}>Brand: {car.brand}</Text>
        <Text style={styles.detailText}>Model: {car.model}</Text>
        <Text style={styles.detailText}>Year: {car.year}</Text>
        <Text style={styles.detailText}>{car.description}</Text>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(243, 166, 220)',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20
  },
  logo: {
    width: 300,
    height: 150,
  },
  text: {
    fontSize: 24,
    color: "#f0449c"
  },
  input: {
    width: '80%',
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0449c",
    color: "rgb(243, 213, 234)",
    paddingHorizontal: 10,
  },
  inputText: {
    color: "rgb(243, 213, 234)"
  },
  button_press: {
    backgroundColor: '#f0449c',
    padding: 10,
    borderRadius: 20,
    marginTop: 10,
  },
  carlist: {
    width: '95%',
    backgroundColor: "#f0449c",
    padding: 10,
    borderRadius: 30
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: "rgb(243, 166, 220)",
    borderRadius: 20
  },
  name: {
    marginRight: 10,
    fontSize: 18,
    color: "#f0449c"
  },
  image: {
    height: 100,
    width: 200
  },
  detailImg: {
    height: 150,
    width: 350,
    borderRadius: 20
  },
  innerSection: {
    width: "95%",
    padding: 20,
    backgroundColor: "#f0449c",
    borderRadius: 20,
    alignItems: "center"
  },
  detailText: {
    color: "rgb(243, 213, 234)",
    fontSize: 20,
    textAlign: "center"
  }
});