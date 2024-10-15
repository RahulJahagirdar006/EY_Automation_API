// api.config.mjs
module.exports =  {
    // require: ['chai/register-expect'],
    spec: './test/DevEnv/functionality_1/**/*.js',
    reporter: 'mochawesome',
    timeout: 5000,
    recursive: true,
    exit: true
};

