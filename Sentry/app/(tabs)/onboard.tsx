import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Home, Shield, Eye, Users, Clock, FileText, Plus } from 'lucide-react-native';



const OnboardScreen = () => {    
    const router = useRouter();

    const handleNavigation = (route: '/' | '/emergency' | '/index' | '/settings' | '/contacts' | '/fake-call') => {
        // Add type safety by checking if the route is valid
        router.replace(route as any);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={() => router.back()}>
                    <Text style={styles.backButton}>←</Text>
                </Pressable>
                <Text style={styles.headerTitle}>SafeGuard</Text>
            </View>

            <Text style={styles.title}>What is your primary concern?</Text>

            <View style={styles.gridContainer}>
                {/* Row 1 */}
                <View style={styles.row}>
                    <TouchableOpacity 
                        style={styles.gridItem}
                        onPress={() => handleNavigation('/emergency')}
                    >
                        <View style={styles.iconContainer}>
                            <Home size={24} color="#00BCD4" />
                        </View>
                        <Text style={styles.itemText}>Emerge</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.gridItem}
                        onPress={() => handleNavigation('/index')}
                    >
                        <View style={styles.iconContainer}>
                            <Shield size={24} color="#00BCD4" />
                        </View>
                        <Text style={styles.itemText}>Safety</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.gridItem}
                        onPress={() => handleNavigation('/settings')}
                    >
                        <View style={styles.iconContainer}>
                            <Eye size={24} color="#00BCD4" />
                        </View>
                        <Text style={styles.itemText}>Profile</Text>
                    </TouchableOpacity>
                </View>

                {/* Row 2 */}
                <View style={styles.row}>
                    <TouchableOpacity 
                        style={styles.gridItem}
                        onPress={() => handleNavigation('/contacts')}
                    >
                        <View style={styles.iconContainer}>
                            <Users size={24} color="#00BCD4" />
                        </View>
                        <Text style={styles.itemText}>Alerts</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.gridItem}
                        onPress={() => handleNavigation('/fake-call')}
                    >
                        <View style={styles.iconContainer}>
                            <Shield size={24} color="#00BCD4" />
                        </View>
                        <Text style={styles.itemText}>Incognit</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.gridItem}
                        onPress={() => handleNavigation('/index')}
                    >
                        <View style={styles.iconContainer}>
                            <Clock size={24} color="#00BCD4" />
                        </View>
                        <Text style={styles.itemText}>History</Text>
                    </TouchableOpacity>
                </View>

                {/* Row 3 */}
                <View style={styles.row}>
                    <TouchableOpacity 
                        style={styles.gridItem}
                        onPress={() => handleNavigation('/emergency')}
                    >
                        <View style={styles.iconContainer}>
                            <Shield size={24} color="#00BCD4" />
                        </View>
                        <Text style={styles.itemText}>Emerge</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.gridItem}
                        onPress={() => handleNavigation('/settings')}
                    >
                        <View style={styles.iconContainer}>
                            <FileText size={24} color="#00BCD4" />
                        </View>
                        <Text style={styles.itemText}>Logs</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.gridItem}
                        onPress={() => handleNavigation('/index')}
                    >
                        <View style={styles.iconContainer}>
                            <Plus size={24} color="#00BCD4" />
                        </View>
                        <Text style={styles.itemText}>Add</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity 
                style={styles.nextButton} 
                onPress={() => handleNavigation('/index')}
            >
                <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 40,
    },
    backButton: {
        fontSize: 24,
        marginRight: 16,
        color: '#212121',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#212121',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#212121',
        textAlign: 'center',
        marginBottom: 40,
    },
    gridContainer: {
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    gridItem: {
        width: '30%',
        alignItems: 'center',
    },
    iconContainer: {
        width: 60,
        height: 60,
        backgroundColor: '#F5F5F5',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    itemText: {
        fontSize: 14,
        color: '#757575',
        textAlign: 'center',
    },
    nextButton: {
        backgroundColor: '#00BCD4',
        paddingVertical: 15,
        borderRadius: 25,
        alignItems: 'center',
        marginTop: 20,
    },
    nextButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default OnboardScreen; 