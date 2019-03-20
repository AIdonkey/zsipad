interface Chargeparam {
    yyid00: string;
    tjh000: string;
    zjbh00: string;
    amount: string;
    accountType: string;
}
interface Tradeparam {
    outTradeNo: string;
    tjh000: string;
    zjbh00: string;
    amount: string;
    jflx00: string;
    yyid00: string;
}
class Charge implements Chargeparam{
    currentTime: number;
    yyid00: string;
    tjh000: string;
    zjbh00: string;
    amount: string;
    accountType: string;
    constructor(yyid00: string, tjh000: string, zjbh00: string, amount: string, accountType: string) {

    }
    createPay(params: Chargeparam) {
        let body = JSON.stringify(params);
        fetch(`/api/yjzzjManager/service/pay/recharge.htm`, {
            method: 'post',
            body: body, 
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json()).then(response => {
            console.log(response);
        })
    }
    tradeQuery(params: Tradeparam) {
        let body = JSON.stringify(params);
        fetch(`/api/yjzzjManager/service/pay/tradeQuery.htm`, {
            method: 'post',
            body: body,
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json()).then(response => {
            console.log(response);
        })
    }
}
function createPay(config:string): string {
    return '123';
}
function tradeQuery(:type) {
    
}