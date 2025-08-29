import { useState } from 'react';
import { Menu, MessageCircle, Heart, Bell } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { useMessaging } from '../hooks/useMessaging';
import UserMenu from './UserMenu';
import { useFavorites } from '../hooks/useFavorites';
import MessageCenter from './messaging/MessageCenter';
import MessageNotifications from './messaging/MessageNotifications';
import LanguageSelector from './LanguageSelector';
import DayNightSwitch from './shsfui/switch/day-night-switch';

interface HeaderProps {
  onNavigate: (view: string) => void;
}

const Header = ({ onNavigate }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMessageCenterOpen, setIsMessageCenterOpen] = useState(false);
  const { t } = useTranslation();
  const { user, isAuthenticated } = useAuth();
  
  // Mock current user ID - in real app this would come from auth context
  const currentUserId = user?.id || 'user-2';
  
  const { 
    unreadCount, 
    notifications, 
    dismissNotification 
  } = useMessaging(currentUserId);
  const { favorites } = useFavorites(currentUserId);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50 dark:bg-gray-900 dark:border-gray-800">
      <div className="w-full">
        <div className="flex items-center h-16">
          {/* Logo fixed to left */}
          <div className="w-60 px-8 border-r border-gray-200 dark:border-gray-800">
            <button 
              onClick={() => onNavigate('home')}
              className="text-2xl font-bold text-coral-500 dark:text-coral-400 hover:text-coral-600 dark:hover:text-coral-300 transition-colors"
            >
              TeachBnB
            </button>
          </div>

          {/* Spacer */}
          <div className="flex-1"></div>

          {/* Right Navigation - fixed to right */}
          <div className="w-auto flex items-center space-x-2 px-8 border-l border-gray-200">
            <DayNightSwitch
              defaultChecked={true}
              onToggle={(checked) => {
                document.documentElement.classList.toggle('dark', !checked);
              }}
            />
            <LanguageSelector variant="icon" />

            {isAuthenticated && (
              <>
                <button 
                  onClick={() => setIsMessageCenterOpen(true)}
                  className="relative text-gray-700 hover:text-coral-500 transition-colors duration-200 dark:text-gray-300 dark:hover:text-coral-400"
                  title={t('common.messages')}
                >
                  <MessageCircle className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-coral-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </button>

                <button 
                  className="text-gray-700 hover:text-coral-500 transition-colors duration-200 dark:text-gray-300 dark:hover:text-coral-400"
                  title={t('common.notifications')}
                >
                  <Bell className="h-5 w-5" />
                </button>

                {user?.role === 'student' && (
                  <button
                    onClick={() => {
                      // Navigate to favorites page - for now just show count
                      alert(`You have ${favorites.length} favorite teachers`);
                    }}
                    className="text-gray-700 hover:text-coral-500 transition-colors duration-200 dark:text-gray-300 dark:hover:text-coral-400"
                    title={t('common.favorites')}
                  >
                    <Heart className="h-5 w-5" />
                    {favorites.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-coral-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                        {favorites.length > 9 ? '9+' : favorites.length}
                      </span>
                    )}
                  </button>
                )}
              </>
            )}

            {/* User Menu Component */}
            <UserMenu onNavigate={onNavigate} />
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-coral-500 transition-colors duration-200"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-800">
          <div className="px-4 py-2 space-y-1">
            <button 
              onClick={() => onNavigate('search')}
              className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-coral-500 dark:text-gray-300 dark:hover:text-coral-400"
            >
              {t('common.findTeachers')}
            </button>
            {!isAuthenticated ? (
              <>
                <button 
                  onClick={() => onNavigate('signup')}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-coral-500 dark:text-gray-300 dark:hover:text-coral-400"
                >
                  {t('common.signUp')}
                </button>
                <button 
                  onClick={() => onNavigate('signin')}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-coral-500 dark:text-gray-300 dark:hover:text-coral-400"
                >
                  {t('common.logIn')}
                </button>
              </>
            ) : (
              <>
                {user?.role === 'teacher' && (
                  <button 
                    onClick={() => onNavigate('teacher-dashboard')}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-coral-500 dark:text-gray-300 dark:hover:text-coral-400"
                  >
                    Teacher Dashboard
                  </button>
                )}
              </>
            )}
            <button 
              onClick={() => onNavigate('become-teacher')}
              className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-coral-500 dark:text-gray-300 dark:hover:text-coral-400"
            >
              {t('common.becomeTeacher')}
            </button>
            <button className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-coral-500 dark:text-gray-300 dark:hover:text-coral-400">
              {t('common.help')}
            </button>
            <div className="px-3 py-2">
              <LanguageSelector variant="dropdown" />
            </div>
          </div>
        </div>
      )}

      {/* Message Center */}
      <MessageCenter
        isOpen={isMessageCenterOpen}
        onClose={() => setIsMessageCenterOpen(false)}
        currentUserId={currentUserId}
      />

      {/* Message Notifications */}
      <MessageNotifications
        notifications={notifications}
        onNotificationClick={() => {
          setIsMessageCenterOpen(true);
        }}
        onNotificationDismiss={dismissNotification}
      />
    </header>
  );
};

export default Header;