/**
 * Created by stefan.bley on 21.10.2016.
 */

const Eureka = require('eureka-js-client').Eureka;

// spring cloud configuration
const client = new Eureka({
    // application instance information
    instance: {
        app: 'node-campus',
        hostName: 'localhost',
        ipAddr: '127.0.0.1',
        port: {
            '$': 3000,
            '@enabled': 'true',
        },
        vipAddress: 'localhost',
        statusPageUrl: 'http://localhost:3000',
        dataCenterInfo: {
            '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
            name: 'MyOwn',
        },
    },
    // eureka server
    eureka: {
        host: 'localhost',
        port: 8761,
        servicePath: '/eureka/apps/'
    },
});

module.exports = client;
