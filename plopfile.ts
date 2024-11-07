import { NodePlopAPI } from 'plop';
import { generatorComponent, generatorHook, generatorService } from './generator';

export default function (plop: NodePlopAPI) {
    // Đăng ký các generator con
    generatorComponent(plop);
    generatorHook(plop);
    generatorService(plop);

    // Tạo generator chính để lựa chọn cấu hình
    plop.setGenerator('mainGenerator', {
        description: 'Chọn cấu hình để tạo: component, hook, hoặc service',
        prompts: [
            {
                type: 'list',
                name: 'configType',
                message: 'Bạn muốn tạo cấu hình nào?',
                choices: ['component', 'hook', 'service'],
            },
        ],
        actions: (data) => {
            // Dựa trên lựa chọn, gọi generator tương ứng
            const actions = [];
            if (data?.configType === 'component') {
                actions.push(...generatorComponent(plop));
            } else if (data?.configType === 'hook') {
                actions.push(...generatorHook(plop));
            } else if (data?.configType === 'service') {
                actions.push(...generatorService(plop));
            }
            return actions;
        },
    });
}
