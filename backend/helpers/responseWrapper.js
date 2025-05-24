const successResponse = ({ status = 200, data = {}, message = 'Success' }) => {
    return {
        success: true,
        status,
        data,
        message,
    };
};

const errorResponse = ({ status = 500, data = {}, message = 'An error occurred' }) => {
    return {
        success: false,
        status,
        data,
        message,
    };
};

module.exports = {
    successResponse,
    errorResponse,
};
