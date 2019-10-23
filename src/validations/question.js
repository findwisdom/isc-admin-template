export default () => {
    return {
        question: [{ required: true, message: '必填', trigger: 'blur' }],
        answer: [{ required: true, message: '必填', trigger: 'blur' }]
    };
};
