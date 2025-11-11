import React from 'react';
import { Contact } from '@/types';
import Link from 'next/link';

interface RecentContactsProps {
  contacts: Contact[];
}

const RecentContacts: React.FC<RecentContactsProps> = ({ contacts }) => {
  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Contacts Récents</h3>
      </div>
      <div className="divide-y divide-gray-200">
        {contacts.length === 0 ? (
          <div className="px-4 py-5 sm:px-6">
            <p className="text-gray-500 text-center">Aucun contact récent</p>
          </div>
        ) : (
          contacts.map((contact) => (
            <div key={contact.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900">
                    {contact.name}
                  </h4>
                  <p className="text-sm text-gray-500">{contact.email}</p>
                  <p className="text-sm text-gray-500">{contact.phone}</p>
                </div>
              </div>
              <div className="mt-2">
                <p className="text-sm text-gray-600 line-clamp-2">
                  {contact.message}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(contact.created_at).toLocaleDateString('fr-FR')}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="px-4 py-4 sm:px-6 border-t border-gray-200">
        <Link
          href="/admin/contacts"
          className="text-sm font-medium text-blue-600 hover:text-blue-500"
        >
          Voir tous les contacts →
        </Link>
      </div>
    </div>
  );
};

export default RecentContacts;