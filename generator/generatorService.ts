import { NodePlopAPI } from 'plop';

interface Answers {
    filename: string;
    serviceName?: string;
}
export default function (plop: NodePlopAPI) {
    plop.setActionType('createServiceName', (answers) => {
        const typedAnswers = answers as Answers;

        if (!typedAnswers.filename || typedAnswers.filename.trim() === '') {
            throw new Error('filename is required');
        }

        let serviceName = '';
        typedAnswers.filename
            .split(' ')
            .filter((word) => word.trim() !== '')
            .forEach((str) => {
                serviceName += str.charAt(0).toUpperCase() + str.slice(1);
            });

        typedAnswers.serviceName = serviceName;

        typedAnswers.filename = serviceName;
        return 'Service name created successfully';
    });

    plop.setGenerator('component', {
        description: 'Service using TypeScript',
        prompts: [
            {
                type: 'input',
                name: 'filename',
                message: 'Service name: ',
            },
        ],
        actions: [
            {
                type: 'createServiceName',
            },
            {
                type: 'add',
                path: `src/services/{{lowerCase serviceName}}/{{serviceName}}.ts`,
                templateFile: 'templates/services/service.hbs',
            },
            {
                type: 'add',
                path: `src/services/{{serviceName}}/lib/types.ts`,
            },
        ],
    });
}
