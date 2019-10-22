export default () => {
    return {
        date: [{ required: true, message: '必填', trigger: 'blur' }],
        event: [
            { required: true, message: '必填', trigger: 'blur' },
            { max: 30, message: '不超过30个汉字', trigger: 'blur' }
        ]
    };
};
