const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        email: {
            type: String,
            unique: true,
        },
        fullName: String,
        avatar: String,
        providerData: {
            uid: String,
            provider: String,
        },
    },
    {
        timestamp: true
    }
); 

userSchema.statics.findOrCreate = async function (args) {
    try {
        const user = await this.findOne({
            email: args.email,
            fullName: args.fullName,
        });

        if(!user) {
            return await this.create(args);
        }

        return user;
    } catch(err) {
        return err;
    }
};

module.exports = mongoose.model('User', userSchema);