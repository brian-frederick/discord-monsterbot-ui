import React from 'react';

const MoveAdminOptions = ({ moveKey }) => {
  return (
    <div>
      <a className="admin-option" href={'/moves/show/' + moveKey}><i className="eye icon"></i></a>
      <a className="admin-option" href={'/moves/edit/' + moveKey}><i className="edit outline icon"></i></a>
      <a className="admin-option" href={'/moves/delete/' + moveKey}><i className="close icon"></i></a>
    </div>
  );
};

export default MoveAdminOptions;
