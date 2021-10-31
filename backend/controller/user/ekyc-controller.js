const User = require('../../models/user');
const UserData = require('../../models/userData');
const xml2js = require('xml2js');

module.exports.ekyc = async function (req, res) {
    const { name, otp, UID } = req.body
    let aadhar = await User.findOne({ uid: UID });
    let txnid = aadhar.txnid;

    console.log(UID);
    console.log(txnid);
    console.log(otp);


    otpRequest(UID, name, txnid, otp, function (result) {
        let ekycData = result;
        let ekycStatus = result.status;

        // console.log("1, ", ekycData.data.KycRes.UidData[0].Poi[0].$);
        // console.log("2, ", ekycData.data.KycRes.UidData[0].Poa[0].$);
        // console.log("2, ", ekycData.data.KycRes.UidData[0].Pht[0]);

        if (ekycStatus == "n" || ekycStatus == 'N')
            return res.status(401).send("Invalid OTP");

        if (name == "landlord") {
            return res
                .status(200)
                .send()
        }

        if (ekycStatus == 'y' || ekycStatus == 'Y') {

            // UserData.findOne({uid: UID}, function(err, user){
            //   if(err){console.log('error in finding user'); return;}

            //   if(!user){
            //       User.create({
            //         uid: UID,

            //       }, 
            //       function(error){
            //         if(error){console.log('error in creating user', error); return;}
            //       })

            //   }  else {
            //       console.log("user exists");
            //   }
            // });

            return res.json({
                status: 200,
                data: ekycData,
                message: "Logged in Successfully"
            });
        }

        return res.status(404).send("Some error Occured!");
    });

};

function otpRequest(UID, name, txnid, otp, cb) {
    var Url = "https://stage1.uidai.gov.in/onlineekyc/getEkyc/";

    var XMLHttpRequest = require('xhr2');
    var xhr = new XMLHttpRequest();

    let data = JSON.stringify({
        "uid": UID,
        "txnId": txnid,
        "otp": otp,
    });

    xhr.open('POST', Url);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');



    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(xhr.responseText);

            let response = JSON.parse(xhr.responseText);
            let responseData = "";
            let result;

            if ((response.status == 'Y' || response.status == 'y')) {
                let x = response.eKycString;

                xml2js.parseString(x, (err, result) => {
                    if (err) {
                        throw err;
                    }

                    // `result` is a JavaScript object
                    // convert it to a JSON string
                    responseData = JSON.stringify(result, null, 4);
                    const Data = JSON.parse(responseData);
                    const info = Data.KycRes.UidData[0].Poi[0].$;
                    const address = Data.KycRes.UidData[0].Poa[0].$;
                    const photo = Data.KycRes.UidData[0].Pht[0];

                    // log JSON string
                    responseData = { info, address, photo };
                    //console.log("err" , responseData);

                });

            } else {

                responseData = response;

            }

            let finalResult = {
                status: response.status,
                data: responseData,
            }
            console.log("err", finalResult);
            if (typeof cb === 'function') cb(finalResult);
        }
    };

    xhr.send(data);

}