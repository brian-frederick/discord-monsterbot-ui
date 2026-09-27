import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div>
      <h1>Privacy Policy</h1>
      <p><em>Last updated: September 27, 2026</em></p>

      <p>
        This Privacy Policy explains what information Monsterbot (the Discord bot and this
        companion website, together the "Service") collects and how it's used.
      </p>

      <h2 className="doc-section-header">Information We Collect</h2>
      <p>
        When you log in with Discord, the Service receives your Discord user ID and the IDs of the
        Discord servers (guilds) you use it in, in order to associate hunter moves and other
        content with you and your server. The Service also stores any custom moves or other
        content you create.
      </p>
      <p>
        Your Discord email address is only collected and stored if you explicitly opt in via the
        Service's email consent prompt. It is not collected otherwise.
      </p>

      <h2 className="doc-section-header">How Information Is Used</h2>
      <p>
        Collected information is used solely to operate the Service: authenticating you via
        Discord, and associating your custom content with your account and server. The Service
        does not use your information for advertising, and does not sell or share it with third
        parties.
      </p>

      <h2 className="doc-section-header">Data Storage</h2>
      <p>
        Data is stored using Amazon Web Services (AWS). Reasonable measures are taken to protect
        stored data, though no online service can guarantee absolute security.
      </p>

      <h2 className="doc-section-header">Data Deletion</h2>
      <p>
        You can request deletion of your data, including your email address if you previously
        opted in, at any time via the contact method below.
      </p>

      <h2 className="doc-section-header">Children's Privacy</h2>
      <p>
        The Service is not directed at children under 13, and does not knowingly collect
        information from them.
      </p>

      <h2 className="doc-section-header">Changes to This Policy</h2>
      <p>
        This Privacy Policy may be updated from time to time. Continued use of the Service after
        changes are posted constitutes acceptance of the revised policy.
      </p>

      <h2 className="doc-section-header">Contact</h2>
      <p>
        Questions or data requests can be raised via&nbsp;
        <a
          href="https://github.com/brian-frederick/Discord-MonsterBot/issues"
          style={{ textDecoration: "underline", color: "blue" }}
        >
          GitHub Issues
        </a>.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
