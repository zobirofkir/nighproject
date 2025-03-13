import { User } from '@/types';

interface UserListItemProps {
    user: User;
    isSelected: boolean;
    onClick: () => void;
}

const UserListItem = ({ user, isSelected, onClick }: UserListItemProps) => {
    return (
        <button
            onClick={onClick}
            className={`flex w-full items-center space-x-3 rounded-lg px-3 py-2 transition-colors ${
                isSelected ? 'bg-blue-50 dark:bg-gray-700' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
        >
            <div className="relative">
                {user.image ? (
                    <img src={user.image} alt={user.name} className="h-12 w-12 rounded-full object-cover" />
                ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-400 to-blue-600 text-xl text-white">
                        {user.name.charAt(0).toUpperCase()}
                    </div>
                )}
                <div
                    className={`absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 border-white ${
                        user.isActive ? 'bg-green-500' : 'bg-gray-400'
                    }`}
                ></div>
            </div>
            <div className="flex-1 text-left">
                <h3 className="font-medium text-gray-900 dark:text-white">{user.name}</h3>
                <p className={`text-sm ${user.isActive ? 'text-green-500' : 'text-gray-500'}`}>
                    {user.isActive ? 'online' : 'offline'}
                </p>
            </div>
        </button>
    );
};

export default UserListItem;
