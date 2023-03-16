export async function getUsers(page) {
  try {
    const url = `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${page}/20`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Something went wrong: ${response.status}`);
    }

    const data = await response.json();

    return data.list;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getUserInfo(page, userId, onscroll = false) {
  try {
    if (!onscroll) {
      const [user, friendsList] = await Promise.all([
        fetch(
          `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${userId}`
        ),
        fetch(
          `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${userId}/friends/${page}/20`
        ),
      ]);

      if (!user.ok || !friendsList.ok) {
        throw new Error(`Something went wrong ${user.status}`);
      }

      const userInfo = await user.json();
      const updatedFriendsList = await friendsList.json();

      return { user: userInfo, friends: updatedFriendsList.list };
    } else {
      const response = await fetch(
        `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${userId}/friends/${page}/20`
      );

      if (!response.ok) {
        throw new Error(`Something went wrong: ${response.status}`);
      }

      const data = await response.json();

      return data.list;
    }
  } catch (err) {
    throw new Error(err.message);
  }
}
