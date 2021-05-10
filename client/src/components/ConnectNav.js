import { Card, Avatar } from 'antd';
import { formatDistance } from 'date-fns';
import { useSelector } from 'react-redux';

const ConnectNav = () => {
  const { Meta } = Card;
  const { auth } = useSelector((state) => ({ ...state }));
  const { user } = auth;
  const date = formatDistance(new Date(user.createdAt), new Date(), { addSuffix: true });


  return (
    <div className="d-flex justify-content-around">
      <Card>
        <Meta
          avatar={ <Avatar>{ user.name[0] }</Avatar> }
          title={ user.name }
          description={ `Joined ${ date }` }
        />
      </Card>
    </div>
  );
};

export default ConnectNav;
