
import { ICredentialType, INodeProperties } from 'n8n-workflow';

export class FtpsApi implements ICredentialType {
    name = 'ftpsApi';
    displayName = 'FTPS API';
    documentationUrl = 'https://docs.n8n.io/integrations/creating-nodes/build/declarative-style-node/'; // Replace with your documentation URL
    properties: INodeProperties[] = [
        {
            displayName: 'Host',
            name: 'host',
            type: 'string',
            default: '',
            placeholder: 'ftps.example.com',
        },
        {
            displayName: 'Port',
            name: 'port',
            type: 'number',
            default: 21,
        },
        {
            displayName: 'User',
            name: 'user',
            type: 'string',
            default: '',
        },
        {
            displayName: 'Password',
            name: 'password',
            type: 'string',
            typeOptions: {
                password: true,
            },
            default: '',
        },
        {
            displayName: 'Secure',
            name: 'secure',
            type: 'boolean',
            description: 'Whether to use FTPS (explicit FTP over TLS)',
            default: true,
        },
    ];
}
