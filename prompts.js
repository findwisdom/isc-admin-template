/**
 *
 * @authors liwb (you@example.org)
 * @date    2019-04-29 09:31
 * @version $ IIFE
 */
module.exports = [
    {
        name: 'application',
        type: 'list',
        message: 'Choose whether your app is a PC or a mobile(default:mobile)',
        choices: [
            {
                name: 'PC',
                value: 'pc'
            },
            {
                name: 'mobile',
                value: 'mobile'
            },
            {
                name: 'H5离线包',
                value: 'offline'
            }
        ],
        default: 'mobile'
    }
];