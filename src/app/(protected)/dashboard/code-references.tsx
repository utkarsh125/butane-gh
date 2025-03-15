'use client'

import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { Tabs } from '@/components/ui/tabs';
import { TabsContent } from '@radix-ui/react-tabs';
import { cn } from '@/lib/utils';
import { lucario } from 'react-syntax-highlighter/dist/esm/styles/prism';

type Props = {
  filesReferences: { fileName: string; sourceCode: string; summary: string }[]
}

const CodeReferences = ({ filesReferences }: Props) => {
  const [tab, setTab] = React.useState(filesReferences[0]?.fileName)

  if (filesReferences.length === 0) return null;
  return (
    <div className="w-full sm:max-w-[70vw]">
      <Tabs value={tab} onValueChange={setTab}>
        <div className="overflow-auto flex gap-2 bg-gray-200 p-1 rounded-md">
          {filesReferences.map(file => (
            <button
              className={cn(
                'px-3 py-1.5 text-sm font-medium rounded-md transition-colors whitespace-nowrap text-muted-foreground',
                { 'bg-primary text-primary-foreground': tab === file.fileName }
              )}
              key={file.fileName}
              onClick={() => setTab(file.fileName)}
            >
              {file.fileName}
            </button>
          ))}
        </div>

        {filesReferences.map(file => (
          <TabsContent
            key={file.fileName}
            value={file.fileName}
            className="w-full max-h-[40vh] overflow-auto rounded-md mt-2"
          >
            <SyntaxHighlighter language="typescript" style={lucario}>
              {file.sourceCode}
            </SyntaxHighlighter>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

export default CodeReferences;
