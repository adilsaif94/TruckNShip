import { StyleSheet, Text, View, ScrollView, SafeAreaView, Modal, TouchableOpacity, Pressable, Image, Linking } from 'react-native';
import React, { useState } from 'react';
import Zocial from 'react-native-vector-icons/Zocial'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomerDashboard = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [status, setStatus] = useState('Status');
    const [statusColor, setStatusColor] = useState('#f7cd23');
    const [selectedStatus, setSelectedStatus] = useState('Pending');
    const [selectedColor, setSelectedColor] = useState('#f7cd23');

    const handleLogout = async () => {
        await AsyncStorage.removeItem('jwtToken');
        navigation.navigate('Login');
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login', params: { resetFields: true } }],
        });
    };


    const handleStatusSelection = (newStatus, color) => {
        setSelectedStatus(newStatus);
        setSelectedColor(color);
    };

    const handleUpdate = () => {
        setStatus(selectedStatus);
        setStatusColor(selectedColor);
        setModalVisible(false);
    };

    const handleCancel = () => {
        setModalVisible(false);
    };

    const handleSendEmail = () => {
        const email = 'xyz@gmail.com'; // Replace with the recipient's email
        // const subject = 'Your Subject Here';
        // const body = 'Your email body here';

        // const mailto = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        const mailto = `mailto:${email}`;

        Linking.openURL(mailto).catch((err) => console.log('Error:', err));
    };


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.TopContainer}>
                <Text style={styles.userName}>Admin Dashboard</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <View>
                        <Text style={styles.totalShip}>Total Shipment</Text>
                        <Text style={styles.totalShip}>2</Text>
                        <Text style={[styles.totalShip, { marginTop: 20 }]}>Total Driver</Text>
                        <Text style={styles.totalShip}>12</Text>
                    </View>
                    <View>
                        <Text style={styles.totalShip}>Total Revenue</Text>
                        <Text style={styles.totalShip}>2</Text>
                        <Text style={[styles.totalShip, { marginTop: 20 }]}>Total Weight</Text>
                        <Text style={styles.totalShip}>2505</Text>
                    </View>
                    <View>
                        <Text style={styles.totalShip}>Pending Request</Text>
                        <Text style={styles.totalShip}>2</Text>
                        <Text style={[styles.totalShip, { marginTop: 20 }]}>Complete Shipment</Text>
                        <Text style={styles.totalShip}>$2505</Text>
                    </View>
                </View>
            </View>

            <Text style={styles.allShipment}>All Orders</Text>

            <ScrollView>
                <View style={styles.cardContainer}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardHeaderText}>Name :- <Text style={styles.cardHeaderTextBold}>User</Text></Text>
                        <Text style={styles.cardHeaderText}>Email :- <Text style={styles.cardHeaderTextBold}>xyz@gmail.com</Text></Text>
                    </View>

                    <View style={styles.cardView}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.cardHeading}>Weight</Text>
                            <Text style={{ fontSize: 16, fontWeight: '500', color: 'black', marginTop: 5 }}>500 KG</Text>
                            <Text style={[styles.cardHeading, { marginTop: 20 }]}>Size</Text>
                            <Text style={{ fontSize: 16, fontWeight: '500', color: 'black', marginTop: 5 }}>25 Mtr</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.cardHeading}>Location</Text>
                            <Text style={{ fontSize: 16, fontWeight: '500', color: 'black', marginTop: 5 }}>24 East, Japan</Text>
                            <Text style={[styles.cardHeading, { marginTop: 20 }]}>Time</Text>
                            <Text style={{ fontSize: 16, fontWeight: '500', color: 'black', marginTop: 5 }}>25-Dec-2024, 7:00AM</Text>
                        </View>
                    </View>

                    <View style={styles.cardFooter}>
                        <TouchableOpacity style={styles.updateButton} onPress={() => setModalVisible(true)}>
                            <Text style={styles.updateButtonText}>Update The Shipment</Text>
                        </TouchableOpacity>

                        <View style={[styles.statusContainer, { backgroundColor: statusColor }]}>
                            <Text style={styles.statusText}>{status}</Text>
                        </View>
                    </View>

                    <TouchableOpacity onPress={handleSendEmail} style={{ marginBottom: 10, alignItems: 'flex-end', marginHorizontal: 18 }}>
                        <View style={{ flexDirection: 'row', backgroundColor: '#deddd9', borderRadius: 8, padding: 4, paddingHorizontal: 10 }}>
                            <Text style={{ fontSize: 14, fontWeight: '500' }}>Contact</Text>
                            <Zocial name='email' color='#cd220b' size={18} style={{ marginLeft: 10 }} />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.cardContainer}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardHeaderText}>Name :- <Text style={styles.cardHeaderTextBold}>User</Text></Text>
                        <Text style={styles.cardHeaderText}>Email :- <Text style={styles.cardHeaderTextBold}>xyz@gmail.com</Text></Text>
                    </View>

                    <View style={styles.cardView}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.cardHeading}>Weight</Text>
                            <Text style={{ fontSize: 16, fontWeight: '500', color: 'black', marginTop: 5 }}>500 KG</Text>
                            <Text style={[styles.cardHeading, { marginTop: 20 }]}>Size</Text>
                            <Text style={{ fontSize: 16, fontWeight: '500', color: 'black', marginTop: 5 }}>25 Mtr</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.cardHeading}>Location</Text>
                            <Text style={{ fontSize: 16, fontWeight: '500', color: 'black', marginTop: 5 }}>24 East, Japan</Text>
                            <Text style={[styles.cardHeading, { marginTop: 20 }]}>Time</Text>
                            <Text style={{ fontSize: 16, fontWeight: '500', color: 'black', marginTop: 5 }}>25-Dec-2024, 7:00AM</Text>
                        </View>
                    </View>

                    <View style={styles.cardFooter}>
                        <TouchableOpacity style={styles.updateButton} onPress={() => setModalVisible(true)}>
                            <Text style={styles.updateButtonText}>Update The Shipment</Text>
                        </TouchableOpacity>

                        <View style={[styles.statusContainer, { backgroundColor: statusColor }]}>
                            <Text style={styles.statusText}>{status}</Text>
                        </View>
                    </View>

                    <TouchableOpacity onPress={handleSendEmail} style={{ marginBottom: 10, alignItems: 'flex-end', marginHorizontal: 18 }}>
                        <View style={{ flexDirection: 'row', backgroundColor: '#deddd9', borderRadius: 8, padding: 4, paddingHorizontal: 10 }}>
                            <Text style={{ fontSize: 14, fontWeight: '500' }}>Contact</Text>
                            <Zocial name='email' color='#cd220b' size={18} style={{ marginLeft: 10 }} />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.cardContainer}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardHeaderText}>Name :- <Text style={styles.cardHeaderTextBold}>User</Text></Text>
                        <Text style={styles.cardHeaderText}>Email :- <Text style={styles.cardHeaderTextBold}>xyz@gmail.com</Text></Text>
                    </View>

                    <View style={styles.cardView}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.cardHeading}>Weight</Text>
                            <Text style={{ fontSize: 16, fontWeight: '500', color: 'black', marginTop: 5 }}>500 KG</Text>
                            <Text style={[styles.cardHeading, { marginTop: 20 }]}>Size</Text>
                            <Text style={{ fontSize: 16, fontWeight: '500', color: 'black', marginTop: 5 }}>25 Mtr</Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.cardHeading}>Location</Text>
                            <Text style={{ fontSize: 16, fontWeight: '500', color: 'black', marginTop: 5 }}>24 East, Japan</Text>
                            <Text style={[styles.cardHeading, { marginTop: 20 }]}>Time</Text>
                            <Text style={{ fontSize: 16, fontWeight: '500', color: 'black', marginTop: 5 }}>25-Dec-2024, 7:00AM</Text>
                        </View>
                    </View>

                    <View style={styles.cardFooter}>
                        <TouchableOpacity style={styles.updateButton} onPress={() => setModalVisible(true)}>
                            <Text style={styles.updateButtonText}>Update The Shipment</Text>
                        </TouchableOpacity>

                        <View style={[styles.statusContainer, { backgroundColor: statusColor }]}>
                            <Text style={styles.statusText}>{status}</Text>
                        </View>
                    </View>

                    <TouchableOpacity onPress={handleSendEmail} style={{ marginBottom: 10, alignItems: 'flex-end', marginHorizontal: 18 }}>
                        <View style={{ flexDirection: 'row', backgroundColor: '#deddd9', borderRadius: 8, padding: 4, paddingHorizontal: 10 }}>
                            <Text style={{ fontSize: 14, fontWeight: '500' }}>Contact</Text>
                            <Zocial name='email' color='#cd220b' size={18} style={{ marginLeft: 10 }} />
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <TouchableOpacity onPress={handleLogout} style={styles.logoutView}>
                <MaterialIcons name='logout' color='white' size={30} style={{ paddingHorizontal: 10 }} />
            </TouchableOpacity>

            {/* Modal for updating shipment status */}
            <Modal
                transparent={true}
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Update Shipment Status</Text>
                        <Image style={{ width: 75, height: 75, marginTop: 20 }} source={require('../assets/images/shipping.png')} />
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={[
                                    styles.statusButton,
                                    styles.pendingButton,
                                    selectedStatus === 'Pending' && styles.selectedStatusButton
                                ]}
                                onPress={() => handleStatusSelection('Pending', '#f7cd23')}
                            >
                                <Image style={{ width: 30, height: 30, marginTop: 15 }} source={require('../assets/images/pending.png')} />
                                <Text style={styles.statusButtonText}>Pending</Text>
                                {selectedStatus === 'Pending' && (
                                    <Image style={styles.checkIcon} source={require('../assets/images/checkSymbol.png')} />
                                )}
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.statusButton,
                                    styles.inProgressButton,
                                    selectedStatus === 'In Progress' && styles.selectedStatusButton
                                ]}
                                onPress={() => handleStatusSelection('In Progress', 'blue')}
                            >
                                <Image style={{ width: 30, height: 30, marginTop: 15 }} source={require('../assets/images/progress.png')} />
                                <Text style={styles.statusButtonText}>In-Progress</Text>
                                {selectedStatus === 'In Progress' && (
                                    <Image style={styles.checkIcon} source={require('../assets/images/checkSymbol.png')} />
                                )}
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.statusButton,
                                    styles.deliveredButton,
                                    selectedStatus === 'Delivered' && styles.selectedStatusButton
                                ]}
                                onPress={() => handleStatusSelection('Delivered', 'green')}
                            >
                                <Image style={{ width: 30, height: 30, marginTop: 15 }} source={require('../assets/images/delivered.png')} />
                                <Text style={styles.statusButtonText}>Delivered</Text>
                                {selectedStatus === 'Delivered' && (
                                    <Image style={styles.checkIcon} source={require('../assets/images/checkSymbol.png')} />
                                )}
                            </TouchableOpacity>
                        </View>
                        <View style={styles.actionButtonsContainer}>
                            <Pressable style={styles.cancelButton} onPress={handleCancel}>
                                <Text style={styles.actionButtonText}>Cancel</Text>
                            </Pressable>
                            <Pressable style={[styles.actionButton, styles.updateButtonRed]} onPress={handleUpdate}>
                                <Text style={styles.actionButtonText}>Update</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

export default CustomerDashboard;

const styles = StyleSheet.create({
    TopContainer: {
        width: '100%',
        height: 200,
        backgroundColor: '#cd220b',
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
    },
    userName: {
        color: 'white',
        fontWeight: '800',
        fontSize: 22,
        marginLeft: 18,
        marginTop: 12,
        marginBottom: 20
    },
    totalShip: {
        color: 'white',
        marginTop: 4,
        fontWeight: '800',
        fontSize: 12
    },
    allShipment: {
        marginHorizontal: 15,
        marginTop: 25,
        color: 'black',
        fontWeight: '500'
    },
    cardContainer: {
        borderWidth: 1.5,
        borderColor: '#cd220b',
        marginHorizontal: 15,
        borderRadius: 10,
        marginTop: 20,
        backgroundColor: 'white',
    },
    cardHeader: {
        backgroundColor: '#cd220b',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10
    },
    cardHeaderText: {
        fontSize: 15,
        color: 'white',
        alignSelf: 'center'
    },
    cardHeaderTextBold: {
        fontWeight: '800'
    },
    cardView: {
        paddingHorizontal: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15,
        borderRadius: 8,
    },
    cardHeading: {
        backgroundColor: '#cd220b',
        color: 'white',
        borderRadius: 8,
        fontSize: 13,
        paddingHorizontal: 7
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingBottom: 12
    },
    updateButton: {
        backgroundColor: '#cd220b',
        borderRadius: 20,
        paddingHorizontal: 25,
        paddingVertical: 7
    },
    updateButtonText: {
        color: 'white',
        fontWeight: '500'
    },
    statusContainer: {
        alignSelf: 'center',
        paddingHorizontal: 15,
        paddingVertical: 6,
        borderRadius: 25,
    },
    statusText: {
        fontSize: 14,
        color: 'white',
        fontWeight: '500'
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalContainer: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10,
        color: 'black'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 35,
    },
    statusButton: {
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    statusButtonText: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: '500',
        color: 'black'
    },
    selectedStatusButton: {
        borderColor: 'green',
        borderWidth: 2,
        borderRadius: 10,
    },
    checkIcon: {
        width: 20,
        height: 20,
        marginTop: 5,
        marginBottom: 10,
    },
    actionButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30,
        width: '100%',

    },
    cancelButton: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'gray',
        marginRight: 10,
        width: '50%'
    },
    actionButton: {
        padding: 10,
        borderRadius: 10,
        width: '50%'
    },
    updateButtonRed: {
        backgroundColor: 'red',
    },
    actionButtonText: {
        color: 'white',
        fontWeight: '500',
        alignSelf: 'center'
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

});
