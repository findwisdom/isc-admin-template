export default () => {
    return {
        title: [
            { required: true, message: '必填', trigger: 'blur' },
            { max: 20, message: '不超过20个汉字', trigger: 'blur' }
        ],
        description: [
            { required: true, message: '必填', trigger: 'blur' },
            { max: 150, message: '不超过150个汉字', trigger: 'blur' }
        ],
        order: [{ required: true, message: '必填', trigger: 'blur' }],
        picture: [{ required: true, message: '必填', trigger: 'blur' }],
        publishTime: [{ required: true, message: '必填', trigger: 'blur' }]
    };
};
