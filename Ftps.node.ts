
import { IExecuteFunctions } from 'n8n-core';
import {
    INodeExecutionData,
    INodeType,
    INodeTypeDescription,
    NodeOperationError,
} from 'n8n-workflow';
import * as ftp from 'basic-ftp';

export class Ftps implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'FTPS',
        name: 'ftps',
        icon: 'fa:ftp',
        group: ['transform'],
        version: 1,
        subtitle: '={{$parameter["operation"]}}',
        description: 'Transfer files via FTPS',
        defaults: {
            name: 'FTPS',
        },
        inputs: ['main'],
        outputs: ['main'],
        credentials: [
            {
                name: 'ftpsApi',
                required: true,
            },
        ],
        properties: [
            {
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                noDataExpression: true,
                options: [
                    {
                        name: 'Upload',
                        value: 'upload',
                        action: 'Upload a file',
                    },
                ],
                default: 'upload',
            },
            {
                displayName: 'Local File Path',
                name: 'localPath',
                type: 'string',
                default: '',
                required: true,
                description: 'The path to the local file to upload',
            },
            {
                displayName: 'Remote File Path',
                name: 'remotePath',
                type: 'string',
                default: '',
                required: true,
                description: 'The path on the server to upload the file to',
            },
        ],
    };

    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        const items = this.getInputData();
        const returnData: INodeExecutionData[] = [];

        for (let i = 0; i < items.length; i++) {
            const credentials = await this.getCredentials('ftpsApi');
            const localPath = this.getNodeParameter('localPath', i, '') as string;
            const remotePath = this.getNodeParameter('remotePath', i, '') as string;

            const client = new ftp.Client();
            client.ftp.verbose = true; // For debugging

            try {
                await client.access({
                    host: credentials.host as string,
                    user: credentials.user as string,
                    password: credentials.password as string,
                    secure: credentials.secure as boolean,
                    port: credentials.port as number,
                });

                await client.uploadFrom(localPath, remotePath);
                returnData.push({ json: { success: true, localPath, remotePath } });
            } catch (error) {
                if (this.continueOnFail()) {
                    returnData.push({ json: { error: error.message }, error: new NodeOperationError(this.getNode(), error) });
                    continue;
                }
                throw new NodeOperationError(this.getNode(), error);
            } finally {
                client.close();
            }
        }

        return this.prepareOutputData(returnData);
    }
}
