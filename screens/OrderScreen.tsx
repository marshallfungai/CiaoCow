import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { View, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../themes';

type ImageData = {
    id: number;
    imageUrl: string;
};

export default function OrderScreen() {

    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch('https://ciaocow/images'); // TODO: Connect to appropriate endpoint
                const data = await response.json();
                setImages(data.images);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchImages();
    }, []);

    const renderItem = ({ item }: { item: ImageData }) => (
        <Image source={{ uri: item.imageUrl }} style={styles.orderImage} />
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={images}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
            />
        </View>
    );
}

