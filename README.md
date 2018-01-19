# 亿美短信

## Features

+ [x] sendSMS
+ [x] sendVoice
+ [x] getBalance
+ [x] getEachFee
+ [x] login

## Get Started

### Typescript Usage

```typescript
import {Client} from 'yimei';

(async()=>{
  const client = new Client({
      serialNumber: 'SERIAL_NUMBER',
      password: 'PASSWORD',
      sessionKey: 'SESSION_KEY', // optional,you can login after
      gatewayUrl: 'GATEWAY_URL', // optional
      timeout: 5000, // optional, default is 5000ms
  });
  
  const ret = await client.sendSMS(['13666666666','13777777777'],'验证码：1111');
  console.log(ret);
})();
```

### Javascript Usage

```javascript
    var Client = require('yimei').Client;

    var client = new Client({
        serialNumber: 'SERIAL_NUMBER',
        password: 'PASSWORD',
        sessionKey: 'SESSION_KEY', // optional,you can login after
        gatewayUrl: 'GATEWAY_URL', // optional
        timeout: 5000, // optional, default is 5000ms
    });
    
    client.sendSMS(['13666666666','13777777777'],'验证码：1111').then(console.log).catch(console.log);
```