export default () => {
    return {
        order: [{ required: true, message: '必填', trigger: 'blur' }],
        name: [
            { required: true, message: '必填', trigger: 'blur' },
            { max: 10, message: '不超过10个汉字', trigger: 'blur' }
        ],
        description: [
            { required: true, message: '必填', trigger: 'blur' },
            { max: 50, message: '不超过50个汉字', trigger: 'blur' }
        ]
    };
};
