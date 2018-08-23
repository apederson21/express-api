'use strict';

const   crypto = require('../../utils/crypto'),
        errorBuilder = require('../../errors/error_builder'),
        utils = require('../../utils/utils'),
        validation = require('../../utils/validation');

/**
 * add user to database
 */
module.exports = (app) => {
    app.post('/add-user', (req, res) => {
        let keysToValidate = [
            {
                key: 'email',
                required: true
            },
            {
                key: 'password',
                required: true
            }
        ];
        
        let valResult = validation.areInputsValid(keysToValidate, req.body);

        if (utils.get(valResult, ['error', 'code'])) {
            return res.status(utils.get(valResult, ['error', 'code'])).send(valResult);
        }

        addUser(req.body.email, req.body.password)
            .then(() => {
                return res.status(200).send({});
            })
            .catch((err) => {
                return res.status(500).send(errorBuilder.buildErrorObject(500, [{
                    code: 'DATABASE_ERROR',
                    message: err
                }]));
            });
    });

    let addUser = (email, password) => {
        return new Promise((resolve, reject) => {
            const AWS = require("aws-sdk");

            AWS.config.update({
                region: "us-west-2",
                endpoint: "https://dynamodb.us-west-2.amazonaws.com"
            });

            const   date = new Date(),
                    docClient = new AWS.DynamoDB.DocumentClient(),
                    table = 'users';

            var params = {
                TableName: table,
                Item:{
                    email: crypto.encrypt(email),
                    password: crypto.encrypt(password),
                    dates : {
                        created: `${date.getMonth()}-${date.getDate()}-${date.getFullYear()}`,
                        updated: `${date.getMonth()}-${date.getDate()}-${date.getFullYear()}`,
                    }
                }
            };

            docClient.put(params, (err, data) => {
                if (err) {
                    reject(JSON.stringify(err, null, 2));
                }
                resolve();
            });
        });
    }
};
