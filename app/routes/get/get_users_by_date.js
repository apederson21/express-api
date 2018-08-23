'use strict';

const   crypto = require('../../utils/crypto'),
        errorBuilder = require('../../errors/error_builder'),
        utils = require('../../utils/utils'),
        validation = require('../../utils/validation');

module.exports = (app) => {
    app.get('/get-user-by-email', (req, res) => {
        let keysToValidate = [
            {
                key: 'email',
                required: true
            }
        ];

        let valResult = validation.areInputsValid(keysToValidate, req.query);

        if (utils.get(valResult, ['error', 'code'])) {
            return res.status(utils.get(valResult, ['error', 'code'])).send(valResult);
        }

        getUser(req.query.email)
            .then((data) => {
                let count = utils.get(data, ['Count']);
                if (!count || count === 0) {
                    return res.status(400).send(errorBuilder.buildErrorObject(400, [{
                        code: 'INVALID_EMAIL',
                        message: 'User not found'
                    }]));
                }
                return res.status(200).send(data);
            })
            .catch((err) => {
                return res.status(500).send(errorBuilder.buildErrorObject(500, [{
                    code: 'DATABASE_ERROR',
                    message: err
                }]));
            });
    });

    let getUser = (email) => {
        return new Promise((resolve, reject) => {
            const AWS = require('aws-sdk');

            AWS.config.update({
                region: 'us-west-2',
                endpoint: 'https://dynamodb.us-west-2.amazonaws.com'
            });

            const   docClient = new AWS.DynamoDB.DocumentClient(),
                    table = 'users';

            
            var params = {
                TableName : table,
                ProjectionExpression: 'dates',
                KeyConditionExpression: '#email = :email',
                ExpressionAttributeNames:{
                    '#email': 'email'
                },
                ExpressionAttributeValues: {
                    ':email': crypto.encrypt(email)
                }
            };
            
            docClient.query(params, (err, data) => {
                if (err) {
                    reject(JSON.stringify(err, null, 2));
                }
                resolve(data);
            });
        });
    }
};
