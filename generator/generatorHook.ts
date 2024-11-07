import { NodePlopAPI } from 'plop';

interface Answers {
    filename: string;
    hookName?: string;
}
export default function (plop: NodePlopAPI) {
    plop.setActionType('createHookName', (answers) => {
        const typedAnswers = answers as Answers;

        if (!typedAnswers.filename || typedAnswers.filename.trim() === '') {
            throw new Error('filename is required');
        }

        let hookName = '';
        typedAnswers.filename
            .split(' ')
            .filter((word) => word.trim() !== '')
            .forEach((str) => {
                hookName += str.charAt(0).toUpperCase() + str.slice(1);
            });

        typedAnswers.hookName = hookName;

        typedAnswers.filename = hookName;
        return 'Hook name created successfully';
    });

    plop.setGenerator('component', {
        description: 'Hook using TypeScript',
        prompts: [
            {
                type: 'input',
                name: 'filename',
                message: 'Hook name: ',
            },
        ],
        actions: [
            {
                type: 'createHookName',
            },
            {
                type: 'add',
                path: `src/hooks/{{lowerCase hookName}}/{{hookName}}.ts`,
                templateFile: 'templates/hooks/hook.hbs',
            },
            {
                type: 'add',
                path: `src/hooks/{{hookName}}/lib/types.ts`,
            },
        ],
    });
}
