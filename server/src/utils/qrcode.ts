import QRCode from "qrcode";

export const generateQR = async (userId: string, eventId: string) => {
  try {
    const qr = await QRCode.toDataURL(`{userId:${userId},eventId:${eventId}}`, {
      type: "image/png",
    });
    // console.log(await QRCode.toString('I am a pony!',{type:'terminal'}, function (err, url) {
    //     console.log(qr)
    //   }))
    return qr;
  } catch (err) {
    console.error(err);
  }
};
