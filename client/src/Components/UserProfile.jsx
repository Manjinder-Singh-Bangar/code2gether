import React from 'react';
import { useChatStore } from '../Store/useChatStore';
// Make sure to install react-icons

const UserProfile = () => {
  const { userProfile } = useChatStore();
    console.log("userProfile: ", userProfile)
  if (!userProfile) {
    return <div className="text-center p-4">Loading profile...</div>;
  }

  return (
    <div className=" p-6 h-[100vh] w-[100vw] max-w-md mx-auto">
      <div className="flex p-6 bg-gray-800 rounded-lg shadow-lg flex-col items-center space-y-4">
        {/* Profile Picture */}
        <div className="relative">
          {userProfile.profilePicture ? (
            <img
              src={userProfile.profilePicture}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center border-4 border-blue-500">
              {/* <FaUser className="text-4xl text-gray-400" /> */}
            </div>
          )}
        </div>

        {/* User Details */}
        <div className="text-center space-y-3">
          <h2 className="text-2xl font-bold text-white">
            {userProfile.fullName}
          </h2>
          
          <div className="space-y-2">
            <div className="bg-gray-700 p-3 rounded-lg">
              <p className="text-sm text-gray-400">Username</p>
              <p className="text-white">{userProfile.username}</p>
            </div>
            
            <div className="bg-gray-700 p-3 rounded-lg">
              <p className="text-sm text-gray-400">Email</p>
              <p className="text-white">{userProfile.email}</p>
            </div>
          </div>

        </div>

        {/* Edit Profile Button */}
        <button 
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors duration-200"
          onClick={() => {/* Add edit profile functionality */}}
        >
          Edit Profile
        </button>
      </div>

    </div>
  );
};

export default UserProfile;