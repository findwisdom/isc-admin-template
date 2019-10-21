export default () => {
    return {
        date: [{ required: true, message: '必填', trigger: 'blur' }],
        event: [
            { required: true, message: '必填', trigger: 'blur' },
            { max: 60, message: '不超过60个汉字', trigger: 'blur' }
        ]
    };
};
