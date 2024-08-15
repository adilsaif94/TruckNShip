import { StyleSheet, Text, View, ScrollView, StatusBar, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-async-storage/async-storage'

const CustomerDashboard = ({ navigation }) => {

    const handleLogout = async () => {
        await AsyncStorage.removeItem('jwtToken');
        navigation.navigate('Login');
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login', params: { resetFields: true } }],
        });
    };


    return (
        <SafeAreaView style={{ flex: 1 }}>


            <View style={styles.TopContainer}>
                <View style={{ marginTop: 15 }}>
                    <Text style={styles.userName}>Hello, Name...</Text>
                    <Text style={styles.totalShip}>Total Shipment</Text>
                    <Text style={styles.totalNum}>2</Text>
                    <Text style={styles.totalShip}>Total Amount</Text>
                    <Text style={styles.totalNum}>$2505</Text>
                </View>
                <Image style={styles.image} source={require('../assets/images/truck.png')} />
            </View>
            <TouchableOpacity onPress={() => { navigation.navigate('CreateShipment') }} style={styles.newShipView}>
                <View style={{ flexDirection: 'row' }}>
                    <AntDesign name='pluscircleo' color='white' size={25} />
                    <Text style={styles.newShipText}>Create New Shipment</Text>
                </View>
                <FontAwesome6 name='truck-fast' color='white' size={23} />
            </TouchableOpacity>
            <Text style={styles.allShipment}>All Shipments</Text>

            <ScrollView>
                <View style={{ borderWidth: 1.5, borderColor: '#cd220b', marginHorizontal: 15, borderRadius: 10, marginTop: 20 }}>

                    <View style={styles.cardView}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.cardHeading}>Weight</Text>
                            <Text style={{ fontSize: 16, fontWeight: '500' }}>500<Text style={{ color: 'black' }}> KG</Text></Text>
                            <Text style={[styles.cardHeading, { marginTop: 20 }]}>Size</Text>
                            <Text style={{ fontSize: 16, fontWeight: '500' }}>25<Text style={{ color: 'black' }}> Mtr</Text></Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.cardHeading}>Location</Text>
                            <Text style={{ fontSize: 16, fontWeight: '500', color: 'black' }}>24 East, Japan</Text>
                            <Text style={[styles.cardHeading, { marginTop: 20 }]}>Time</Text>
                            <Text style={{ fontSize: 16, fontWeight: '500', color: 'black' }}>25-Dec-2024, 7:00AM</Text>
                        </View>
                    </View>
                    <View style={{ backgroundColor: '#cd220b', borderBottomLeftRadius: 8, borderBottomRightRadius: 8, flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 7 }}>
                        <Text style={{ fontSize: 15, color: 'white', alignSelf: 'center' }}>Reference id: <Text style={{ fontWeight: '800' }}>#25405454054</Text></Text>
                        <View style={{ backgroundColor: '#f7cd23', borderRadius: 8, }}>
                            <Text style={{ color: 'white', padding: 2, paddingHorizontal: 7, fontWeight: '800' }}>Pending</Text>
                        </View>
                    </View>
                </View>
                <View style={{ borderWidth: 1.5, borderColor: '#cd220b', marginHorizontal: 15, borderRadius: 10, marginTop: 20 }}>

                    <View style={styles.cardView}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.cardHeading}>Weight</Text>
                            <Text style={{ fontSize: 16, fontWeight: '500' }}>500<Text style={{ color: 'black' }}> KG</Text></Text>
                            <Text style={[styles.cardHeading, { marginTop: 20 }]}>Size</Text>
                            <Text style={{ fontSize: 16, fontWeight: '500' }}>25<Text style={{ color: 'black' }}> Mtr</Text></Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.cardHeading}>Location</Text>
                            <Text style={{ fontSize: 16, fontWeight: '500', color: 'black' }}>24 East, Japan</Text>
                            <Text style={[styles.cardHeading, { marginTop: 20 }]}>Time</Text>
                            <Text style={{ fontSize: 16, fontWeight: '500', color: 'black' }}>25-Dec-2024, 7:00AM</Text>
                        </View>
                    </View>
                    <View style={{ backgroundColor: '#cd220b', borderBottomLeftRadius: 8, borderBottomRightRadius: 8, flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 7 }}>
                        <Text style={{ fontSize: 15, color: 'white', alignSelf: 'center' }}>Reference id: <Text style={{ fontWeight: '800' }}>#25405454054</Text></Text>
                        <View style={{ backgroundColor: '#f7cd23', borderRadius: 8, }}>
                            <Text style={{ color: 'white', padding: 2, paddingHorizontal: 7, fontWeight: '800' }}>Pending</Text>
                        </View>
                    </View>
                </View>


            </ScrollView>

            <TouchableOpacity onPress={handleLogout} style={styles.logoutView}>
                <MaterialIcons name='logout' color='white' size={30} style={{ paddingHorizontal: 10 }} />
            </TouchableOpacity>


        </SafeAreaView>
    )
}

export default CustomerDashboard

const styles = StyleSheet.create({
    TopContainer: {
        width: '100%',
        height: 180,
        backgroundColor: '#cd220b',
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    userName: {
        color: 'white',
        fontWeight: '800',
        fontSize: 22
    },
    totalShip: {
        color: 'white',
        marginTop: 15,
        fontWeight: '800',
        fontSize: 12
    },
    totalNum: {
        color: 'white',
        marginTop: 2,
        fontSize: 20
    },
    image: {
        width: 120,
        height: 120,
        alignSelf: 'center'
    },
    newShipView: {
        backgroundColor: '#cd220b',
        marginHorizontal: 15,
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        marginTop: 15
    },
    newShipText: {
        color: 'white',
        alignSelf: 'center',
        fontSize: 17,
        marginLeft: 10
    },
    allShipment: {
        marginHorizontal: 15,
        marginTop: 25,
        color: 'black',
        fontWeight: '500'
    },
    cardView: {
        paddingHorizontal: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        backgroundColor: 'white',
        borderRadius: 8,

    },
    cardHeading: {
        backgroundColor: '#cd220b',
        color: 'white',
        borderRadius: 8,
        fontSize: 13,
        paddingHorizontal: 7
    },
    logoutView: {
        backgroundColor: '#808080',
        marginHorizontal: 15,
        borderRadius: 100,
        width: 50,
        height: 50,
        justifyContent: 'center',
        position: 'absolute',
        right: 10,
        bottom: 15
    },
})