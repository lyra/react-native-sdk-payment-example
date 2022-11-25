export default {
  //FIXME: Change by your public key
  publicKey: "<REPLACE_ME>",

  //FIXME: Change by the right REST API Server Name (available in merchant BO: Settings->Shop->REST API Keys)
  apiServerName: "<REPLACE_ME>",

  // FIXME: change by the right merchant payment server url
  merchantServerUrl: "<REPLACE_ME>",

  //Customer Informations
  // Change by the desired parameters if necessary
  email: "customeremail@domain.com",
  customerReference: "customerRef",

  // Payment parameters
  // Change by the desired parameters if necessary
  amount: "100",
  currency: "EUR",
  orderId: "Order-123",

  // Environment TEST or PRODUCTION, refer to documentation for more information
  // FIXME: change by your targeted environment
  paymentMode: "TEST",
};
