import { useContext } from "react";
import { AuthedUserContext } from "../../App";
import * as userService from "../../services/userService";
import { useState, useEffect } from "react";

const FriendList = () => {
  const user = useContext(AuthedUserContext);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchAllFriends = async () => {
      const friendsData = await Promise.all(
        user.friends.map((friendId) => userService.getUser(friendId)),
      );
      setFriends(friendsData);
    };
    if (user) fetchAllFriends();
  }, [user]);

  return (
    <main>
      {friends?.length === 0 && <p>No friends yet</p>}
      {friends?.map((friend, index) => (
        <ul key={index}>
          <li>{friend.username}</li>
        </ul>
      ))}
    </main>
  );
};

export default FriendList;

