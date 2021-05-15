import React from 'react';
import DocumentationEntry from '../components/DocumentationEntry';
import { hunterMoves, hunterAdmin, sessionAdmin } from '../content/commands.json';

const Section = (params) => {
  return (
    <div>
    <h2>{params.name}</h2>
    {
      params.entries.map(entry => {
        return (
          <DocumentationEntry entry={entry} />
        )
      })
    }
    </div>
  )
};

const Documentation = () => {
  return (
    <div>
      <h1>Commands</h1>
      <Section name="Hunter Moves" entries={hunterMoves} />
      <Section name="Hunter Admin" entries={hunterAdmin} />
      <Section name="Session Admin" entries={sessionAdmin} />
    </div>
  );
};

export default Documentation;
