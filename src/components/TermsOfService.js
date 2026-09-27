import React from 'react';

const TermsOfService = () => {
  return (
    <div>
      <h1>Terms of Service</h1>
      <p><em>Last updated: September 27, 2026</em></p>

      <p>
        These Terms of Service ("Terms") govern your use of the Monsterbot Discord bot and this
        companion website (together, the "Service"), a fan-made supplement for the Monster of the
        Week tabletop roleplaying game. By using the Service, you agree to these Terms.
      </p>

      <h2 className="doc-section-header">Description of Service</h2>
      <p>
        Monsterbot is a free, hobby-run Discord bot and web UI that helps game masters and players
        run Monster of the Week sessions, including managing hunter moves, custom moves, and
        session administration.
      </p>

      <h2 className="doc-section-header">Compatibility &amp; Trademarks</h2>
      <p>
        For use with Monster of the Week by Michael Sands. Monster of the Week is copyrighted by
        Evil Hat Productions, LLC and Generic Games.
      </p>

      <h2 className="doc-section-header">Acceptable Use</h2>
      <p>
        You agree not to misuse the Service, including attempting to disrupt it, access it through
        unauthorized means, or use it to violate Discord's own Terms of Service or Community
        Guidelines.
      </p>

      <h2 className="doc-section-header">User Content</h2>
      <p>
        You retain ownership of any custom moves or other content you create using the Service. By
        submitting content, you grant Monsterbot a license to store and display that content back
        to you and members of your Discord server(s) as part of operating the Service.
      </p>

      <h2 className="doc-section-header">No Warranty</h2>
      <p>
        The Service is provided "as is," without warranty of any kind. Monsterbot is a free,
        volunteer-maintained project and is not guaranteed to be available, error-free, or
        uninterrupted.
      </p>

      <h2 className="doc-section-header">Limitation of Liability</h2>
      <p>
        To the fullest extent permitted by law, Monsterbot and its maintainer are not liable for
        any damages arising from your use of, or inability to use, the Service.
      </p>

      <h2 className="doc-section-header">Changes to the Service or Terms</h2>
      <p>
        The Service may be modified, suspended, or discontinued at any time. These Terms may be
        updated from time to time, and continued use of the Service after changes are posted
        constitutes acceptance of the revised Terms.
      </p>

      <h2 className="doc-section-header">Termination</h2>
      <p>
        Access to the Service may be limited or terminated for any user who violates these Terms
        or misuses the Service.
      </p>

      <h2 className="doc-section-header">Governing Law</h2>
      <p>
        These Terms are governed by the laws of the United States, without regard to conflict of
        law principles.
      </p>

      <h2 className="doc-section-header">Contact</h2>
      <p>
        Questions about these Terms can be raised via&nbsp;
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

export default TermsOfService;
