# React Native SDK payment example

## Summary

The aim of this repository is to explain how to integrate our Payment Mobile SDK into a React Native application.

## Table of contents

- [Payment Mobile SDK integration example](#react-native-sdk-payment-example)
  - [Summary](#summary)
  - [Table of contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Getting started](#getting-started)
    - [Execute this sample](#execute-this-sample)
  - [Troubleshooting](#troubleshooting)
  - [Copyright and license](#copyright-and-license)

## Prerequisites

In order to be able to perform a successful payment with our Mobile SDK you must have:

- A contract with your Payment service provider
- A deployed server capable to communicate with the payment platform, in order to verify data and create the payment session (please check out java server sample or the integration documentation for more information).
- Your public key to initialize the SDK. This key can be found in the merchant back-office in Settings -> Shop -> API -> REST API Keys
- Your REST API Server Name to initialize the SDK. This key can be found in the merchant back-office in Settings -> Shop -> API -> REST API Keys

Attention: The sdk and its dependencies must be installed as dynamic

## Documentation

Please check our documentation to understand how to integrate our SDK in your React Native application -> https://payzen.io/fr-FR/mobp/integration_guide/react_native/

## Getting started

### Execute this sample

1. Clone the repo, `git clone git@github.com:lyra/react-native-sdk-payment-example.git`.

2. Open the project under your IDE like Visual Studio Code.

3. Edit the following fields in `Config.ts`

   - merchantServerUrl: replace by your merchant server Url.
   - publicKey: replace with your public key that you can find in your back-office.
   - apiServerName: replace with your REST API server name that you can find in your back-office.

4. Run "yarn"

5. Run "yarn pods"

6. Run "yarn ios" or "yarn android" and that's all! :)

## Troubleshooting

Check official integration documentation in order to check all possible error codes.

## Copyright and license

    The MIT License

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.
