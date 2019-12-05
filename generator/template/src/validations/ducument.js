export default () => {
    return {
        link: [{ required: true, message: '必填', trigger: 'blur' }],
        name: [
            { required: true, message: '必填', trigger: 'blur' },
            { max: 20, message: '不超过20个汉字', trigger: 'blur' }
        ],
        description: [
            { required: true, message: '必填', trigger: 'blur' },
            { max: 150, message: '不超过150个汉字', trigger: 'blur' }
        ]
    };
};
