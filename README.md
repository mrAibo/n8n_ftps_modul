# n8n FTPS Node

This is a custom node for [n8n](https://n8n.io/) that enables file transfers using FTPS (FTP over SSL/TLS). It provides a simple and integrated way to upload files to an FTPS server directly within your n8n workflows.

## Features

*   **FTPS Support:** Securely transfer files using explicit FTP over TLS.
*   **Simple Upload Operation:** Easily configure and execute file uploads.
*   **Credential Management:** Securely stores your FTPS server credentials within n8n.
*   **Easy Configuration:** Simple and intuitive node properties for local and remote file paths.

## Prerequisites

Before you begin, ensure you have the following installed:

*   [Node.js](https://nodejs.org/en/) (LTS version recommended)
*   [npm](https://www.npmjs.com/)
*   [Git](https://git-scm.com/)
*   A running n8n instance (or a local development setup).

## Installation

To use this node, you need to add it to your n8n development environment or a self-hosted n8n instance.

1.  **Clone the n8n Repository**
    If you don't have a local n8n development environment, clone the main repository:
    ```bash
    git clone https://github.com/n8n-io/n8n.git
    cd n8n
    ```

2.  **Install Dependencies**
    Install the base dependencies for n8n:
    ```bash
    npm install
    ```

3.  **Add the FTPS Node Files**
    *   Copy the `Ftps.node.ts` file into the `packages/nodes-base/nodes/Ftps/` directory.
    *   Copy the `FtpsApi.credentials.ts` file into the `packages/nodes-base/credentials/` directory.

4.  **Add the `basic-ftp` Dependency**
    Open the `packages/nodes-base/package.json` file and add `basic-ftp` to the `dependencies` section:
    ```json
    {
      ...
      "dependencies": {
        ...
        "basic-ftp": "^5.0.0",
        ...
      },
      ...
    }
    ```

5.  **Install the New Dependency and Build**
    Run the following commands from the root of your `n8n` directory to install the new package and rebuild n8n to include your custom node:
    ```bash
    npm install
    npm run build
    ```

6.  **Start n8n**
    Start your n8n instance in development mode:
    ```bash
    npm run start
    ```

## Usage

1.  **Start n8n** and open the UI (usually at `http://localhost:5678`).
2.  **Add Credentials:**
    *   Navigate to the "Credentials" section.
    *   Click "Add credential" and search for "FTPS API".
    *   Enter your server host, port, username, and password.
    *   Save the credentials.
3.  **Use the FTPS Node in a Workflow:**
    *   Create a new workflow.
    *   Add a new node and search for "FTPS".
    *   In the node's properties, select the credentials you just created.
    *   Specify the **Local File Path** of the file you want to upload.
    *   Specify the **Remote File Path** where the file should be saved on the server.
    *   Execute the node.

The node will then connect to the FTPS server and upload the specified file.

## Contributing

Contributions are welcome! If you have ideas for improvements or find a bug, please open an issue or submit a pull request.

## License

This project is licensed under the GNU License.
