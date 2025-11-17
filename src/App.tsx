import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Alert,
  SafeAreaView,
} from 'react-native';
import {
  initialize,
  getFormTokenVersion,
  process,
  getSdkVersion,
} from '@lyracom/react-native-sdk-payment-module';
import Config from './Config';
import {useCallback} from 'react';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'blue',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 10,
  },
  buttonLabel: {
    color: 'white',
    fontSize: 18,
  },
  sdkVersionLabel: {
    color: 'grey',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 8,
  },
});

export default function App() {
  /**
   * Uses this function for get the formToken (required param in SDK process method)
   */
  const getProcessPaymentContext = async () => {
    var formTokenVersion = getFormTokenVersion();

    const result = await fetch(Config.merchantServerUrl + '/createPayment', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: Config.amount,
        mode: Config.paymentMode,
        customer: {
          email: Config.email,
          reference: Config.customerReference,
        },
        currency: Config.currency,
        orderId: Config.orderId,
        formTokenVersion: formTokenVersion,
      }),
    });
    const json = await result.json();
    return json.answer.formToken;
  };

  /**
   * Uses this function to validate the payment using your server: check the response integrity by verifying the hash on your server.
   * @param {*} paymentResult  The result of SDK process method
   */
  const verifyPayment = async (paymentResult: any) => {
    return fetch(Config.merchantServerUrl + '/verifyResult', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentResult),
    });
  };

  const handlePay = useCallback(async () => {
    try {
      // 1.Initialize Payment SDK
      await initialize(Config.publicKey, {
        apiServerName: Config.apiServerName,
        applePayMerchantId: Config.applePayMerchantId,
      });

      // 2. Execute getProcessPaymentContext for get the formToken (required param in SDK process method)
      let formToken = await getProcessPaymentContext();

      // // 3. Call the PaymentSDK process method
      const result = await process(formToken!, {
        customHeaderLabel: 'Custom header',
      });

      //4. Verify the payment using your server
      verifyPayment(result)
        .then(response => {
          if (response.status !== 200) {
            Alert.alert('Payment verification request failed');
            return;
          }

          Alert.alert('Payment success');
        })
        .catch(() => {
          Alert.alert('Payment verification fail');
        });
    } catch (e) {
      Alert.alert('Error', '' + e);
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        <Pressable style={styles.button} onPress={handlePay}>
          <Text style={styles.buttonLabel}>Pay</Text>
        </Pressable>
      </View>
      <Text style={styles.sdkVersionLabel}>SdkVersion : {getSdkVersion()}</Text>
    </SafeAreaView>
  );
}
