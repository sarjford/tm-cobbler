const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const crypto = require('crypto');
const cookie = require('cookie');
const nonce = require('nonce')();
const querystring = require('querystring');
const request = require('request-promise');
const promise = require('bluebird');

const apiKey = process.env.SHOPIFY_API_KEY;
const apiSecret = process.env.SHOPIFY_API_SECRET;
const scopes = 'write_content, write_themes, write_products, read_customers, write_customers, unauthenticated_write_customers, read_orders';

const forwardingAddress = "https://4cfb0fbc.ngrok.io"; // Replace later with HTTPS Forwarding address

const url = 'https://4cfb0fbc.ngrok.io/shopify?shop=tamara-dev.myshopify.com';

const accessToken = process.env.ACCESS_TOKEN;


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
    // DONE: Validate request is from Shopify
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

    // DONE: Exchange temporary code for a permanent access token
    const accessTokenRequestUrl = 'https://' + shop + '/admin/oauth/access_token';
    const accessTokenPayload = {
      client_id: apiKey,
      client_secret: apiSecret,
      code,
    };

    request.post(accessTokenRequestUrl, { json: accessTokenPayload })
    .then((accessTokenResponse) => {
      const accessToken = accessTokenResponse.access_token;
      // DONE: Use access token to make API call to 'shop' endpoint
      const shopRequestUrl = 'https://' + shop + '/admin/customers/6738810709/orders.json';
      const shopRequestHeaders = {
        'X-Shopify-Access-Token': accessToken,
      };
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
  // console.log('req.query', req.query.email);
  // lisa@lsregan.com

  const shopRequestUrl = 'https://tamara-dev.myshopify.com/admin/';
  const shopRequestHeaders = { 'X-Shopify-Access-Token': accessToken, };

  request.get(shopRequestUrl + 'customers/search.json?query=' + req.query.email, { headers: shopRequestHeaders })

    .then((userData) => {
      const parsedUserData = JSON.parse(userData);
      // console.log(typeof parsedUserData)
      // console.log(parsedUserData.customers.length)
      if (parsedUserData.customers.length === 0) {
        return res.status(400).send('Invalid email address. No users associated with this email address');
      } else {
        const userId = parsedUserData.customers[0].id;
        return request.get(shopRequestUrl + '/customers/'+ userId +'/orders.json', { headers: shopRequestHeaders });
      }
    }).catch((error) => {
      console.log(error)
    })

    .then((rawOrderData) => {
      // console.log('raw order data', rawOrderData)
      const orderData = JSON.parse(rawOrderData);

      if (orderData.orders.length === 0){
        return res.status(400).send('Email address exists but no orders associated with this email address.');
      } else {
        // TO DO:
        // if (orderData.orders.length === 0) { }
        // add catch for returned item - don't add to object if it has returned notes
        let lineItems = orderData.orders.map(function(order){
          return order.line_items.map(function(line_item){
            return {
              variant: line_item.variant_id,
              product: line_item.product_id,
              name: line_item.title,
              price: line_item.price,
              options: line_item.variant_title,
              order: line_item.order_number,
              customer: order.customer.default_address,
              date: order.created_at
            }
          });
        }).reduce(function(a,b){ return a.concat(b); });

        return promise.map(lineItems, function(lineItem){
          return request.get(shopRequestUrl + '/products/'+ lineItem.product + '.json?fields=images,variants', { headers: shopRequestHeaders });
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
