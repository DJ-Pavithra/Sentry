import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
const SignInScreen = () => {    
    const router = useRouter();

    const handleSignIn = () => {
        // In a real app, you would handle authentication here
        // For now, we'll just navigate to the main app
        router.push('/onboard');
    };

    const handleGetStarted = () => {
        router.push('/onboard');
    };

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image 
                    source={require('../../assets/images/signin.png')} 
                    style={styles.image}
                    resizeMode="contain"
                />
            </View>

            <View style={styles.contentContainer}>
                <Text style={styles.title}>Welcome to{'\n'}Sentry, your</Text>
                <Text style={styles.subtitle}>
                    Stay safe with AI detection & emergency response features.
                </Text>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity 
                        style={[styles.button, styles.signInButton]} 
                        onPress={handleSignIn}
                    >
                        <Text style={styles.buttonText}>Sign in</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={[styles.button, styles.getStartedButton]} 
                        onPress={handleGetStarted}
                    >
                        <Text style={[styles.buttonText, styles.getStartedText]}>Get started</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.guestText}>
                    Explore features as a guest
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,    
        backgroundColor: '#FFFFFF',
    },
    imageContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5F5F5',
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
    },
    image: {
        width: '80%',
        height: '80%',
    },
    contentContainer: {
        flex: 1,
        padding: 24,
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#212121',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 16,
    },
    subtitle: {
        fontSize: 16,
        color: '#757575',
        textAlign: 'center',
        marginBottom: 32,
        paddingHorizontal: 20,
    },
    buttonContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
        paddingHorizontal: 20,
    },
    button: {
        flex: 1,
        paddingVertical: 15,
        borderRadius: 25,
        alignItems: 'center',
        marginHorizontal: 8,
    },
    signInButton: {
        backgroundColor: '#00BCD4',
    },
    getStartedButton: {
        backgroundColor: '#FFFFFF',
        borderWidth: 2,
        borderColor: '#00BCD4',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
    },
    getStartedText: {
        color: '#00BCD4',
    },
    guestText: {
        fontSize: 14,
        color: '#757575',
        textDecorationLine: 'underline',
    }
});

export default SignInScreen;