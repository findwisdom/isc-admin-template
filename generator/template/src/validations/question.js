export default () => {
    return {
        content: [
            { required: true, message: '必填', trigger: 'blur' },
            { max: 50, message: '不超过50个汉字', trigger: 'blur' }
        ],
        answer: [
            { required: true, message: '必填', trigger: 'blur' },
            { max: 200, message: '不超过200个汉字', trigger: 'blur' }
        ]
    };
};
