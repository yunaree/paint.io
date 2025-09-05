import React from 'react';
import LanguageSwitcher from './language-switcher';
import { PenTool } from 'lucide-react';

function Header() {
    return (
    <nav className="flex justify-between items-center p-4">
        <p className='text-white'>.</p>
        <LanguageSwitcher />
    </nav>
    );
}

export default Header;