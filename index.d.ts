import * as soap from 'soap';
export declare class Client {
    private serialNumber;
    private password;
    private sessionKey?;
    private gatewayUrl;
    private timeout;
    private soapClient;
    constructor(opts: Options);
    getClient(): Promise<soap.Client>;
    /**
     * 登录
     * @param {string} sessionKey
     * @returns {Promise<any>}
     */
    login(sessionKey?: string): Promise<any>;
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
    sendSMS(phone: string | string[], message: string, sendTime?: string, addSerial?: string, charset?: string, priority?: number, smsId?: number): Promise<any>;
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
    sendVoice(phone: string | string[], code: number, sendTime?: string, addSerial?: string, charset?: string, priority?: number, smsId?: number): Promise<any>;
    /**
     * 查询余额
     * @returns {Promise<void>}
     */
    getBalance(): Promise<any>;
    /**
     * 查询每条短信价格
     * @returns {Promise<void>}
     */
    getEachFee(): Promise<any>;
}
export interface Options {
    serialNumber: string;
    password: string;
    sessionKey?: string;
    gatewayUrl?: string;
    timeout?: number;
}
