import React from 'react';
import { Shield } from 'lucide-react';

export const FooterNotice: React.FC = () => {
  return (
    <footer
      id="app-privacy-footer"
      className="w-full mt-12 py-3 px-4 sm:px-10 border-t border-[#E2E2E2] text-[11px]"
      style={{
        backgroundColor: 'var(--bg)',
        color: 'var(--grey)',
      }}
    >
      <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-[#888888]" />
          <span>
            Privacy Notice: All data processing and storage functions are handled via localStorage. No user data is retained on the server.
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span>Residential BOQ & Cost Control System</span>
          <span>•</span>
          <span className="font-mono">v2.0-STABLE</span>
        </div>
      </div>
    </footer>
  );
};
