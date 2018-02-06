const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const crypto = require('crypto');
const cookie = require('cookie');
const nonce = require('nonce')();
const querystring = require('querystring');
const request = require('request-promise');
const promise = require('bluebird');
const ajax = require('superagent');
const bodyParser = require ('body-parser');


const apiKey = process.env.SHOPIFY_API_KEY;
const apiSecret = process.env.SHOPIFY_API_SECRET;
const scopes = 'write_content, write_themes, write_products, read_customers, write_customers, unauthenticated_write_customers, read_orders';

const forwardingAddress = "https://4cfb0fbc.ngrok.io"; // Replace later with HTTPS Forwarding address
const url = 'https://4cfb0fbc.ngrok.io/shopify?shop=tamara-dev.myshopify.com';

const accessToken = process.env.ACCESS_TOKEN;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/shopify', (req, res) => {
  const shop = req.query.shop;
  if (shop) {
    const state = nonce();
    const redirectUri = forwardingAddress + '/shopify/callback';
    const installUrl = 'https://' + shop +
      '/admin/oauth/authorize?client_id=' + apiKey +
      '&scope=' + scopes +
      '&state=' + state +
      '&redirect_uri=' + redirectUri;

    res.cookie('state', state);
    res.redirect(installUrl);
  } else {
    return res.status(400).send('Missing shop parameter. Please add ?shop=your-development-shop.myshopify.com to your request');
  }
});

app.get('/shopify/callback', (req, res) => {
  const { shop, hmac, code, state } = req.query;
  const stateCookie = cookie.parse(req.headers.cookie).state;

  if (state !== stateCookie) {
    return res.status(403).send('Request origin cannot be verified');
  }

  if (shop && hmac && code) {
    const map = Object.assign({}, req.query);
    delete map['signature'];
    delete map['hmac'];
    const message = querystring.stringify(map);
    const generatedHash = crypto
      .createHmac('sha256', apiSecret)
      .update(message)
      .digest('hex');

    if (generatedHash !== hmac) {
      return res.status(400).send('HMAC validation failed');
    }

    const accessTokenRequestUrl = 'https://' + shop + '/admin/oauth/access_token';
    const accessTokenPayload = {
      client_id: apiKey,
      client_secret: apiSecret,
      code,
    };

    request.post(accessTokenRequestUrl, { json: accessTokenPayload })
    .then((accessTokenResponse) => {
      const accessToken = accessTokenResponse.access_token;
      const shopRequestUrl = 'https://' + shop + '/admin/customers/6738810709/orders.json';
      const shopRequestHeaders = { 'X-Shopify-Access-Token': accessToken };
      request.get(shopRequestUrl, { headers: shopRequestHeaders })
      .then((shopResponse) => {
        res.status(200).end(shopResponse);
      })
      .catch((error) => {
        res.status(error.statusCode).send(error.error.error_description);
      });
    })
    .catch((error) => {
      res.status(error.statusCode).send(error.error.error_description);
    });

  } else {
    res.status(400).send('Required parameters missing');
  }
});

app.get('/user', (req, res) => {

  const shopRequestUrl = 'https://tamara-dev.myshopify.com/admin/';
  const shopRequestHeaders = { 'X-Shopify-Access-Token': accessToken, };

  request.get(shopRequestUrl + 'customers/search.json?query=' + req.query.email, { headers: shopRequestHeaders })
    .then((userData) => {
      const parsedUserData = JSON.parse(userData);
      if (parsedUserData.customers.length === 0) {
        return res.status(400).send('No customers associated with this email address.');
      } else {
        const userId = parsedUserData.customers[0].id;
        return request.get(shopRequestUrl + 'customers/'+ userId +'/orders.json?status=any', { headers: shopRequestHeaders });
      }
    }).catch((error) => {
      console.log(error);
    })

    .then((rawOrderData) => {
      const orderData = JSON.parse(rawOrderData);
      if (orderData.orders.length === 0){
        return res.status(400).send('Email address exists but no orders associated with this email address.');
      } else {
        // let lineItems = orderData.orders.map(function(order){
        //   return order.line_items.filter(function(line_item){
        //     return !!line_item.product_id && line_item.gift_card == false;
        //   }).map(function(line_item){
        //     return {
        //       variant: line_item.variant_id,
        //       product: line_item.product_id,
        //       name: line_item.title,
        //       price: line_item.price,
        //       options: line_item.variant_title,
        //       order: order.order_number,
        //       customer: order.customer.default_address,
        //       date: order.created_at,
        //       refunds: order.refunds
        //     }
        //   });
        // }).reduce(function(a,b){ return a.concat(b); });

        let lineItems = orderData.orders.map(function(order){
          return order.line_items.map(function(line_item){
              return {
                variant: line_item.variant_id,
                product: line_item.product_id,
                name: line_item.title,
                price: line_item.price,
                options: line_item.variant_title,
                order: order.order_number,
                customer: order.customer.default_address,
                date: order.created_at
              }
          });
        }).reduce(function(a,b){ return a.concat(b); });

        return promise.map(lineItems, function(lineItem){
          return request.get(shopRequestUrl + 'products/'+ lineItem.product + '.json?fields=images,variants', { headers: shopRequestHeaders });
        })

        .then((body) => {
            const parsedData = body.map(function(item){
              return JSON.parse(item);
            });

            // for (let i = 0; i < lineItems.length; i++){
            //   parsedData[i].product.variants.forEach(function(variant){
            //     if (lineItems[i].variant === variant.id){
            //       lineItems[i]['imageId'] = variant.image_id;
            //     }
            //   });
            // }
            //
            // for (let i = 0; i < lineItems.length; i++){
            //   parsedData[i].product.images.forEach(function(image){
            //     if (lineItems[i].imageId == image.id){
            //       lineItems[i]['imageSrc'] = image.src;
            //     }
            //   });
            // }

            function captureImgData(newProp, productProp, variantProp, resObjProp){
              for (let i = 0; i < lineItems.length; i++){
                parsedData[i].product[productProp].forEach(function(item){
                  if (lineItems[i][resObjProp] === item.id){
                    lineItems[i][newProp] = item[variantProp];
                  }
                });
              }
            }
            captureImgData('imageId', 'variants', 'image_id', 'variant');
            captureImgData('imageSrc', 'images', 'src', 'imageId');

            res.status(200).send(lineItems);
        }).catch((error) => {
          console.log(error);
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

app.post('/order', (req, res) => {

  let orderObject = req.body;
  ajax.post('https://orders.cobblerconcierge.com/api/partners/tm/orders')
    .send(orderObject)
    .set('Authorization', 'enzy9PvHnnuBJo2mHosLQQCq')
    .set('Accept', 'application/vnd.CcOps.v1, application/json')
    .set('Content-Type', 'application/json')
    .then(function(response) {
      console.log(response)
      res.send(response);
    })
    .catch((error) => {
      console.log(error)
      res.send(error);
    });
});
