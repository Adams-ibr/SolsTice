import React from 'react';

const iconClass = "h-12 w-12 text-brand-gold";

export const SourcingIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);

export const LogisticsIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2-2h8a1 1 0 001-1z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2.72a2 2 0 011.98 2.28l-2.72 8.17A2 2 0 0117 20H5" />
    </svg>
);

export const QualityIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const ExportIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A12.023 12.023 0 0112 21.75c-2.676 0-5.216-.934-7.177-2.542m14.354 0l-3.03-3.03" />
    </svg>
);

export const LinkedInIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.98v16h4.98v-8.396c0-2.002 1.809-2.48 2.024-2.48 1.12 0 1.976.84 1.976 2.48v8.396h4.98v-10.396c0-5-3.132-5.966-4.88-5.966-2.268 0-3.102 1.48-3.102 1.48v-1.29h-4.98v16h4.98l.022-8.396z"/></svg>
);

export const TwitterIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616v.064c0 2.299 1.634 4.212 3.793 4.649-.65.177-1.353.23-2.064.078.608 1.923 2.368 3.246 4.453 3.282-1.763 1.383-3.991 2.158-6.333 2.158-.41 0-.814-.024-1.21-.072 2.27 1.464 4.978 2.323 7.875 2.323 9.229 0 14.307-7.64 14.307-14.308v-.652c.98-.702 1.82-1.579 2.49-2.588z"/></svg>
);
