export default () => {
    return {
        title: [{ required: true, message: '必填', trigger: 'blur' }],
        intro: [
            { required: true, message: '必填', trigger: 'blur' },
            { max: 30, message: '不超过30个汉字', trigger: 'blur' }
        ],
        order: [{ required: true, message: '必填', trigger: 'blur' }],
        cover: [{ required: true, message: '必填', trigger: 'blur' }]
    };
};
