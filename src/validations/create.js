import { required } from '../utils/validators';

export default () => {
    return {
        businessKey: [{ required: true, message: '必填', trigger: 'blur' }],
        title: [
            { required: true, message: '必填', trigger: 'blur' },
            { max: 12, message: '不超过12个汉字', trigger: 'blur' }
        ],
        startTime: [{ required: true, message: '必填', trigger: 'blur' }],
        detail: [{ max: 255, message: '不超过255个汉字', trigger: 'blur' }],
        name: [{ validator: required(), message: '请输入业务类型名称' }]
    };
};
