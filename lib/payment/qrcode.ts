import QRCode from "qrcode";


export async function generatePaymentQR({

orderId,

amount,

}:{

orderId:string;

amount:number;

}){


const payload = JSON.stringify({

merchant:"TrafficSaaS",

orderId,

amount,

});


const qrCodeUrl =
await QRCode.toDataURL(payload);


return qrCodeUrl;


}