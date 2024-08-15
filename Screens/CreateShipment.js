import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import React, { useState, useRef } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AntDesign from 'react-native-vector-icons/AntDesign';

const CreateShipment = ({ navigation }) => {
    const [totalWeight, setTotalWeight] = useState("");
    const [totalSize, setTotalSize] = useState("");
    const [additionalInfo, setAdditionalInfo] = useState("");
    const scrollViewRef = useRef();

    const [weightOpen, setWeightOpen] = useState(false);
    const [sizeOpen, setSizeOpen] = useState(false);
    const [locationPickupOpen, setLocationPickupOpen] = useState(false);

    const [weightValue, setWeightValue] = useState(null);
    const [sizeValue, setSizeValue] = useState(null);
    const [locationPickupValue, setLocationPickupValue] = useState(null);

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleDateConfirm = (date) => {
        const dt = new Date(date);
        const formattedDate = dt.toISOString().split('T')[0].split('-').reverse().join('-');
        setSelectedDate(formattedDate);
        hideDatePicker();
    };

    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const handleTimeConfirm = (time) => {
        const dt = new Date(time);
        const formattedTime = dt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setSelectedTime(formattedTime);
        hideTimePicker();
    };

    const [weight, setWeight] = useState([
        { label: 'kg', value: 'kilograms' },
        { label: 'lb', value: 'pounds' },
        { label: 't', value: 'metric_tons' }
    ]);
    const [size, setSize] = useState([
        { label: 'm', value: 'meters' },
        { label: 'in', value: 'inches' },
        { label: 'ft', value: 'feet' }
    ]);
    const [locationPickup, setLocationPickup] = useState([
        { label: 'Kingdom Centre Tower', value: 'kingdom_centre_tower' },
        { label: 'Edge of the World', value: 'edge_of_the_world' },
        { label: 'Jeddah Corniche', value: 'jeddah_corniche' }
    ]);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView 
                ref={scrollViewRef} 
                showsVerticalScrollIndicator={false} 
                contentContainerStyle={{ paddingBottom: 50 }} // added bottom padding
            >
                <View style={styles.topHeadingView}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name='arrow-back-circle-sharp' color='#cd220b' size={30} />
                    </TouchableOpacity>
                    <Text style={styles.titleText}>Create Shipment</Text>
                </View>
                <Image style={styles.image} source={require('../assets/images/delivery.png')} />
                <View style={styles.inputView}>
                    <View style={styles.row}>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={styles.input}
                                placeholder='Enter Total Weight'
                                value={totalWeight}
                                onChangeText={setTotalWeight}
                                autoCorrect={false}
                                autoCapitalize='none'
                                placeholderTextColor='black'
                            />
                        </View>
                        <View style={[styles.dropdownWrapper, { zIndex: weightOpen ? 3000 : 1000 }]}>
                            <DropDownPicker
                                open={weightOpen}
                                onOpen={() => {
                                    setWeightOpen(true);
                                    setSizeOpen(false);
                                    setLocationPickupOpen(false);
                                }}
                                value={weightValue}
                                items={weight}
                                setOpen={setWeightOpen}
                                setValue={setWeightValue}
                                setItems={setWeight}
                                placeholder="Kg"
                                style={styles.input}
                                dropDownContainerStyle={styles.dropdownContainer}
                            />
                        </View>
                    </View>

                    <View style={styles.row}>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={styles.input}
                                placeholder='Enter Total Size'
                                value={totalSize}
                                onChangeText={setTotalSize}
                                autoCorrect={false}
                                autoCapitalize='none'
                                placeholderTextColor='black'
                            />
                        </View>
                        <View style={[styles.dropdownWrapper, { zIndex: sizeOpen ? 3000 : 1000 }]}>
                            <DropDownPicker
                                open={sizeOpen}
                                onOpen={() => {
                                    setWeightOpen(false);
                                    setSizeOpen(true);
                                    setLocationPickupOpen(false);
                                }}
                                value={sizeValue}
                                items={size}
                                setOpen={setSizeOpen}
                                setValue={setSizeValue}
                                setItems={setSize}
                                placeholder="m"
                                style={styles.input}
                                dropDownContainerStyle={styles.dropdownContainer}
                            />
                        </View>
                    </View>

                    <View style={[{ zIndex: locationPickupOpen ? 3000 : 1000 }]}>
                        <DropDownPicker
                            open={locationPickupOpen}
                            onOpen={() => {
                                setWeightOpen(false);
                                setSizeOpen(false);
                                setLocationPickupOpen(true);
                            }}
                            value={locationPickupValue}
                            items={locationPickup}
                            setOpen={setLocationPickupOpen}
                            setValue={setLocationPickupValue}
                            setItems={setLocationPickup}
                            placeholder="Select Pickup Location"
                            style={[styles.input, { marginTop: 10 }]}
                            dropDownContainerStyle={styles.dropdownContainer}
                        />
                    </View>

                    <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity onPress={showDatePicker} style={styles.datePicker}>
                            <Text style={styles.pickerText}>Set Delivery Date</Text>
                            <AntDesign name='down' color='black' size={17} style={{ alignSelf: 'center' }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={showTimePicker} style={styles.datePicker}>
                            <Text style={styles.pickerText}>Set Delivery Time</Text>
                            <AntDesign name='down' color='black' size={17} style={{ alignSelf: 'center' }} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.selectedDateTime}>
                        <Text style={styles.selectedDateTimeText}>{selectedDate}  {selectedTime}</Text>
                    </View>

                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleDateConfirm}
                        onCancel={hideDatePicker}
                    />
                    <DateTimePickerModal
                        isVisible={isTimePickerVisible}
                        mode="time"
                        onConfirm={handleTimeConfirm}
                        onCancel={hideTimePicker}
                    />

                    <TextInput
                        style={[styles.input, { height: 100, marginTop: 10 }]}
                        placeholder='Include any special requests......'
                        value={additionalInfo}
                        onChangeText={setAdditionalInfo}
                        autoCorrect={false}
                        autoCapitalize='none'
                        placeholderTextColor='black'
                        multiline={true}
                        onFocus={() => {
                            setTimeout(() => {
                                scrollViewRef.current.scrollToEnd({ animated: true });
                            }, 100);
                        }}
                    />

                </View>
                <TouchableOpacity style={styles.submitButton}>
                    <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

export default CreateShipment;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
    },
    topHeadingView: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 60,
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
        flex: 1,
    },
    image: {
        width: 120,
        height: 120,
        alignSelf: 'center',
        marginTop:20
    },
    inputView: {
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },
    inputWrapper: {
        flex: 0.75,
        marginRight: 10,
    },
    dropdownWrapper: {
        flex: 0.25,
        zIndex: 1,
    },
    input: {
        height: 50,
        paddingHorizontal: 10,
        borderColor: "#cd220b",
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: 'white',
    },
    dropdownContainer: {
        borderColor: "#cd220b",
    },
    datePicker: {
        height: 50,
        paddingHorizontal: 10,
        borderColor: "#cd220b",
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 0.48,
    },
    pickerText: {
        color: 'black',
        paddingVertical: 13,
    },
    selectedDateTime: {
        height: 50,
        paddingHorizontal: 10,
        borderRadius: 10,
        backgroundColor: '#deddd9',
        marginTop: 10,
    },
    selectedDateTimeText: {
        color: 'black',
        paddingVertical: 12,
        fontSize: 16,
        fontWeight: '500',
    },
    submitButton: {
        backgroundColor: "#cd220b",
        borderRadius: 8,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,  // Adjusted margin to be inside the ScrollView
        marginTop: 20, // Space between the button and the last input
    },
    submitButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500'
    }
});
