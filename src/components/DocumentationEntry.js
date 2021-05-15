import React, {useState} from 'react';

const DocumentationEntry = ({entry}) => {
  const [open, setOpen] = useState(false);

  return (
  <div className="ui accordion" id={entry.code}>
    <div className={`title ${open ? 'active' : ''}`}>
      <i class="dropdown icon" onClick={() => setOpen(!open)}></i>
      <code>/{entry.code}</code> - {entry.blurb}
    </div>
    <div className={`doc-entry-content content ${open ? 'active' : ''}`}>
      <div className="doc-entry-description">{entry.description}</div>
      
      {entry.params.length > 0 && <div>Options</div> }
      <ul className="doc-entry-list">
        { 
          entry.params.map(param => {
              return (
                <li><em>{param.name}</em> - {param.description}</li>
              );
          })
        }
      </ul >

      { entry.examples.length > 0 && <div>Examples</div> }
      <ul className="doc-entry-list">
        { 
          entry.examples.map(ex => {
              return (
                <li><code>{ex.code}</code> - {ex.outcome}</li>
              );
          })
        }
      </ul>
    </div>
  </div>
  );
}

export default DocumentationEntry;
