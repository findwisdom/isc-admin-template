/**
 * com-baudrate
 * @author ydr.me
 * @create 2019-08-15 16:08:27
 * @update 2019-08-15 16:08:27
 */

'use strict';

export const comBaudrateList = [
    '110',
    '300',
    '600',
    '1200',
    '2400',
    '4800',
    '9600',
    '14400',
    '19200',
    '38400',
    '56000',
    '57600',
    '115200',
    '128000',
    '256000'
];
export const comBaudrateOptions = comBaudrateList.map(item => {
    return {
        label: item,
        value: 'R_' + item
    };
});
