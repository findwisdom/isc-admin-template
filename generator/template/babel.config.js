const plugins = [
    [
        'component',
        {
            libraryName: 'element-ui',
            styleLibraryName: 'theme-chalk'
        }
    ]
];
// 删除console.log
if (['production', 'prod'].includes(process.env.NODE_ENV)) {
    plugins.push('transform-remove-console');
}

module.exports = {
    presets: ['@vue/app'],
    plugins: plugins
};
