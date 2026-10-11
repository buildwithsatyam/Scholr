import { useState } from 'react';
import { Search, PenSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getImagePath, getBasePath } from '../utils/paths';
import './Header.css';

export default function Header({ activeTab, setActiveTab, userProfile, searchQuery, setSearchQuery, onLogout }) {
  const [isHoveringProfile, setIsHoveringProfile] = useState(false);

  return (
    <header className="header">
      <div className="header-left">
        <motion.a 
          href={getBasePath()} 
          className="logo-text header-logo-wrapper"
          onClick={(e) => {
            e.preventDefault();
            setActiveTab('Home');
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <img 
            src={getImagePath('/images/logo.png')} 
            alt="Scholr Logo" 
            className="header-logo-img" 
          />
          <span className="flex items-center gap-1.5">
            Scholr
            <span className="text-[10px] font-sans font-extrabold bg-slate-950 text-emerald-400 px-1.5 py-0.5 rounded-md tracking-wider">
              AI
            </span>
          </span>
        </motion.a>
        
        <div className="search-bar">
          <Search className="search-icon" />
          <input 
            type="text" 
            placeholder="Search articles, projects, tutorials..." 
            className="search-input"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (activeTab !== 'Home' && activeTab !== 'Saved') {
                setActiveTab('Home');
              }
            }}
          />
        </div>
      </div>

      <div className="header-right">
        <motion.a 
          href="#write" 
          className="write-link header-write-link-inner"
          onClick={(e) => {
            e.preventDefault();
            setActiveTab('Write');
          }}
          whileHover={{ color: '#111111' }}
        >
          <PenSquare size={16} strokeWidth={2} />
          <span>Write</span>
        </motion.a>

        {/* When user clicks on rightmost profile icon, navigate to Profile view */}
        <div 
          className="header-profile-menu-container"
          onMouseEnter={() => setIsHoveringProfile(true)}
          onMouseLeave={() => setIsHoveringProfile(false)}
        >
          <motion.button 
            className="user-avatar-btn"
            onClick={() => setActiveTab('Profile')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img 
              src={(userProfile && userProfile.avatar) ? userProfile.avatar : getImagePath('/images/avatar_user.png')} 
              alt="User Avatar" 
              className="user-avatar"
            />
          </motion.button>
          
          <AnimatePresence>
            {isHoveringProfile && userProfile && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="header-profile-dropdown"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="header-profile-dropdown-content">
                  <img 
                    src={userProfile.avatar || getImagePath('/images/avatar_user.png')} 
                    className="header-profile-dropdown-avatar"
                    alt="Dropdown Avatar"
                  />
                  
                  <div className="header-profile-dropdown-info">
                    <div className="header-profile-dropdown-name-row">
                      <span className="header-profile-dropdown-name">
                        {userProfile.name}
                      </span>
                      <span className="header-profile-dropdown-pronouns">he/him</span>
                    </div>
                    {userProfile.headline && (
                      <div className="header-profile-dropdown-headline">
                        {userProfile.headline}
                      </div>
                    )}
                    <div className="header-profile-dropdown-followers">
                      1 follower
                    </div>
                  </div>
                  
                  {userProfile.about && (
                    <div className="header-profile-dropdown-about">
                      {userProfile.about}
                    </div>
                  )}

                  <button 
                    onClick={() => {
                      setIsHoveringProfile(false);
                      if (onLogout) onLogout();
                    }}
                    className="header-profile-dropdown-logout-btn"
                  >
                    Sign Out
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}

