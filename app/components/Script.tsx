import React from 'react';
import fs from 'fs';
import { PythonShell } from 'python-shell';
import MonacoEditor from 'react-monaco-editor';
import { CodepenOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Row, Col, Spin } from 'antd';

const readFile = (
  file: string,
  onLoaded: (content: string) => void,
  onError: (error: any) => void
) => {
  return fs.readFile(file, (err: any, buffer: Buffer) => {
    if (err) {
      onError(err);
    }
    onLoaded(buffer.toString('utf8'));
  });
};

interface Params {
  path: string;
  scriptName: string;
}

const PyScripts = ({ path, scriptName }: Params) => {
  const [scriptContent, setScriptContent] = React.useState<string>();
  const [showSource, setShowSource] = React.useState(false);
  const [shell, setShell] = React.useState<PythonShell>();
  const [shellStatus, setShellStatus] = React.useState<'Running' | 'Idle'>(
    'Idle'
  );
  const [scriptOutput, setScriptOutput] = React.useState<
    string[] | undefined
  >();

  const filePath = () => `${path}/${scriptName}`;

  React.useEffect(() => {
    readFile(
      filePath(),
      script => setScriptContent(script),
      () => {}
    );
  }, []);

  const runScript = () => {
    setScriptOutput([]);
    setShellStatus('Running');
    const options = {
      mode: 'text',
      pythonPath: 'python',
      pythonOptions: ['-u'], // get print results in real-time
      scriptPath: path,
      args: ['value1', 'value2', 'value3']
    };
    const pyShell = new PythonShell(scriptName, options as any);
    pyShell.on('message', (message: string) => {
      setScriptOutput([message, ...(scriptOutput ?? [])]);
    });
    pyShell.end(err => {
      setShellStatus('Idle');
      if (err) {
        setScriptOutput([`${err.message} ${err.stack}`]);
      }
    });
    setShell(pyShell);
  };

  const clear = () => {
    shell?.terminate();
    setShell(undefined);
    setScriptOutput(undefined);
  };

  const saveScript = (content: string) => {
    fs.writeFile(filePath(), Buffer.from(content), () => {});
  };

  return (
    <div>
      <Row justify="center">
        <Col>
          <Button onClick={() => runScript()} type="primary">
            RUN
          </Button>
        </Col>
        <Col>
          <Button onClick={() => clear()}>Clear</Button>
        </Col>
        <Col>
          <Button
            onClick={() => setShowSource(!showSource)}
            icon={<CodepenOutlined />}
          />
        </Col>
        {scriptContent ? (
          <Col>
            <Button
              onClick={() => saveScript(scriptContent)}
              icon={<SaveOutlined />}
            />
          </Col>
        ) : (
          undefined
        )}
      </Row>

      {showSource ? (
        <div>
          <MonacoEditor
            width="800"
            height="600"
            language="python"
            theme="vs-dark"
            options={{
              lineNumbers: 'on'
            }}
            value={scriptContent}
            onChange={x => setScriptContent(x)}
          />
        </div>
      ) : (
        undefined
      )}

      {shellStatus === 'Running' ? (
        <div style={{ textAlign: 'center', paddingTop: '1rem' }}>
          <Spin size="large" />
        </div>
      ) : (
        undefined
      )}

      {scriptOutput ? (
        <div style={{ textAlign: 'center', paddingTop: '1rem' }}>
          {scriptOutput.map((x, index) => (
            <p key={index}>{x}</p>
          ))}
        </div>
      ) : (
        undefined
      )}
    </div>
  );
};

export default PyScripts;
