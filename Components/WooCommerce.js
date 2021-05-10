import React from 'react'
import WooCommerceRestApi from 'react-native-woocommerce-api';

const WooCommerce = new WooCommerceRestApi({
    url: 'https://dropmarts.com/',
    ssl: true,
    consumerKey: 'ck_38f798996b5be278b517dd94482a95f7998168a9',
    consumerSecret: 'cs_e568f280fc709d3a1c147903a12aef4d51761f6f',
    wpAPI: true,
    version: 'wc/v3',
    queryStringAuth: true
  });

export default WooCommerce;
