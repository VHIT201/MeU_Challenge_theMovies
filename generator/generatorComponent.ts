import { NodePlopAPI } from 'plop';

interface Answers {
    filename: string;
    componentName?: string;
}
export default function (plop: NodePlopAPI) {
    plop.setActionType('createComponentName', (answers) => {
        const typedAnswers = answers as Answers;

        if (!typedAnswers.filename || typedAnswers.filename.trim() === '') {
            throw new Error('filename is required');
        }

        let componentName = '';
        typedAnswers.filename
            .split(' ')
            .filter((word) => word.trim() !== '')
            .forEach((str) => {
                componentName += str.charAt(0).toUpperCase() + str.slice(1);
            });

        typedAnswers.componentName = componentName;

        typedAnswers.filename = componentName;
        return 'Component name created successfully';
    });

    plop.setGenerator('component', {
        description: 'React component using TypeScript',
        prompts: [
            {
                type: 'input',
                name: 'filename',
                message: 'Component name: ',
            },
        ],
        actions: [
            {
                type: 'createComponentName',
            },
            {
                type: 'add',
                path: `src/components/{{componentName}}/{{componentName}}.tsx`,
                templateFile: 'templates/components/component.hbs',
            },
            {
                type: 'add',
                path: `src/components/{{componentName}}/lib/types.ts`,
            },
        ],
    });
}
