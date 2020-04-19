import React from 'react';
import { WorkspaceDefinition } from '../../types/settings';
import { FileLocation } from '../../services/files/filesService';
import { loadWowkspaceDefinition } from '../../services/workspace/workspaceService';
import Loader from '../../components/ui/Loader';

export interface Workspace {
  loading: boolean;
  definition: WorkspaceDefinition | undefined;
}

const initialValue = {
  loading: false
} as Workspace;

export const WorkspaceContext = React.createContext<Workspace>(initialValue);

interface WorkspaceProviderProps {
  file: string;
  location: FileLocation;
  children: React.ReactNode;
}

export const WorkspaceProvider = ({
  file,
  location,
  children
}: WorkspaceProviderProps) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | undefined>();
  const [value, setValue] = React.useState<Workspace | undefined>();

  React.useEffect(() => {
    setIsLoading(true);
    loadWowkspaceDefinition(
      file,
      location,
      x => {
        setValue({
          loading: false,
          definition: x
        });
        setIsLoading(false);
      },
      err => {
        setError(err as string);
        setIsLoading(false);
      }
    );
  }, []);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {error ? <div>{error}</div> : undefined}
          {value ? (
            <WorkspaceContext.Provider value={value}>
              {children}
            </WorkspaceContext.Provider>
          ) : (
            undefined
          )}
        </>
      )}
    </>
  );
};
