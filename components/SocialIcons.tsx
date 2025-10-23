// FIX: Using a namespace import for React to solve JSX intrinsic element type errors.
import * as React from 'react';

const SocialIcons: React.FC = () => {
  const iconStyle = "w-6 h-6";
  return (
    <div className="flex space-x-4 mt-4">
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-400 hover:text-brand-gold transition-colors">
        <svg className={iconStyle} fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v2.385z"/></svg>
      </a>
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-gray-400 hover:text-brand-gold transition-colors">
        <svg className={iconStyle} fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616v.064c0 2.299 1.634 4.212 3.793 4.649-.65.177-1.353.23-2.064.078.608 1.923 2.368 3.246 4.453 3.282-1.763 1.383-3.991 2.158-6.333 2.158-.41 0-.814-.024-1.21-.072 2.27 1.464 4.978 2.323 7.875 2.323 9.229 0 14.307-7.64 14.307-14.308v-.652c.98-.702 1.82-1.579 2.49-2.588z"/></svg>
      </a>
      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-400 hover:text-brand-gold transition-colors">
        <svg className={iconStyle} fill="currentColor" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.98v16h4.98v-8.396c0-2.002 1.809-2.48 2.024-2.48 1.12 0 1.976.84 1.976 2.48v8.396h4.98v-10.396c0-5-3.132-5.966-4.88-5.966-2.268 0-3.102 1.48-3.102 1.48v-1.29h-4.98v16h4.98l.022-8.396z"/></svg>
      </a>
    </div>
  );
};

export default SocialIcons;