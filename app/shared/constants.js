///////////////////////////////////////////////////////////////
// 	Expose Configurations
///////////////////////////////////////////////////////////////
module.exports = {

    // Data loading timeout definitions
    dataReadTimeouts: {
        TIMEOUT_HEATMAP_PINS_LOADING:       10000,
        TIMEOUT_HEATMAP_SUMMARY_GENERATION: 15000
    },

    apiErrorCodes: {
        /**
         * Request related error codes
         */
        request: {
            badRequest :    { code: 600, desc: 'Bad request'}
        },

        /**
         * Access permission related error codes
         */
        access: {
            authFailed :    { code: 601, desc: 'Authentication failed'},
            notAuthorized : { code: 602, desc: 'Not authorized'}
        },

        /**
         * Data read related error codes
         */
        dataService: {
            dataReadFailed: { code: 800, desc: 'Data read failed'}
        }

    }
};
