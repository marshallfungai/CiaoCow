import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Image, FlatList, Text, ToastAndroid, StyleSheet, Platform, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, images, styles } from '../themes';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import { windowHeight, windowWidth } from '../utils/Dimensions';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

type ImageData = {
    id: number;
    imageUrl: string;
};


type TCiacoCowData = {
    id: number;
    description: string;
    title: string;
    images: ImageData[];
};


export default function OrderScreen() {

    const baseUrl = 'https://ciaochow.plusnarrative.biz';
    const { userCredentials, logout } = useAuth();
    const [ciaoCowData, setCiaoCowData] = useState<TCiacoCowData[]>([]);
    const [randomMunchIndex, setRandomMunchIndex] = useState<number>(0);

    useLayoutEffect(() => {
        const token = userCredentials?.userToken ? userCredentials?.userToken : '';
        fetchData(token);
    }, []);


    const extractImageData = (imageData: any): ImageData[] => {
        const formattedImageData: ImageData[] = imageData.map((image: any) => ({
            id: image.id,
            imageUrl: baseUrl + image.attributes.url
        }));
        return formattedImageData;
    }


    const getRandomNumberInRangeExcept = (min: number, max: number, exceptIndex: number) => {
        let randomNum;
        do {
            randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
        } while (randomNum === exceptIndex);
        return randomNum;
    };

    async function fetchData(token: string) {
        try {
            const headers = new Headers();
            headers.append('token', 'bearer <' + token + '>');

            const requestOptions: RequestInit = {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            };

            const url = new URL('https://ciaochow.plusnarrative.biz/api/chows');
            url.searchParams.append('populate', '*');

            const response = await fetch(url.toString(), requestOptions);
            if (!response.ok) {
                throw Error('Failed to fetch data : ' + response.status + ' ' + response.text);
            }

            const data = await response.json();
            const munchData: TCiacoCowData[] = [];

            data.data.forEach((munch: any) => {
                const id: number = munch.id;
                const description: string = munch.attributes.Description;
                const title: string = munch.attributes.Title;
                const createdAt = munch.attributes.createdAt;
                const images: ImageData[] = extractImageData(munch.attributes.Image.data);

                const ciaoCowData: TCiacoCowData = {
                    id: id,
                    description: description,
                    title: title,
                    images: images,
                };
                munchData.push(ciaoCowData);
            });
            const index = getRandomNumberInRangeExcept(0, munchData.length - 1, randomMunchIndex);
            setRandomMunchIndex(index);
            setCiaoCowData(munchData);
            ToastAndroid.show('We got your MUNCHES !!', ToastAndroid.LONG);

        } catch (error: any) {
            if (error.response && error.response.data) {
                console.error('#4775:', error.response.data);
                ToastAndroid.show('#47756' + error.response.data, ToastAndroid.LONG);

            } else {
                console.error('#144401', error.message);
                ToastAndroid.show('#144001' + error.message, ToastAndroid.LONG);
            }
        }
    }

    const renderItem = ({ item }: { item: ImageData }) => (
        <Image source={{ uri: item.imageUrl }} style={orderStyles.orderImage} />
    );

    const randomize = () => {
        const index = getRandomNumberInRangeExcept(0, ciaoCowData.length - 1, randomMunchIndex);
        setRandomMunchIndex(index);
    }


    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'Description' },
        { key: 'second', title: 'Nutrition' },
    ]);

    if (ciaoCowData.length == 0) {
        return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator size='large' /></View>
    }

    const DescriptionTab = () => {
        return (
            <View style={[orderStyles.productInfoContainer, orderStyles.shadowBorder]}>

                <View style={orderStyles.infoContainer}>
                    <View>
                        <Text>{ciaoCowData[randomMunchIndex].description}</Text>
                    </View>
                </View>

                <View style={[orderStyles.buttonContainer, orderStyles.shadowBorder]}>
                    <Button buttonStyle={orderStyles.button} textStyle={orderStyles.buttonText} onPress={randomize}>
                        Nah! find Somthing else
                    </Button>
                </View>
            </View>
        );
    }

    const NutritionFactsTab = () => {
        return (
            <View style={styles.innerContainer}>
                <Text>Facts coming soon !</Text>
            </View>
        );
    }


    const renderScene = SceneMap({
        first: DescriptionTab,
        second: NutritionFactsTab,
    });

    return (
        <View style={orderStyles.container}>
            <Button buttonStyle={orderStyles.logoutButton} textStyle={{ fontSize: 10 }} onPress={logout}>Logout</Button>
            <FlatList
                data={ciaoCowData[randomMunchIndex].images}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={true}
                pagingEnabled
                style={orderStyles.flatList}
            />

            <View style={orderStyles.tabViewContainer}>
                <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={styles.title2}>{ciaoCowData[randomMunchIndex].title}</Text>
                    <Image source={images.likeIcon}></Image>
                </View>
                <TabView
                    style={orderStyles.tabView}
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={{ width: windowWidth }}
                    renderTabBar={props =>
                        <TabBar
                            {...props}
                            style={orderStyles.tabBar}
                            indicatorStyle={orderStyles.tabIndicator}
                            labelStyle={orderStyles.tabLabel}
                        />
                    }
                />
            </View>

        </View>
    );
}

const orderStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'column'
    },
    logoutButton: {
        width: 80,
        position: 'absolute',
        zIndex: 1,
        top: 10,
        right: 10
    },
    orderImage: {
        width: windowWidth,

    },
    flatList: {
        width: windowWidth,
        marginBottom: -20
    },
    tabBar: {
        backgroundColor: 'white',
        paddingBottom: 10
    },
    tabIndicator: {
        backgroundColor: colors.primary,
        paddingBottom: 10
    },
    tabLabel: {
        color: colors.primary,
    },
    tabViewContainer: {
        backgroundColor: 'white',
        height: windowHeight / 1.5,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingTop: 10,
    },
    tabView: {
        paddingTop: 10,
    },
    productInfoContainer: {
        justifyContent: 'space-between',
        backgroundColor: 'white',
        height: '100%',
        paddingTop: 10
    },
    shadowBorder: {
        shadowColor: '#000000',
        elevation: 2,
    },

    infoContainer: {
        paddingLeft: 10,
        paddingRight: 10
    },
    buttonContainer: {
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 20
    },
    button: {
        width: windowWidth - 50,
        backgroundColor: colors.primary,
        marginTop: 10,
        borderRadius: 10
    },
    buttonText: {
        color: "white",
        textAlign: 'center',
        fontSize: 18,
        fontWeight: "400"
    },
});

