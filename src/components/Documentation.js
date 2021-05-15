import React from 'react';
import DocumentationEntry from '../components/DocumentationEntry';
import { hunterMoves, hunterAdmin, sessionAdmin } from '../content/commands.json';

const Section = (params) => {
  return (
    <div>
    <h2 className="doc-section-header">{params.name}</h2>
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
      <p>
        Monsterbot prefers Discord's slash commands. They're pretty intuitive. 
        Just hit forward slash and all of Monsterbot's options will be at your fingertips. 
        You can then use autocomple, tabbing, or the mouse to quickly select options for your command as well.
        Learn more from Discord&nbsp;
        <a 
          href="https://blog.discord.com/slash-commands-are-here-8db0a385d9e6"
          style={{textDecoration: "underline", color: "blue"}}
        >
        here
        </a>.
      </p>
      <Section name="Hunter Moves" entries={hunterMoves} />
      <Section name="Hunter Admin" entries={hunterAdmin} />
      <Section name="Session Admin" entries={sessionAdmin} />
    </div>
  );
};

export default Documentation;
