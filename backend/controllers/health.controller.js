const mongoose = require('mongoose');

exports.testDBConnection = async (req, res, next) => {
    try {
        const state = mongoose.connection.readyState;

        /*
          0 = disconnected
          1 = connected
          2 = connecting
          3 = disconnecting
        */

        if (state === 1) {
            res.status(200).json({ message: 'MongoDB is connected!' });
        } else {
            res.status(500).json({ message: 'MongoDB is NOT connected', state });
        }
    } catch (err) {
        next(err);
    }
};
