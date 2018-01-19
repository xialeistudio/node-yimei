import * as soap from 'soap';

export class Client {
  private serialNumber: string;
  private password: string;
  private sessionKey?: string;
  private gatewayUrl = 'http://sdk4report.eucp.b2m.cn:8080/sdk/SDKService?wsdl';
  private timeout = 5000;

  private soapClient: soap.Client;

  constructor(opts: Options) {
    this.serialNumber = opts.serialNumber;
    this.password = opts.password;
    this.sessionKey = opts.sessionKey;
    this.gatewayUrl = opts.gatewayUrl || this.gatewayUrl;
    this.timeout = opts.timeout || this.timeout;
  }

  async getClient() {
    if (!this.soapClient) {
      this.soapClient = await soap.createClientAsync(this.gatewayUrl);
    }
    return this.soapClient;
  }

  /**
   * 登录
   * @param {string} sessionKey
   * @returns {Promise<any>}
   */
  async login(sessionKey?: string) {
    if (sessionKey) {
      this.sessionKey = sessionKey;
    }
    const params = { arg0: this.serialNumber, arg1: this.sessionKey, arg2: this.password };
    const client = await this.getClient();
    return client.registExAsync(params, { timeout: this.timeout });
  }

  /**
   * 发送语音
   * @param {string | string[]} phone
   * @param {string} message
   * @param {string} sendTime
   * @param {string} addSerial
   * @param {string} charset
   * @param {number} priority
   * @param {number} smsId
   * @returns {Promise<any>}
   */
  async sendSMS(phone: string | string[], message: string, sendTime = '', addSerial = '', charset = 'UTF-8', priority = 5, smsId = 8888) {
    if (typeof phone === 'string') {
      phone = [phone];
    }
    const params = {
      arg0: this.serialNumber,
      arg1: this.sessionKey,
      arg2: sendTime,
      arg3: phone,
      arg4: message,
      arg5: addSerial,
      arg6: charset,
      arg7: priority,
      arg8: smsId,
    };
    const client = await this.getClient();
    return client.sendSMSAsync(params, { timeout: this.timeout });
  }

  /**
   * 发送语音
   * @param {string | string[]} phone
   * @param {number} code
   * @param {string} sendTime
   * @param {string} addSerial
   * @param {string} charset
   * @param {number} priority
   * @param {number} smsId
   * @returns {Promise<any>}
   */
  async sendVoice(phone: string | string[], code: number, sendTime = '', addSerial = '', charset = 'UTF-8', priority = 5, smsId = 8888) {
    if (typeof phone === 'string') {
      phone = [phone];
    }
    const params = {
      arg0: this.serialNumber,
      arg1: this.sessionKey,
      arg2: sendTime,
      arg3: phone,
      arg4: code,
      arg5: addSerial,
      arg6: charset,
      arg7: priority,
      arg8: smsId,
    };
    const client = await this.getClient();
    return client.sendVoiceAsync(params, { timeout: this.timeout });
  }

  /**
   * 查询余额
   * @returns {Promise<void>}
   */
  async getBalance() {
    const client = await this.getClient();
    const params = {
      arg0: this.serialNumber,
      arg1: this.sessionKey,
    };
    return client.getBalanceAsync(params, { timeout: this.timeout });
  }

  /**
   * 查询每条短信价格
   * @returns {Promise<void>}
   */
  async getEachFee() {
    const client = await this.getClient();
    const params = {
      arg0: this.serialNumber,
      arg1: this.sessionKey,
    };
    return client.getEachFeeAsync(params, { timeout: this.timeout });
  }
}

export interface Options {
  serialNumber: string;
  password: string;
  sessionKey?: string;
  gatewayUrl?: string;
  timeout?: number;
}