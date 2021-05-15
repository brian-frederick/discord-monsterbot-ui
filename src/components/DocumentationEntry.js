import React, {useState} from 'react';

const renderOptions = (commandParams) => {
  if (commandParams.length) {
    return (
      <div>
        <div>Options</div> 
        <ul className="doc-entry-list">
          { 
            commandParams.map(param => {
                return (
                  <li><em>{param.name} {`${param.required ? '*' : ''}`}</em> - {param.description}</li>
                );
            })
          }
        </ul >
        { commandParams.some(option => option.required) && <div>* required</div>}
      </div>
    )
  }
};

const renderExamples = (examples) => {
  if (examples.length) {
    return (
      <div>
        <div>Examples</div>
        <ul className="doc-entry-list">
          { 
            examples.map(ex => {
                return (
                  <li><code>{ex.code}</code> - {ex.outcome}</li>
                );
            })
          }
        </ul>
      </div>
    )
  }
};

const DocumentationEntry = ({entry}) => {
  const [open, setOpen] = useState(false);

  return (
  <div className="ui accordion" id={entry.code}>
    <div className={`doc-entry-title title ${open ? 'active' : ''}`} onClick={() => setOpen(!open)}>
      <i class="dropdown icon" ></i>
      <code>/{entry.code}</code> - {entry.blurb}
    </div>
    <div className={`doc-entry-content content ${open ? 'active' : ''}`}>
      <div className="doc-entry-description">{entry.description}</div>
      {renderOptions(entry.params)}
      {renderExamples(entry.examples)}
    </div>
  </div>
  );
}

export default DocumentationEntry;
