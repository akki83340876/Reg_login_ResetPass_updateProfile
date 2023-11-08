const db = require("../config/connection");
const User = db.User;
const fs = require("fs");
const path = require("path");



//Edit profile details
module.exports.update_profile_details = async (req, res) => {
    const form = await import("formidable").then(module =>
        new module.IncomingForm({ keepExtensions: true }));

    form.parse(req, async (err, fields, files) => {

        const id = fields.id
        const name = fields.name;
        const email = fields.email;
        const password = fields.password;
        const image = files.image
        const is_admin = fields.is_admin;
        const is_verified = fields.is_verified
        const status = fields.status

        var newFileName;
        var oldpath;
        var newpath;
        const image_name = image[0].originalFilename
        const image_path = image[0].filepath


        if (files.image) {
            if (image_name) {
                newFileName = image_name;
                oldpath = image_path;
                newpath = path.join(__dirname,'../public/uploads/picture',newFileName);
                console.log(newpath)
                fs.rename(oldpath, newpath, async function (next, err) {
                    if (err) {
                        return next(err);
                    }
                })
            }
        }

        if (!id[0]) {
            return res.status(400).json({ status: false, message: "Id Is Not Available" })
        }

        const Check_id = await User.findOne({
            where: { id: id[0] }
        })

        if (!Check_id) {
            return res.status(400).json({ status: false, message: "Admin Is Not Available" })
        }
        else {
            const new_data = await User.update({
                name: name[0],
                email: email[0],
                password: password[0],
                is_admin: is_admin[0],
                is_verified:is_verified[0],
                status : status [0],
                image: newFileName,
            },
                {
                    where: { id: id[0] }
                }
            )
            const new_data1 = await User.findOne({
                where: { id: id[0] }
            })
            if (new_data1) {
                return res.json({ status: true, message: "Admin updated Successfully", data: new_data1[0] })
            } else {
                return res.json({ status: false, message: "Unable to update the Admin" })
            }

        }
    });
}


// hbhbh