const UserData = require('../../models/userData');

module.exports.update = async function (req, res) {
    const { UID, house } = req.body
    const user = await UserData.findOne({ uid: UID });
    console.log(UID);
    console.log(house);

    UserData.findOne({ uid: UID }, function (err, user) {
        if (err) { console.log('error in finding user'); return; }
        console.log("user exists");
        user.house = house;
        user.save();
    });

    return res.json({
        status: 200,
        data: {
            data: user,
            message: "Address Updated Successfully!",
        },
    });
};