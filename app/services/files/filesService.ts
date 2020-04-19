import fs from 'fs';
import axios from 'axios';

export type FileLocation = 'local' | 'remote';

export const readLocalFile = (
  file: string,
  onLoaded: (content: string) => void,
  onError: (error: any) => void
) => {
  return fs.readFile(file, (err: any, buffer: Buffer) => {
    if (err) {
      onError(err);
      return;
    }
    onLoaded(buffer.toString('utf8'));
  });
};

export const writeLocalFile = (
  file: string,
  content: string,
  onCompleted: () => void,
  onError: (error: any) => void
) => {
  return fs.writeFile(file, Buffer.from(content), (err: any) => {
    if (err) {
      onError(err);
      return;
    }
    onCompleted();
  });
};

export const readRemoteFile = (
  file: string,
  onLoaded: (content: string) => void,
  onError: (error: any) => void
) => {
  axios
    .get(file)
    .then(x => onLoaded(x.data))
    .catch(onError);
};

export const readFile = (
  file: string,
  location: FileLocation,
  onLoaded: (content: string) => void,
  onError: (error: any) => void
) => {
  switch (location) {
    case 'local':
      return readLocalFile(file, onLoaded, onError);
    case 'remote':
      return readRemoteFile(file, onLoaded, onError);
    default:
      throw new Error(`Invalid file location ${file}`);
  }
};
