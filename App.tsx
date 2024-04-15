import * as React from 'react';

import config from './Config';

import {StyleSheet, View, Text, TouchableOpacity, Alert} from 'react-native';
import {
  getFormTokenVersion,
  initialize,
  process,
} from '@lyracom/react-native-sdk-payment-module';

export default function App() {
  /**
   * Uses this function for get the formToken (required param in SDK process method)
   */
  const getProcessPaymentContext = async () => {
    var formTokenVersion = getFormTokenVersion();
    return fetch(config.merchantServerUrl + '/createPayment', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: config.amount,
        mode: config.paymentMode,
        customer: {
          email: config.email,
          reference: config.customerReference,
        },
        currency: config.currency,
        orderId: config.orderId,
        formTokenVersion: formTokenVersion,
      }),
    })
      .then(result => result.json())
      .then(json => json.answer.formToken)
      .catch(error => {
        console.error(error);
      });
  };

  /**
   * Uses this function to validate the payment using your server: check the response integrity by verifying the hash on your server.
   * @param {*} paymentResult  The result of SDK process method
   */
  const verifyPayment = async (paymentResult: any) => {
    return fetch(config.merchantServerUrl + '/verifyResult', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: paymentResult,
    });
  };

  const executePayment = async () => {
    // 1.Initialize Payment SDK
    initialize(
      config.publicKey,
      {
        cardScanningEnabled: true,
        nfcEnabled: true,
        apiServerName: config.apiServerName,
      },
      async result => {
        // onError
        Alert.alert(result.error.errorMessage);
      },
    );

    // 2. Execute getProcessPaymentContext for get the formToken (required param in SDK process method)
    let formToken = await getProcessPaymentContext();

    // 3. Call the PaymentSDK process method
    process(
      formToken!,
      {},
      async result => {
        // onSuccess
        //4. Verify the payment using your server
        verifyPayment(result.response)
          .then(() => {
            Alert.alert('Payment success');
          })
          .catch(() => {
            Alert.alert('Payment verification fail');
          });
      },
      async result => {
        // onError
        Alert.alert(result.error.errorMessage);
      },
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={executePayment} style={styles.button}>
        <Text style={styles.button}>Pay</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  button: {
    backgroundColor: '#3775ba',
    color: '#FFFFFF',
    padding: 10,
    borderRadius: 1,
  },
});
