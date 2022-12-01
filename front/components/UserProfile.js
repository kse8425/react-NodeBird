import { Avatar, Card, Button } from 'antd';
import React, { useCallback } from 'react';
const UserProfile = ({ setIsLoggedIn }) => {
  const onLogOut = useCallback(() => {
    console.log('로그아웃');
    setIsLoggedIn(false);
  }, []);
  return (
    <Card
      actions={[
        <div key="twit">
          짹짹 <br />0
        </div>,
        <div key="followings">
          팔로잉 <br />0
        </div>,
        <div key="follower">
          팔로워 <br />0
        </div>,
      ]}
    >
      <Card.Meta avatar={<Avatar>ER</Avatar>} title="EricEricEric" />
      <Button onClick={onLogOut}>로그아웃</Button>
    </Card>
  );
};

export default UserProfile;
